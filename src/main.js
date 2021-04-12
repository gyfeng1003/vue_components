import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import 'lib-flexible'
import 'animate.css'

Vue.config.productionTip = false

const app = new Vue({
	router,
	render: h => h(App)
})

window.mountApp = () => {
	app.$mount('#app')
}

if (process.env.NODE_ENV === 'production') {
	window.mountApp()
} else {
	window.mountApp()
}

const Vconsole = require('vconsole')
const vConsole = new Vconsole()
Vue.use(vConsole)
