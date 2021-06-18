import Vue from 'vue'
import App from './App.vue'
import mHeader from './components/mHeader/index.js'
import router from './router/index'
import { NumberKeyboard, Overlay } from 'vant'
import 'vant/lib/number-keyboard/style'
import 'vant/lib/overlay/style'

import 'lib-flexible'
import 'animate.css'

Vue.use(mHeader)
Vue.use(NumberKeyboard)
Vue.use(Overlay)
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
