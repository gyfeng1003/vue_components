/* eslint-disable */

/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param {string} value - 形如 h:m:s 的字符串
 */
export function formatTimeStr (value) {
	var time = ''
	var s = value.split(':')
	var i = 0
	for (; i < s.length - 1; i++) {
		time += s[i].length === 1 ? ('0' + s[i]) : s[i]
		time += ':'
	}
	time += s[i].length === 1 ? ('0' + s[i]) : s[i]

	return time
}

export const formatDate = (timeStamp, split = '/') => {
	const date = new Date(timeStamp)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${year}${split}${month}${split}${d}`
}

export default {
	/**
 * 获取url参数
 * @param {string} key 所要获取的url参数的键
 * @param {string} url 所要从该url获取参数，若不传默认为location.href
 * @returns {string|array} 获取到的参数，若有多个，则返回数组
 */
	getPara (key, url = location.href) {
		if (!this._isString(key)) return
		let urlReg = new RegExp(`(?:&|\\?)${key}=(.*?)(?=\\?|&|\/|#|$)`, 'g')
		let res = []
		let match
		while (match = urlReg.exec(url)) {
			res.push(decodeURIComponent(match[1]))
		}
		// 如果有多个结果返回数组，否则直接返回获取的字符串
		return res.length > 1
			? res
			: res[0]
	},
	/**
	 * 内部方法，判断传入参数是不是stirng类型
	 * @private
	 * @param {any} item 需要判断的变量
	 * @returns {boolean} 结果值
	 */
 	_isString(item) {
		return this._toString(item) === '[object String]';
	},
	/**
	 * 内部方法，反射调用Object.toString
	 * @private
	 * @param {any} item 需要toString操作的变量
	 * @returns {string} 结果值
	 */
	_toString(item) {
		return Object.prototype.toString.call(item);
	}
}
