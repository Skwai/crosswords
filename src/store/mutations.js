import * as types from './types'

export default {
  [types.SET_FOCUSED_WORD] (state, word) {
    state.focusedWord = word
  },

  [types.REMOVE_FOCUSED_WORD] (state) {
    state.focusedWord = {
      down: null,
      across: null
    }
  },

  [types.SET_GAME] (state, game) {
    console.log(game)
    state.game = game
  },

  [types.SET_BOARD] (state, board) {
    state.board = board
  },

  [types.SET_BOARD_ID] (state, boardId) {
    state.boardId = boardId
  }
}
