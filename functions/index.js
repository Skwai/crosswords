// https://firebase.google.com/docs/functions/write-firebase-functions

const createBoard = require('./createBoard')
const generate = require('./generate')

module.exports = {
  createBoard,
  generate
}
