import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  strict: process.env.NODE_ENV !== 'production'
})
