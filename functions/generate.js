const functions = require('firebase-functions')
const admin = require('firebase-admin')

const Generator = require('./lib/Generator')

admin.initializeApp(functions.config().firebase)
const db = admin.database()

module.exports = functions.https.onRequest((request, response) => {
  db.ref('words').once('value').then((wordsSnapshot) => {
    const words = Object.keys(wordsSnapshot.val())
    const size = parseInt(request.query.size) || 10

    const gen = new Generator(size, words)
    const board = gen.generateBoard()
    gen.printBoard()

    const gameId = db.ref('games').push().key
    const boardId = db.ref('boards').push().key

    const game = {
      board: boardId,
      created: new Date(),
      words: board.words
    }

    // TODO: get clues
    delete board.words

    db.ref().update({
      [`games/${gameId}`]: game,
      [`boards/${boardId}`]: board
    }).then(() => {
      response.status(200).send({ game: gameId })
    }).catch((err) => {
      console.error(err)
      response.send(500)
    })
  })
})
