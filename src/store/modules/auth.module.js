import apiService from '@/common/api.service'
import TokenService, {
  OAUTH_NONCE_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '@/common/token.service'

// Actions
export const START_AUTH = 'auth/START_AUTH'
export const LOGOUT = 'auth/LOGOUT'
export const GET_USER = 'auth/GET_USER'

// Mutations
export const SET_TOKENS = 'auth/SET_TOKENS'
export const SET_USER = 'auth/SET_USER'
export const SET_ERROR = 'auth/SET_ERROR'
export const SET_REDIRECTING = 'auth/SET_REDIRECTING'
export const RESET_STATE = 'auth/RESET_STATE'

const initialState = () => {
  return {
    isAuthenticated: !!TokenService.getToken(ACCESS_TOKEN_KEY),
    redirecting: false,
    errors: null,
    user: {}
  }
}

const getters = {
  currentUser(state) {
    return state.user
  }
}

const actions = {
  // Start the oauth dance with Reddit
  [START_AUTH](context) {
    console.log('Starting auth')
    // We validate the return from Reddit by confirming the state
    // nonce that we send with the original request
    const nonce = Date.now().toString(36)
    TokenService.saveToken(OAUTH_NONCE_KEY, nonce)
    context.commit(SET_REDIRECTING, true)

    // Redirect to Reddit
    window.location = `https://www.reddit.com/api/v1/authorize?client_id=${
      process.env.VUE_APP_REDDIT_CLIENT_ID
    }&response_type=code&state=${nonce}&duration=permanent&scope=${
      process.env.VUE_APP_REDDIT_API_SCOPE
    }&redirect_uri=${process.env.VUE_APP_REDDIT_AUTH_RETURN_URL}`
  },

  async [GET_USER](context) {
    console.log('Getting user')
    let response = await apiService.request('GET', '/api/v1/me')

    if (!response) {
      return null
    }

    return context.commit(SET_USER, response)
  },

  [LOGOUT](context) {
    TokenService.destroyToken(ACCESS_TOKEN_KEY)
    TokenService.destroyToken(REFRESH_TOKEN_KEY)
    TokenService.destroyToken(OAUTH_NONCE_KEY)
    context.commit(RESET_STATE)
  }
}

const mutations = {
  [SET_REDIRECTING](state, redirecting) {
    state.redirecting = redirecting
  },

  [SET_ERROR](state, error) {
    state.errors = error
  },

  [SET_TOKENS](state, tokens) {
    state.isAuthenticated = true
    state.tokens = { ...state.tokens, ...tokens }
    state.errors = null
  },

  [SET_USER](state, user) {
    state.user = user
  },

  [RESET_STATE](state) {
    Object.assign(state, initialState())
  }
}

export default {
  state: initialState(),
  actions,
  mutations,
  getters
}
