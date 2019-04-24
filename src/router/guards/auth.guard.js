import store from '@/store'

// If our route has auth meta we need to check the user is authenticated
// This is done via our vuex store
const authCheck = async (to, from, next) => {
  if (store.state.auth.isAuthenticated) {
    next()
  } else {
    next('/auth')
  }
}

export default authCheck
