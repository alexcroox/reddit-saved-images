import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/views/Posts.vue'
import requireUser from '@/router/guards/auth.guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'posts',
      beforeEnter: requireUser,
      component: Posts
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('@/views/Setup.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth.vue')
    }
  ]
})
