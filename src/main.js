import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'lib-flexible'
import "./style/normalize.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
