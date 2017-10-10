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
      for (let j = 0; j < 20; j++) {
        this.addRow(row)
      }
      row += 2
    }

    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < this.size - 3; i++) {
        this.addCol(i)
      }
    }

    const board = { words: { down: {}, across: {} } }
    for (let y = 1; y < this.size + 1; y++) {
      board[`y${y}`] = {}
      for (let x = 1; x <= this.size; x++) {
        board[`y${y}`][`x${x}`] = {}
      }
    }

    const allWords = this.across.concat(this.down)
    const startingCells = {}
    for (let i = 0; i < allWords.length; i++) {
      const w = allWords[i]
      startingCells[w.row * this.size + w.col] = true
    }

    let wordNum = 1
    for (let k in startingCells) {
      startingCells[k] = wordNum++
    }

    for (let i = 0; i < this.across.length; i++) {
      const { col, row, word } = this.across[i]
      const wordNum = startingCells[row * this.size + col]
      board.words.across[`w${wordNum}`] = word
      for (let c = 0; c < word.length; c++) {
        Object.assign(board[`y${row + 1}`][`x${col + 1 + c}`], { value: '', across: { word: wordNum, pos: c + 1 } })
      }
    }

    for (let i = 0; i < this.down.length; i++) {
      const { col, row, word } = this.down[i]
      const wordNum = startingCells[row * this.size + col]
      board.words.down[`w${wordNum}`] = word
      for (let c = 0; c < word.length; c++) {
        Object.assign(board[`y${row + 1 + c}`][`x${col + 1}`], { value: '', down: { word: wordNum, pos: c + 1 } })
      }
    }

    for (let y = 1; y < this.size + 1; y++) {
      for (let x = 1; x <= this.size; x++) {
        if (!Object.keys(board[`y${y}`][`x${x}`]).length) {
          board[`y${y}`][`x${x}`] = false
        } else {
          const box = board[`y${y}`][`x${x}`]
          box.across = box.across || false
          box.down = box.down || false
        }
      }
    }

    return board
  }

  addCol (row) {
    let start = this.randInt(0, 4)
    while (start < this.size) {
      let len = this.randLength(this.size - row)

      const above = this.grid[row - 1][start]
      const below = this.grid[row + len][start]
      if ((above === '.' || above === '`') && (below === '.' || below === '`')) {
        let reg = this.getRegex(row, start, len, false)
        let word = this.randWord(reg)
        this.addColWord(row, start, word)
      }
      start += this.randInt(2, 4)
    }
  }

  addRow (row) {
    let start = this.randInt(0, this.size / 3 - 3)
    let len = this.randLength(this.size - start)
    let reg, word

    let left = this.grid[row][start - 1]
    let right = this.grid[row][start + len]
    if ((left === '.' || left === '`') && (right === '.' || right === '`')) {
      reg = this.getRegex(row, start, len)
      word = this.randWord(reg)
      this.addRowWord(row, start, word)
    }

    start += len + this.randInt(1, this.size - 3 - len)
    if (start + 3 <= this.size) {
      len = this.randLength(this.size - start)
      left = this.grid[row][start - 1]
      right = this.grid[row][start + len]
      if ((left === '.' || left === '`') && (right === '.' || right === '`')) {
        reg = this.getRegex(row, start, len)
        word = this.randWord(reg)
        this.addRowWord(row, start, word)
      }
    }
  }

  addColWord (row, col, word) {
    if (word && this.down.filter(w => w.word === word).length === 0) {
      this.down.push({row, col, word})
      for (let i = 0; i < word.length; i++) {
        this.deadzone(row + i, col - 1)
        this.grid[row + i][col] = word[i]
        this.deadzone(row + i, col + 1)
      }
      this.deadzone(row - 1, col)
      this.deadzone(row + word.length, col)
    }
  }

  addRowWord (row, col, word) {
    if (word && this.across.filter(w => w.word === word).length === 0) {
      this.across.push({row, col, word})
      for (let i = 0; i < word.length; i++) {
        this.grid[row][col + i] = word[i]
      }
      this.deadzone(row, col - 1)
      this.deadzone(row, col + word.length)
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
    let str = '\n'
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        str += this.grid[i][j].replace('`', '.') + '  '
      }
      str += '\n'
    }
    console.log(str)
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
