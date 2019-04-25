import localStorage from '@/common/localstorage.service'
import JwtService from '@/common/jwt.service'
import ApiService from '@/common/api.service'

// Actions
export const START_AUTH = 'auth/START_AUTH'
export const LOGOUT = 'auth/LOGOUT'
export const CHECK_AUTH = 'auth/CHECK_AUTH'

// Mutations
export const SET_AUTH = 'auth/SET_AUTH'
export const SET_ERROR = 'auth/SET_ERROR'
export const SET_REDIRECTING = 'auth/SET_REDIRECTING'
export const PURGE_AUTH = 'auth/PURGE_AUTH'

const initialState = () => {
  return {
    isAuthenticated: !!JwtService.getToken(),
    redirecting: false,
    errors: null,
    oauthRandomState: null,
    user: {}
  }
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
  // Start the oauth dance with Reddit
  [START_AUTH](context) {
    console.log('Starting auth')
    // We validate the return from Reddit by confirming the state
    // nonce that we send with the original request
    let randomState = Date.now().toString(36)
    localStorage.save('oauthRandomState', randomState)
    context.commit(SET_REDIRECTING, true)

    // Redirect to Reddit
    window.location = `https://www.reddit.com/api/v1/authorize?client_id=${
      process.env.VUE_APP_REDDIT_CLIENT_ID
    }&response_type=code&state=${randomState}&duration=permanent&scope=${
      process.env.VUE_APP_REDDIT_API_SCOPE
    }&redirect_uri=${process.env.VUE_APP_REDDIT_AUTH_RETURN_URL}`
  },

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
  [SET_REDIRECTING](state, redirecting) {
    state.redirecting = redirecting
  },

  [SET_ERROR](state, error) {
    state.errors = error
  },

  [SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = null
  },

  [PURGE_AUTH](state) {
    Object.assign(state, initialState())
  }
}

export default {
  state: initialState(),
  actions,
  mutations,
  getters
}
