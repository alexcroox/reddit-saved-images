import JwtService from '@/common/jwt.service'
import ApiService from '@/common/api.service'

// Actions
const LOGOUT = 'auth/LOGOUT'

// Mutations
const CHECK_AUTH = 'auth/CHECK_AUTH'
const PURGE_AUTH = 'auth/PURGE_AUTH'
const SET_AUTH = 'auth/SET_AUTH'
const SET_ERROR = 'auth/SET_ERROR'

const state = {
  isAuthenticated: !!JwtService.getToken(),
  errors: null,
  user: {}
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGOUT](context) {
    context.commit(PURGE_AUTH)
  },
  async [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()

      try {
        let data = await ApiService.get('user')
        context.commit(SET_AUTH, data.user)
      } catch ({ response }) {
        context.commit(SET_ERROR, response.data.errors)
      }
    } else {
      context.commit(PURGE_AUTH)
    }
  }
}

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = null
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = null
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
