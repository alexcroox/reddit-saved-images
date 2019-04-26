import Vue from 'vue'

// TODO: use vuetify/lib to reduce bundle size
// (fix weird sass errors it produces on compile...)
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'md'
})
