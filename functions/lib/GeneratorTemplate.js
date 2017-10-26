const fs = require('fs')

const NORTH = 'NORTH'
const EAST = 'EAST'
const SOUTH = 'SOUTH'
const WEST = 'WEST'

const EMPTY = '-'
const PLACEHOLDER = 'x'
const DOWN = 'DOWN'
const ACROSS = 'ACROSS'

const MAX_ATTEMPTS = 100

class GeneratorTemplate {
  constructor (size, words) {
    this.size = size
    this.words = words
  }

  create () {
    const orientation = GeneratorTemplate.getOrientation()
    return GeneratorTemplate.getTemplate(this.size, this.orientation)
      .then(template => {
        this.template = GeneratorTemplate.orientateTemplate(orientation, template)
        this.matrix = GeneratorTemplate.templateToMatrix(this.template)
        this.slots = GeneratorTemplate.getWordSlots(this.matrix)

        try {
          this.fill()
        } catch (err) {
          console.error(err)
        }
      })
  }

  fill () {
    this.fillAttempt()
  }

  fillAttempt () {
    const matrix = this.matrix.slice(0)
    const words = this.words.slice(0)
    const slots = this.slots.slice(0).sort((a, b) => b.length - a.length)

    slots.forEach(slot => {
      const chars = slot.charsFromMatrix(matrix)
      const word = GeneratorTemplate.findWord(words, slot.length, chars)
      console.log(word)
      slot.word = word
      slot.updateMatrix(matrix)
    })

    console.log('\n' + GeneratorTemplate.matrixToTemplate(matrix))

    return true
  }

  static isStart (matrix, x, y) {
    return GeneratorTemplate.isDownStart() || GeneratorTemplate.isAcrossStart()
  }

  static isDownStart (matrix, x, y) {
    return matrix[x][y] !== EMPTY &&
      !!((y === 0 || (
        matrix[y - 1] &&
        matrix[y - 1][x] &&
        matrix[y - 1][x] === EMPTY
      )) && (
        matrix[y + 1] &&
        matrix[y + 1][x] &&
        matrix[y + 1][x] !== EMPTY
      ))
  }

  static isAcrossStart (matrix, x, y) {
    return matrix[x][y] !== EMPTY &&
      !!((x === 0 || (
        matrix[y][x - 1] &&
        matrix[y][x - 1] === EMPTY
      )) && (
        matrix[y][x + 1] &&
        matrix[y][x + 1] !== EMPTY
      ))
  }

  static getWordSlots (matrix) {
    const slots = []
    matrix.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const x = colIndex
        const y = rowIndex
        const start = [x, y]

        if (GeneratorTemplate.isAcrossStart(matrix, x, y)) {
          const end = GeneratorTemplate.findWordEnd(matrix, x, y, ACROSS)
          slots.push(new WordSlot(start, end, ACROSS))
        }

        if (GeneratorTemplate.isDownStart(matrix, x, y)) {
          const end = GeneratorTemplate.findWordEnd(matrix, x, y, DOWN)
          slots.push(new WordSlot(start, end, DOWN))
        }
      })
    })
    return slots
  }

  static findWordEnd (matrix, x, y, direction) {
    if (direction === DOWN) {
      while (
        matrix[y] &&
        matrix[y][x] &&
        matrix[y][x] !== EMPTY
      ) y++
    } else {
      while (
        matrix[y][x] &&
        matrix[y][x] !== EMPTY
      ) x++
    }
    return [x, y]
  }

  static getTemplate (size, orientation) {
    return new Promise((resolve, reject) =>
      fs.readFile(`./templates/${size}x${size}.txt`, 'utf8', (err, data) =>
        err ? reject(err) : resolve(data.trim())
      )
    )
  }

  static getOrientation () {
    const orientations = [NORTH, EAST, SOUTH, WEST]
    const rand = Math.floor(Math.random() * orientations.length)
    return orientations[rand]
  }

  static orientateTemplate (orientation, template) {
    const matrix = GeneratorTemplate.templateToMatrix(template)

    const result = (() => {
      const size = matrix.length - 1

      if (orientation === EAST) {
        return matrix.map((row, rowIndex) => {
          return row.map((col, colIndex) => matrix[colIndex][rowIndex])
        })
      }

      if (orientation === SOUTH) {
        return matrix.map((row, rowIndex) => {
          return row.map((col, colIndex) => matrix[size - rowIndex][size - colIndex])
        })
      }

      if (orientation === WEST) {
        return matrix.map((row, rowIndex) => {
          return row.map((col, colIndex) => matrix[size - colIndex][rowIndex])
        })
      }

      return matrix
    })()

    return GeneratorTemplate.matrixToTemplate(result)
  }

  static templateToMatrix (template) {
    return template.split('\n').map(r => r.split(' '))
  }

  static matrixToTemplate (matrix) {
    return matrix.map(row => row.join(' ')).join('\n')
  }

  static findWord (words = [], length, chars = []) {
    const filtered = words.filter(word => word.length === length)
      .filter((word) => {
        return chars.every((char, index) => {
          return word.charAt(index) === char
        })
      })

    if (!filtered.length) {
      console.error('No word matches', chars)
    }

    const rand = Math.floor(Math.random() * filtered.length)
    return filtered[rand]
  }
}

class WordSlot {
  constructor (start, end, direction) {
    this.start = start
    this.end = end
    this.direction = direction
    this.length = this.getLength()
    this.word = null
  }

  charsFromMatrix (matrix) {
    const [x, y] = this.start
    return [...Array(this.length)]
      .map((_, index) => {
        const char = this.direction === ACROSS ? matrix[y][x + index] : matrix[y + index][x]
        return char !== PLACEHOLDER ? char : null
      }).filter(char => char)
  }

  updateMatrix (matrix) {
    if (!this.word) return

    const [x, y] = this.start

    this.word.split('').forEach((char, index) => {
      if (this.direction === ACROSS) {
        matrix[y][x + index] = char
      } else {
        matrix[y + index][x] = char
      }
    })
  }

  getLength () {
    return this.direction === ACROSS
      ? this.end[0] - this.start[0]
      : this.end[1] - this.start[1]
  }
}

module.exports = GeneratorTemplate
