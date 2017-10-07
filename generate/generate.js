fs = require("fs")
wordsData = require("../data/words.json")

size = 16
words = Object.keys(wordsData)
grid = []

for (var i = -1; i < size + 1; i++) {
  grid[i] = []
  for (var j = -1; j < size + 1; j++) {
    grid[i][j] = "."
  }
}

generateBoard()

function generateBoard() {
  let row = 0;
  while (row < size) {
    addRow(row)
    row += randInt(2, 4);
  }

  for (var i = 0; i < size-3; i++) {
    addCol(i);
  }

  printBoard()
}

function addCol(row) {
  let start = randInt(0, 4)
  while (start < size) {
    let len = randLength(3, size-row);
    let reg = getRegex(row, start, len, false);
    let word = randWord(reg);
    addColWord(row, start, word, false);
    start += randInt(2, 4)
  }

}

function addRow(row) {
  let start = randInt(0, size/2-3);
  let len = randLength(size-start);
  let reg = getRegex(row, start, len);
  let word = randWord(reg);
  addRowWord(row, start, word);


  start += len + randInt(1, size-3-len)
  if (start + 3 <= size) {
    len = randLength(size-start);
    reg = getRegex(row, start, len)
    word = randWord(reg);
    addRowWord(row, start, word);
  }
}


function addColWord(row, col, word) {
  if (word) {
    for (var i = 0; i < word.length; i++) {
      deadzone(row+i, col - 1)
      grid[row + i][col] = word[i]
      deadzone(row+i, col + 1);
    }
  }
}

function addRowWord(row, col, word) {
  if (word) {
    for (var i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i]
    }
    deadzone(row, col-1)
    deadzone(row, col+word.len)
  }
}

function deadzone(row, col) {
  const c = grid[row][col];
  if (c == ".") {
    grid[row][col] = "`"
  }
}

function getRegex(row, col, len, left = true) {
  let r = "^"
  for (var i = 0; i < len; i++) {
    r += grid[row + (left ? 0 : i)][col + (left ? i : 0)]
  }
  r += "$"
  return new RegExp(r, "i")
}

function printBoard() {
  let str = ""
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      str += grid[i][j].replace("`", ".") + "  "
    }
    str += "\n"
  }
  console.log(str)
}

function randWord(reg) {
  const samples = words.filter((w) => reg.test(w));
  return samples[randInt(0, samples.length)]
}

function randLength(max) {
  min = 3;
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randBool(max) {
  return randInt(2) === 1;
}