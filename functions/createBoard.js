const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Board = require('./Board')

module.exports = functions.https.onRequest((request, response) => {
  const ref = admin.database().ref('boards')
  const board = new Board()
})
