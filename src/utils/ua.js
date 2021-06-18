export default ((ua) => {
	if (ua) {
		return {
			ua,
			isIOS: /iPhone|ipad/gi.test(ua) // 是否 iOS
		}
	}
})(navigator.userAgent)
