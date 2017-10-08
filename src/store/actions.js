import * as types from './types'
import db, { fb } from '@/services/firebase'
import config from '@/config'

export const auth = async ({ commit, state }) => {
  if (state.uid) return

  try {
    await fb.auth().signInAnonymously()
    fb.auth().onAuthStateChanged(({ uid }) => {
      localStorage.setItem(config.UID_STORAGE_KEY, uid)
      commit(types.SET_UID, uid)
      commit(types.SET_COLOR, uid)
    })
  } catch (err) {
    console.error(err)
  }
}

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

export const loadGame = async ({ commit, state }, gameId) => {
  commit(types.SET_GAME_ID, gameId)
  return new Promise((resolve) => {
    db.ref(`games/${gameId}`).on('value', (snapshot) => {
      resolve()
      commit(types.SET_GAME, snapshot.val())
    })
  })
}

export const joinGame = async ({ commit }, { gameId, userId }) => {
  await db.ref(`games/${gameId}/users/${userId}`).set(true)
}

export const setCellValue = async ({ commit }, {
  value,
  x,
  y,
  boardId
}) => {
  await db.ref(`boards/${boardId}/${y}/${x}/value`).set(value)
}
