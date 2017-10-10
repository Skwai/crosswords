const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Generator = require('./lib/Generator')

const wordData = require('./data/words.json')
const CLUE_TYPE_CLUE = 'clue'

admin.initializeApp(functions.config().firebase)
const db = admin.database()

module.exports = functions.https.onRequest((request, response) => {
  const words = Object.keys(wordData)
  const size = parseInt(request.query.size) || 10

  const gen = new Generator(size, words)
  const board = gen.generateBoard()
  gen.printBoard()

  const id = db.ref('games').push().key
  const clues = getWordsClues(board.words, wordData)

  const game = {
    board: id,
    created: new Date(),
    words: board.words,
    clues
  }

  delete board.words

  db.ref().update({
    [`games/${id}`]: game,
    [`boards/${id}`]: board
  }).then(() => {
    response.status(200).send({ game: id })
  }).catch((err) => {
    console.error(err)
    response.send(500)
  })
})

/**
 * @param {Object} param
 * @param {Object.<Object>} across
 * @param {Object.<Object>} down
 * @param {Object} wordList
 * @param {Stirng} clueType
 */
const getWordsClues = ({ down, across }, wordList, clueType = CLUE_TYPE_CLUE) => {
  return {
    down: getDirectionClues(down, wordList, clueType),
    across: getDirectionClues(across, wordList, clueType)
  }
}

/**
 * @param {Object} words
 * @param {Object} wordList
 * @param {Stirng} clueType
 */
const getDirectionClues = (words, wordList, clueType) => {
  return Object.keys(words).reduce((obj, k) => {
    const clue = getWordClue(words[k], wordList, clueType)
    return Object.assign(obj, { [k]: clue })
  }, {})
}

/**
 * @param {String} word
 * @param {Object} wordList
 */
const getWordClue = (word, wordList, clueType) => {
  const clues = wordList[String(word).toUpperCase()]
  if (!Object.keys(clues).length) return null
  const filtered = Object.keys(clues).filter(k => clues[k] === clueType)
  const rand = Math.floor(Math.random() * filtered.length)
  return filtered[rand] || null
}
