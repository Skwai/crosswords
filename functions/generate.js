const functions = require('firebase-functions')
const admin = require('firebase-admin')

const Generator = require('./lib/Generator')

admin.initializeApp(functions.config().firebase)

module.exports = functions.https.onRequest((request, response) => {
  const ref = admin.database().ref('words')
  ref.once('value').then((wordData) => {
    const words = Object.keys(wordData.val())
    const size = parseInt(request.query.size) || 16

    const gen = new Generator(size, words)
    const board = gen.generateBoard()
    gen.printBoard()
    response.status(200).send(board)
  })
})
