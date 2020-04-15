import Vue from 'vue'
import loading from './index.vue'

let Loading = Vue.extend(loading)
let appEl = null

class Load {
	static getInstance () {
		appEl = appEl || document.getElementById('#app')
		if (!Load.instance || !Load.vm) {
			Load.instance = new Load()
			Load.vm = new Loading()
			document.body.insertBefore(Load.vm.$mount().$el, appEl)
		}
		return Load.instance
	}
	openLoading () {
		Load.vm && Object.assign(Load.vm, {
			show: true
		})
	}
	closeLoading () {
		Load.vm && Object.assign(Load.vm, {
			show: false
		})
	}
}

export default Load.getInstance()
