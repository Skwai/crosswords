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
    return GeneratorTemplate.getTemplate(this.size, this.orientation)
      .then(template => {
        const orientation = GeneratorTemplate.getOrientation()
        const orientated = GeneratorTemplate.orientateTemplate(orientation, template)
        console.log('\n' + orientated)
        const matrix = GeneratorTemplate.templateToMatrix(orientated)
        const filled = this.fill(matrix)
        console.log(filled)
      })
  }

  fill (matrix) {
    const words = [...this.words]
    const slots = GeneratorTemplate.getWordSlots(matrix)
    console.log(slots)
    slots.forEach(slot => {
      const word = GeneratorTemplate.findWord(words, slot.length)
      slot.word = word
      slot.updateMatrix(matrix)
    })
    return matrix
  }

  resetSlots () {
    this.slots.forEach(slot => {
      slot.word = null
    })
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
    return slots.sort((a, b) => b.length - a.length)
      // .filter(({ length }) => length > 0)
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
    return template.split('\n')
      .map(r => r.split(' '))
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
      throw Error(`No word matches. Length: ${length}. Chars: ${chars.join(',')}`)
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
    const chars = [...Array(this.length)]
      .map(() => null)
      .map((_, index) => {
        const { direction } = this
        const char = direction === ACROSS ? matrix[y][x + index] : matrix[y + index][x]
        return char !== PLACEHOLDER ? char : null
      })
    return chars
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
