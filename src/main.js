import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import apiService from '@/common/api.service'
import '@/registerServiceWorker'

Vue.config.productionTip = false

apiService.init(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
