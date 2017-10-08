import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import config from '@/config'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state: {
    board: null,
    boardId: null,
    game: null,
    gameId: null,

    uid: localStorage.getItem(config.UID_STORAGE_KEY) || null,

    focusedWord: {
      across: null,
      down: null
    }
  },
  strict: debug
})
