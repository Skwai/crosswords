import * as types from './types'
import db from '@/services/firebase'

export const focusWord = ({ commit }, word) => {
  commit(types.SET_FOCUSED_WORD, word)
}

export const unfocusWord = ({ commit }) => {
  commit(types.REMOVE_FOCUSED_WORD)
}

export const loadBoard = async ({ commit }, id) => {
  const snapshot = await db.ref('boards').child(id).once('value')
  commit(types.SET_BOARD, snapshot.val())
}
