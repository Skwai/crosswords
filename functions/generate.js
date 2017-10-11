const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Generator = require('./lib/Generator')

const wordJson = require('./data/words.json')
const CLUE_TYPE_CLUE = 'clue'
const CLUE_TYPE_CRIPTIC = 'cryptic'

admin.initializeApp(functions.config().firebase)
const db = admin.database()

module.exports = functions.https.onRequest((request, response) => {
  const size = parseInt(request.query.size) || 13
  const types = request.query.type ? [request.query.type] : [CLUE_TYPE_CLUE, CLUE_TYPE_CRIPTIC]
  const debug = request.query.debug

  const wordData = filterWords(wordJson, types)
  const words = Object.keys(wordData)
  const gen = new Generator(size, words)
  const board = gen.generateBoard()
  gen.printBoard()

  const id = db.ref('games').push().key

  const game = {
    board: id,
    created: new Date(),
    words: board.words
  }

  for (let type of types) {
    game[type] = getWordsClues(board.words, wordData, type)
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
 * @param {String} clueType
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
 * @param {String} clueType
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
 * @param {String} clueType
 */
const getWordClue = (word, wordList, clueType) => {
  const clues = wordList[String(word).toUpperCase()]
  if (!Object.keys(clues).length) return null
  const filtered = Object.keys(clues).filter(k => clueType === clues[k])
  const rand = Math.floor(Math.random() * filtered.length)
  return filtered[rand] || null
}

/**
 * @param {Object} wordList
 * @param {Attay} clueTypes
 */
const filterWords = (wordList, clueTypes) => {
  return filterObject(wordList,
      c => (
        Object.keys(filterObject(c, w => clueTypes[0] === w)).length > 0 &&
        (!clueTypes[1] || Object.keys(filterObject(c, w => clueTypes[1] === w)).length > 0)
        )
      )
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
