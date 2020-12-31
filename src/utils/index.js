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
