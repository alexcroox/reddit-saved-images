import apiService from '@/lib/api.service'
import localStorage from '@/lib/localstorage.service'
import TokenService, {
  OAUTH_NONCE_KEY,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} from '@/lib/token.service'
import { PURGE_POSTS } from './posts.module'

// Actions
export const START_AUTH = 'auth/START_AUTH'
export const LOGOUT = 'auth/LOGOUT'
export const GET_USER = 'auth/GET_USER'

// Mutations
export const SET_TOKENS = 'auth/SET_TOKENS'
export const SET_USERNAME = 'auth/SET_USERNAME'
export const SET_ERROR = 'auth/SET_ERROR'
export const SET_LOADING = 'auth/SET_LOADING'
export const RESET_STATE = 'auth/RESET_STATE'

const existingUsername = localStorage.load('username')

const initialState = () => {
  return {
    loading: false,
    tokens: {
      accessToken: null,
      refreshToken: null
    },
    error: null,
    username: existingUsername || null
  }
}

const getters = {
  isAuthenticated(state) {
    return state.username ? true : false
  }
}

const actions = {
  // Start the oauth dance with Reddit
  [START_AUTH](context) {
    // We validate the return from Reddit by confirming the state
    // nonce that we send with the original request
    const nonce = Date.now().toString(36)
    TokenService.saveToken(OAUTH_NONCE_KEY, nonce)
    context.commit(SET_LOADING, true)

    // Redirect to Reddit
    window.location = `https://www.reddit.com/api/v1/authorize?client_id=${
      process.env.VUE_APP_REDDIT_CLIENT_ID
    }&response_type=code&state=${nonce}&duration=permanent&scope=${
      process.env.VUE_APP_REDDIT_API_SCOPE
    }&redirect_uri=${process.env.VUE_APP_REDDIT_AUTH_RETURN_URL}`
  },

  async [GET_USER](context) {
    let response = await apiService.request('GET', '/api/v1/me')

    if (!response || 'name' in response === false) {
      return null
    }

    localStorage.save('username', response.name)

    return context.commit(SET_USERNAME, response.name)
  },

  [LOGOUT](context) {
    TokenService.destroyToken(ACCESS_TOKEN_KEY)
    TokenService.destroyToken(REFRESH_TOKEN_KEY)
    TokenService.destroyToken(OAUTH_NONCE_KEY)
    localStorage.delete('username')
    context.dispatch(PURGE_POSTS, null, { root: true })
    context.commit(RESET_STATE)
  }
}

const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading
  },

  [SET_ERROR](state, error) {
    state.error = error
  },

  [SET_TOKENS](state, tokens) {
    TokenService.saveToken(ACCESS_TOKEN_KEY, tokens.accessToken)
    TokenService.saveToken(REFRESH_TOKEN_KEY, tokens.refreshToken)
    state.tokens = { ...state.tokens, ...tokens }
    state.error = null
  },

  [SET_USERNAME](state, username) {
    state.username = username
  },

  [RESET_STATE](state) {
    Object.assign(state, initialState())
  }
}

export default {
  state: initialState(),
  getters,
  actions,
  mutations
}
