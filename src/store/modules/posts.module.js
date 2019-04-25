// Actions
export const FETCH_POSTS = 'posts/FETCH_POSTS'

// Mutations
export const SET_POSTS = 'posts/SET_POSTS'

const initialState = () => {
  return {
    loading: false,
    posts: null
  }
}

const actions = {
  async [FETCH_POSTS](context) {}
}

const mutations = {
  [SET_POSTS](state, posts) {
    state.posts = posts
  }
}

export default {
  state: initialState(),
  actions,
  mutations
}
