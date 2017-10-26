const functions = require('firebase-functions')
const admin = require('firebase-admin')
const GeneratorTemplate = require('./lib/GeneratorTemplate')

const wordData = require('./data/words.json')

admin.initializeApp(functions.config().firebase)
const db = admin.database()

module.exports = functions.https.onRequest((request, response) => {
  const words = Object.keys(wordData)
  const size = parseInt(request.query.size) || 11
  const generator = new GeneratorTemplate(size, words)
  generator.create().then(() => response.status(200).send(generator.template))
})
