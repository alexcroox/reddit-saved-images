import localStorage from '@/lib/localstorage.service'
import apiService from '@/lib/api.service'
import getMedia from '@/lib/media-domains'

// Actions
export const FETCH_POSTS = 'posts/FETCH_POSTS'
export const PURGE_POSTS = 'posts/PURGE_POSTS'

// Mutations
export const SET_POSTS = 'posts/SET_POSTS'
const storedPosts = JSON.parse(localStorage.load('posts'))

const initialState = () => {
  return {
    list: storedPosts ? storedPosts : [],
    fetchFailed: false
  }
}

const actions = {
  async [FETCH_POSTS](context, username) {
    let response = await apiService.request(
      'GET',
      `/user/${username}/saved?limit=100`
    )

    if (!response || !('data' in response)) {
      return false
    }

    let posts = []

    response.data.children.forEach(postData => {
      let post = postData.data

      let media = getMedia(post)

      if (!media) return

      let trimmedPost = {
        media,
        title: post.title,
        preview: post.preview,
        thumbnail: post.thumbnail,
        url: post.url,
        id: post.id,
        debug: post
      }

      posts.push(trimmedPost)
    })

    context.commit(SET_POSTS, posts)

    return true
  },

  [PURGE_POSTS](context) {
    context.commit(SET_POSTS, [])
  }
}

const mutations = {
  [SET_POSTS](state, posts) {
    state.list = posts
    state.fetchFailed = false

    if (posts.length) {
      localStorage.save('posts', JSON.stringify(posts))
    } else {
      localStorage.delete('posts')
    }
  }
}

export default {
  state: initialState(),
  actions,
  mutations
}
