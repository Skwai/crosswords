module.exports = class Board {
  constructor ({
    width = 9,
    height = 9,
    dictionary = []
  }) {
    this.opts = {
      width,
      height,
      dictionary
    }
    this.matrix = new Matrix(width, height)
  }
}

class Matrix {
  constructor (width, height) {
    Object.assign(this, { width, height })
    this.cells = [...Array(height)].map((_, row) =>
      [...Array(width)].map((_, col) => new Cell(row, col, null)))
  }
}

class Cell {
  constructor (row, col, value) {
    Object.assign(this, { row, col, value })
  }

  toString () {
    return this.value
  }
}
