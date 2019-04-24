import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import authGuard from '@/router/guards/auth.guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: authGuard,
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth.vue')
    }
  ]
})
