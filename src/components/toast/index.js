import ToastComponent from './toast.vue'

export default {
	install (Vue, options) {
		Vue.prototype.$toast = function ({ content, duration = 2000 }) {
			if (document.querySelectorAll('.toast-container').length) return
			const Constructor = Vue.extend(ToastComponent)
			const Toast = new Constructor({
				data () {
					return {
						content,
						show: true
					}
				}
			})
			Toast.$mount()
			document.body.appendChild(Toast.$el)

			setTimeout(() => {
				Toast.show = false
			}, duration)
		}
	}
}
