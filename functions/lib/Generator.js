module.exports = class Generator {
  constructor (size, words) {
    this.size = size
    this.words = words
    this.grid = []
    this.down = []
    this.across = []

    for (let i = -1; i < size + 1; i++) {
      this.grid[i] = []
      for (let j = -1; j < size + 1; j++) {
        this.grid[i][j] = '.'
      }
    }
  }

  generateBoard () {
    let row = 0
    while (row < this.size) {
      this.addRow(row)
      row += 2
    }

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < this.size - 3; i++) {
        this.addCol(i)
      }
    }
  }

  addCol (row) {
    let start = this.randInt(0, 4)
    while (start < this.size) {
      let len = this.randLength(3, this.size - row)
      let reg = this.getRegex(row, start, len, false)
      let word = this.randWord(reg)
      this.addColWord(row, start, word, false)
      start += this.randInt(2, 4)
    }
  }

  addRow (row) {
    let start = this.randInt(0, this.size / 3 - 3)
    let len = this.randLength(this.size - start)
    let reg = this.getRegex(row, start, len)
    let word = this.randWord(reg)
    this.addRowWord(row, start, word)

    start += len + this.randInt(1, this.size - 3 - len)
    if (start + 3 <= this.size) {
      len = this.randLength(this.size - start)
      reg = this.getRegex(row, start, len)
      word = this.randWord(reg)
      this.addRowWord(row, start, word)
    }
  }

  addColWord (row, col, word) {
    if (word) {
      this.down.push({row, col, word})
      for (let i = 0; i < word.length; i++) {
        this.deadzone(row + i, col - 1)
        this.grid[row + i][col] = word[i]
        this.deadzone(row + i, col + 1)
      }
    }
  }

  addRowWord (row, col, word) {
    if (word) {
      this.across.push({row, col, word})
      for (let i = 0; i < word.length; i++) {
        this.grid[row][col + i] = word[i]
      }
      this.deadzone(row, col - 1)
      this.deadzone(row, col + word.len)
    }
  }

  deadzone (row, col) {
    const c = this.grid[row][col]
    if (c === '.') {
      this.grid[row][col] = '`'
    }
  }

  getRegex (row, col, len, left = true) {
    let r = '^'
    for (let i = 0; i < len; i++) {
      r += this.grid[row + (left ? 0 : i)][col + (left ? i : 0)]
    }
    r += '$'
    return new RegExp(r, 'i')
  }

  printBoard () {
    let str = ''
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        str += this.grid[i][j].replace('`', '.') + '  '
      }
      str += '\n'
    }
    console.log(str)
    console.log('Down: ')
    for (let i = 0; i < this.down.length; i++) {
      console.log(this.down[i])
    }
    console.log('Across: ')
    for (let i = 0; i < this.across.length; i++) {
      console.log(this.across[i])
    }
    return str
  }

  randWord (reg) {
    const samples = this.words.filter((w) => reg.test(w))
    return samples[this.randInt(0, samples.length)]
  }

  randLength (max) {
    const min = 3
    max = Math.floor(max) + 1
    return Math.floor(Math.random() * (max - min)) + min
  }

  randInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  randBool (max) {
    return this.randInt(2) === 1
  }
}