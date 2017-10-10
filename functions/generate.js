const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Generator = require('./lib/Generator')

const wordJson = require('./data/words.json')
const CLUE_TYPE_CLUE = 'clue'
const CLUE_TYPE_CRIPTIC = 'cryptic'

admin.initializeApp(functions.config().firebase)
const db = admin.database()

module.exports = functions.https.onRequest((request, response) => {
  const size = parseInt(request.query.size) || 10
  const types = request.query.type ? [request.query.type] : [CLUE_TYPE_CLUE, CLUE_TYPE_CRIPTIC]
  const debug = request.query.debug

  const wordData = filterWords(wordJson, types)
  const words = Object.keys(wordData)
  const gen = new Generator(size, words)
  const board = gen.generateBoard()
  gen.printBoard()

  const id = db.ref('games').push().key
  const clues = getWordsClues(board.words, wordData, types)

  const game = {
    board: id,
    created: new Date(),
    words: board.words,
    clues
  }

  if (debug) {
    console.log(game)
    console.log(board)
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
 * @param {Array} clueTypes
 */
const getWordsClues = ({ down, across }, wordList, clueTypes = [CLUE_TYPE_CLUE]) => {
  return {
    down: getDirectionClues(down, wordList, clueTypes),
    across: getDirectionClues(across, wordList, clueTypes)
  }
}

/**
 * @param {Object} words
 * @param {Object} wordList
 * @param {Array} clueTypes
 */
const getDirectionClues = (words, wordList, clueTypes) => {
  return Object.keys(words).reduce((obj, k) => {
    const clue = getWordClue(words[k], wordList, clueTypes)
    return Object.assign(obj, { [k]: clue })
  }, {})
}

/**
 * @param {String} word
 * @param {Object} wordList
 * @param {Array} clueTypes
 */
const getWordClue = (word, wordList, clueTypes) => {
  const clues = wordList[String(word).toUpperCase()]
  if (!Object.keys(clues).length) return null
  const filtered = Object.keys(clues).filter(k => clueTypes.indexOf(clues[k]) !== -1)
  const rand = Math.floor(Math.random() * filtered.length)
  return filtered[rand] || null
}

/**
 * @param {Object} wordList
 * @param {Arrar} clueTypes
 */
const filterWords = (wordList, types) => {
  return filterObject(wordList,
      c => Object.keys(filterObject(c, w => types.indexOf(w) !== -1)
    ).length > 0)
}

/**
 * @param {Object} obj
 * @param {Function} predicate
 */
const filterObject = (obj, predicate) => {
  return Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => {
      res[key] = obj[key]
      return res
    }, {})
}
