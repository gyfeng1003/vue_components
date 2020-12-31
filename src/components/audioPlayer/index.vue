<template>
	<div class="audio-box" @touchmove.prevent :class="{ IOS: _isiOS }">
		<audio ref="audio" preload="metadata" :src="source" :autoplay="_isiOS" @canplay="canplayHandler" @timeupdate="timeUpdateHandler"
    @ended="endedHandler">
			<source :loop="cycle" type="audio/mp3">
		</audio>
		<div class="item-title">语音导览</div>
		<div class="progress-box">
			<div class="progressBar" ref="progressBar" @touchstart="justifyProgress">
				<div class="progress" :style="{'width': progressBarWidth}"></div>
				<div class="progressDot" id="progressDot" :style="{'left': progressDotLeft}"
        @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler"></div>
			</div>
			<div class="audio-time">
				<span class="audio-current">{{currentTime}}</span>
				<span class="audio-total">{{totalTime}}</span>
			</div>
		</div>
		<div class="control-box">
			<div class="cycle" @click="cycle = !cycle">
				<i class="iconfont" :class="{'iconxunhuanx': cycle, 'iconxunhuanstop':!cycle}"></i>
			</div>
			<div class="left-speed" @click="prevAudio">
				<i class="iconfont iconhoutuix"></i>
			</div>
			<div class="play" id="audioPlayer" @click="playPlayer">
				<i class="iconfont" :class="{'iconplay': paused, 'iconstop': !paused}"></i>
			</div>
			<div class="right-speed" @click="nextAudio">
				<i class="iconfont iconqianjinx"></i>
			</div>
			<div class="volume" @click="setMuted">
				<i class="iconfont" :class="{'iconno_volcex': muted, 'iconvolcex': !muted}"></i>
			</div>
		</div>
	</div>
</template>

