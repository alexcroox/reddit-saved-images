import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.module'
import posts from './modules/posts.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    posts
  },
  strict: process.env.NODE_ENV !== 'production'
})
