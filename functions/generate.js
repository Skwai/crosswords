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

    const id = db.ref('games').push().key

    const game = {
      board: id,
      created: new Date(),
      words: board.words
    }

    // TODO: get clues
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
})
