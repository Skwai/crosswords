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
  db.ref('boards').child(boardId).on('value', (snapshot) => {
    commit(types.SET_BOARD, snapshot.val())
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
