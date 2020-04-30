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
	if (window.STYLE_READY) {
		window.mountApp()
	}
} else {
	window.mountApp()
}