<script>
import { formatTimeStr } from '@/utils'
const UA = window.navigator.userAgent
export default {
	name: 'audio-comp',
	data () {
		return {
			cycle: true,
			muted: false,
			paused: true,
			progressBarWidth: '',
			progressDotLeft: '',
			currentTime: '00.00',
			totalTime: '00.00',
			flag: false, // 标记是否拖动开始
			position: {
				oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
				oriX: 0, // 移动开始时的x坐标
				maxLeft: 0, // 向左最大可拖动距离
				maxRight: 0 // 向右最大可拖动距离
			}
		}
	},
	props: {
		source: {
			type: String,
			default: ''
		}
	},
	methods: {
		_isiOS () {
			return !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		},
		canplayHandler () {
			let audio = this.$refs.audio
			this.totalTime = this.transTime(audio.duration)
		},
		// 监听音频播放时间并更新进度条
		timeUpdateHandler () {
			let audio = this.$refs.audio
			this.updateProgress(audio)
		},
		endedHandler () {
			let audio = this.$refs.audio
			this.audioEnded()
			audio.currentTime = 0
			if (this.cycle) {
				this.paused = false
				audio.play()
			}
		},
		setMuted () {
			let audio = this.$refs.audio
			this.muted = !this.muted
			audio.muted = this.muted
		},
		prevAudio () {
			if (!this.paused) {
				let audio = this.$refs.audio
				let desireTime = audio.currentTime - 10
				audio.currentTime = desireTime < 0 ? 0 : desireTime
			}
		},
		nextAudio () {
			if (!this.paused) {
				let audio = this.$refs.audio
				let desireTime = audio.currentTime + 10
				audio.currentTime = desireTime < audio.duration ? desireTime : audio.duration
			}
		},
		justifyProgress (e) {
			let audio = this.$refs.audio
			// 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
			if (!audio.paused || audio.currentTime !== 0) {
				let audioBoxPadLeft = parseFloat(getComputedStyle(document.getElementsByClassName('audio-box')[0]).paddingLeft)
				let pgsWidth = this.$refs.progressBar.offsetWidth
				let rate = (e.touches[0].clientX - audioBoxPadLeft) / pgsWidth
				audio.currentTime = audio.duration * rate
				this.updateProgress(audio)
			}
		},
		updateProgress (audio) {
			let value = audio.currentTime / audio.duration
			this.progressBarWidth = value * 100 + '%'
			this.progressDotLeft = value * 100 + '%'

			this.currentTime = this.transTime(audio.currentTime)
		},
		/**
		 * 播放完成时把进度调回开始的位置
		 */
		audioEnded () {
			this.progressBarWidth = 0
			this.progressDotLeft = 0
			this.paused = true
		},
		/**
		 * 音频播放时间换算
		 * @param {number} value - 音频当前播放时间，单位秒
		 */
		transTime (value) {
			var time = ''
			var h = parseInt(value / 3600)
			value %= 3600
			var m = parseInt(value / 60)
			var s = parseInt(value % 60)
			if (h > 0) {
				time = formatTimeStr(h + ':' + m + ':' + s)
			} else {
				time = formatTimeStr(m + ':' + s)
			}

			return time
		},
		playPlayer () {
			let audio = this.$refs.audio
			if (!audio.src) {
				alert('音频链接不存在')
				return
			}
			if (audio.paused) {
				// 开始播放当前点击的音频
				audio.play()
				this.paused = false
			} else {
				audio.pause()
				this.paused = true
			}
		},
		touchstartHandler (event) {
			let audio = this.$refs.audio
			let { oriOffestLeft } = this.position
			if (!audio.paused || audio.currentTime !== 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
				this.flag = true
				this.position = {
					oriOffestLeft: event.target.offsetLeft,
					oriX: event.touches ? event.touches[0].clientX : event.clientX, // 要同时适配mousedown和touchstart事件
					maxLeft: oriOffestLeft, // 向左最大可拖动距离
					maxRight: this.$refs.progressBar.offsetWidth - oriOffestLeft // 向右最大可拖动距离
				}

				// 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
				if (event && event.preventDefault) {
					event.preventDefault()
				} else {
					event.returnValue = false
				}

				// 禁止事件冒泡
				if (event && event.stopPropagation) {
					event.stopPropagation()
				} else {
					window.event.cancelBubble = true
				}
			}
		},
		touchmoveHandler (event) {
			let audio = this.$refs.audio
			let { oriOffestLeft, oriX, maxLeft, maxRight } = this.position
			if (this.flag) {
				let clientX = event.touches ? event.touches[0].clientX : event.clientX // 要同时适配mousemove和touchmove事件
				let length = clientX - oriX
				if (length > maxRight) {
					length = maxRight
				} else if (length < -maxLeft) {
					length = -maxLeft
				}
				let pgsWidth = this.$refs.progressBar.offsetWidth
				let rate = (oriOffestLeft + length) / pgsWidth
				audio.currentTime = audio.duration * rate
				this.updateProgress(audio)
			}
		},
		touchendHandler (event) {
			this.flag = false
		}
	}
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';
.audio-box {
	background: #fff;
	padding: 20px 30px;
	position: fixed !important;
	z-index: 22;
  bottom: 0;
  left: 0;
  right: 0;
	.border-1px(2px, #eaeaea, top);

	.item-title {
		font-size: 28px;
		color: #333333;
		text-align: center;
		line-height: 40px;
	}

	.progress-box {
		padding-top: 20px;
		width: 100%;
		box-sizing: border-box;
		position: relative;

		.progressBar, .progress {
			background: #DDDDDD;
			border-radius: 2.5px;
			height: 4px;
		}

		.progressBar {
			width: 100%;
			position: relative;
		}

		.progress {
			background: #2C8AE2;
			width: 0;
		}

		.dot-box {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			position: absolute;
			top: 42%;
			transform: translateY(-50%);
			left: 0;
		}

		.progressDot {
			position: absolute;
			top: 50%;
			left: 0%;
			transform: translate(-50%, -50%);
			width: 18px;
			height: 18px;
			border-radius: 50%;
			background: radial-gradient(#fff, #ececec);
			box-shadow: 0 1px 2px #696262;

			&:after {
				content: '';
				width: 300px;
				height: 60px;
				display: inline-block;
				position: absolute;
				top: -50%;
				left: 50%;
				transform: translate(-50%, -10%);
			}
		}

		.audio-time {
			margin-top: 10px;
      display: flex;
      justify-content: space-between;
			.audio-current, .audio-total {
				line-height: 30px;
				font-size: 22px;
				color: #999999;
			}
		}
	}

	.control-box {
		display: flex;
		height: 76px;
		line-height: 76px;
		div {
			width: 20%;
			text-align: center;
		}

		.left-speed, .play, .right-speed {
			color: #1296db;
		}

		.iconplay, .iconstop {
			font-size: 76px;
		}

		.iconhoutuix, .iconqianjinx {
			font-size: 40px;
		}

		.iconxunhuanx, .iconvolcex, .iconno_volcex, .iconxunhuanstop {
			font-size: 36px;
		}
	}
}
@supports (height: env(safe-area-inset-bottom)) {
	.audio-box.IOS{
		padding-bottom: ~'max(20px, env(safe-area-inset-bottom))';
	}
}
</style>
