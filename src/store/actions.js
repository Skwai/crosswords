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
  const ref = db.ref(`games/${gameId}`)
  const snapshot = await ref.once('value')
  if (!snapshot || !snapshot.exists()) throw Error(`Game doesn't exist`)
  ref.on('value', (s) => commit(types.SET_GAME, s.val()))
}

export const joinGame = async ({ commit }, { gameId, userId }) => {
  if (userId && gameId) {
    await db.ref(`games/${gameId}/users/${userId}`).set(true)
  }
}

export const setCellValue = async ({ commit }, {
  value,
  x,
  y,
  boardId,
  userId
}) => {
  const ref = db.ref(`boards/${boardId}/${y}/${x}`)
  await ref.transaction((data) => {
    return Object.assign(data, {
      value,
      user: value ? userId : null
    })
  })
}
