import * as types from './types'
import db from '@/services/firebase'

export const focusWord = ({ commit }, word) => {
  commit(types.SET_FOCUSED_WORD, word)
}

export const unfocusWord = ({ commit }) => {
  commit(types.REMOVE_FOCUSED_WORD)
}

export const loadBoard = async ({ commit }, boardId) => {
  commit(types.SET_BOARD_ID, boardId)
  return new Promise((resolve) => {
    db.ref(`boards/${boardId}`).on('value', (snapshot) => {
      resolve()
      commit(types.SET_BOARD, snapshot.val())
    })
  })
}

export const loadGame = async ({ commit }, gameId) => {
  return new Promise((resolve) => {
    db.ref(`games/${gameId}`).on('value', (snapshot) => {
      resolve()
      commit(types.SET_GAME, snapshot.val())
    })
  })
}

export const setCellValue = async ({ commit }, {
  value,
  x,
  y,
  boardId
}) => {
  await db.ref(`boards/${boardId}/${y}/${x}/value`).set(value)
}
