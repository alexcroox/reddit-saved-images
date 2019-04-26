import store from '@/store'

// If our route has auth meta we need to check the user is authenticated
// This is done via our vuex store
const requireUser = async (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/setup')
  }
}

export default requireUser
