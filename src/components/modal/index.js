import Template from './modal.vue'
const camelize = (str) => {
	str = String(str)
	const camelizeRegExp = /-(\w)/g
	return str.replace(camelizeRegExp, function (m, c) {
		return c ? c.toUpperCase() : ''
	})
}

/**
 * 获取单例组件
 * @param  {Object}  Vue                    Vue 对象，由 install 函数传入
 * @param  {Object}  Template               组件模板
 * @param  {[Boolean, Function]} showHook   show 函数，默认调用组件的 show 方法
 * @param  {[Boolean, Function]} hideHook   hide 函数，默认调用组件的 hide 方法
 */
const getSingletonComponent = (Vue, Template, showHook = false, hideHook = false) => {
	const buffer = {} // 全局缓冲池
	const constructor = Vue.extend(Template) // 组件构造函数
	const id = camelize(Template.name) // 以组件 name 的驼峰命名作为组件缓冲池 id
	const name = `$${camelize(Template.name.replace(/^we-/g, ''))}` // 暴露 `$组件名称` 供初始化调用

	// Vue.$name({options})
	Vue.prototype[name] = (options = {}) => {
		let instance = buffer[id] || (buffer[id] = new constructor())
		if (!instance.$el) {
			let vm = instance.$mount()
			document.body.appendChild(vm.$el)
		}

		if (!showHook) {
			showHook = (_instance, _options) => {
				_instance.show(_options)
			}
		}

		showHook(instance, options)
	}

	// Vue.$name.close()
	Vue.prototype[name].close = () => {
		let instance = buffer[id]

		if (!instance) {
			return
		}

		if (!hideHook) {
			hideHook = (_instance) => {
				_instance.hide()
			}
		}

		hideHook(instance)
	}
}

Template.install = (Vue) => {
	return getSingletonComponent(Vue, Template)
}

export default Template
