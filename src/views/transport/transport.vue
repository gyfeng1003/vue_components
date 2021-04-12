/* eslint-disable no-tabs */
/* eslint-disable no-tabs */
<!-- 地铁 -->
<template>
	<div id="transport" :class="lineData.colorClass">
		<div id="main" ref="innerWrapper">
			<div id="header" ref="header" @click="toCompleteRoute">
				<div id="header-title">
					<div id="main-title">上海地铁总览图</div>
				</div>
				<div id="header-img"></div>
			</div>
			<div id="bottom-content" ref="wrapper" :class="{ complete: !headerVisible }">
				<!-- 线路切换 -->
				<div id="line-wrapper" ref="line">
					<div class="line-no-wrapper" v-for="(line, lineNo) in lineList" :key="'line-no-'+lineNo">
						<div class="line-no" :class="{active: currentLine === lineNo}" @click="switchLine(lineNo)">
							<div>{{ line.lineName }}</div>
						</div>
					</div>
				</div>
				<!-- 线路站点列表 -->
				<div id="station-wrapper" ref="scroll">
					<div
						class="station"
						:class="[{isFirst: index === 0, isLast: index === lineData.stations.length - 1, hasSites: station.sites && station.sites.length, hasImages: station.sitesWithImages && station.sitesWithImages.length > 0}, station.heightClass, station.selfHeight]"
						v-for="(station, index) of lineData.stations"
						:key="'station-'+station.stationName"
						:style="{ top: `${station.top}px`, height: `${ station.height }px` }"
					>
						<!-- 站点名 -->
						<div class="station-l">
							<div class="station-name" v-html="station.stationName"></div>
						</div>
						<!-- 直线 -->
						<div class="station-m">
							<div class="station-line"></div>
							<div class="station-dot"></div>
						</div>
						<!-- 景点 -->
						<div
							class="station-sites"
							v-if="station.sites"
							:class="{ needTransform: station.sitesWithImages.length > 0 }"
						>
							<!-- 展示图片景点 -->
							<template v-for="site in station.sitesWithImages">
								<div class="site-info" :key="'site-'+site.siteName" @click="toDetail(site)">
									<!-- .img-wrapper 的宽度由.site-name（景点名称）撑 -->
									<div class="img-wrapper" :class="[site.svgId ? 'needSVG' : '', site.svgId]">
										<div class="site-bg" :background-image="site.imgSrc+site.imgWidth"></div>
										<div class="site-name" :class="[site.widthClass]">{{ site.siteName }}</div>
									</div>
									<!-- 详情icon，优先驴妈妈，驴妈妈显示'门票' -->
									<div v-if="site.lmm" class="site-icon ticket">{{ ticketText }}</div>
								</div>
							</template>
							<div
								class="more-btn"
								v-if="station.sitesWithImages.length > 0 && station.sitesWithoutImages.length > 0 && station.sites.length > 3"
							>{{ moreText }}</div>
							<!-- 不展示图片景点 -->
							<div
								class="more-sites"
								:class="{ needMargin: station.sitesWithImages.length > 0 && station.sitesWithoutImages.length > 0 && station.sites.length <= 3}"
							>
								<template v-for="site of station.sitesWithoutImages">
									<div
										class="more-site"
										@click="toDetail(site)"
										:key="station.stationName+'-'+site.siteName"
									>
										<i class="more-dot"></i>
										<!-- 详情icon，优先驴妈妈，驴妈妈显示'门票' -->
										<div class="more-name">
											{{site.siteName}}
											<div v-if="site.lmm" class="site-icon ticket">{{ ticketText }}</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</div>
				</div>
				<!-- 切割图片 -->
				<svg id="svg">
					<defs>
						<!-- objectBoundingBox 适应容器 -->
						<!-- 默认大小 -->
						<clipPath id="svg1" clipPathUnits="objectBoundingBox">
							<path :d="svgPath1" fill="transparent" />
						</clipPath>
						<!-- 大 -->
						<clipPath id="svg2" clipPathUnits="objectBoundingBox">
							<path :d="svgPath2" fill="transparent" />
						</clipPath>
						<!-- 最大 -->
						<clipPath id="svg3" clipPathUnits="objectBoundingBox">
							<path :d="svgPath3" fill="transparent" />
						</clipPath>
					</defs>
				</svg>
				<!-- 全网图 -->
			</div>
		</div>
		<div id="fixed-btn">
			<!-- <img id="to-metro-app" :src="metroAppImg" @click="openMetroApp"> -->
			<!-- <img id="to-complete-route" :src="allLineImg" @click="toCompleteRoute" /> -->
		</div>
	</div>
</template>

<script>
import lineList from './data'
export default {
	name: 'transport',
	data () {
		const moreText = '更多'
		const ticketText = '门票'
		// const headerImg = require('@/static/image/transport/header_cn.jpg')
		// const metroAppImg = require('@/static/image/transport/app-white.png')
		// const allLineImg = require('@/static/image/transport/map-white.png')
		return {
			lineList,
			// 初始选中1号线
			currentLine: Object.keys(lineList)[0],
			svgPath1: this.getSvgPath(210),
			svgPath2: this.getSvgPath(290),
			svgPath3: this.getSvgPath(410),
			headerHeight: 0,
			moreText,
			ticketText,
			// headerImg,
			// allLineImg,
			// metroAppImg,
			paddingLeft: 0,
			middlePosition: 0,
			startTime: 0,
			headerVisible: true,
			maxScrollTop: 0,
			doItOnce: false,
			disableBtn: false
		}
	},
	computed: {
		// 当前线路数据
		lineData () {
			return this.lineList[this.currentLine] || []
		}
	},
	mounted () {
		// WeHotel.setAppTitle({
		// 	title: '地铁'
		// })
		const scrollArea = this.$refs.scroll
		scrollArea.addEventListener('touchstart', this.touchstart)
		scrollArea.addEventListener('touchmove', this.touchmove)
	},
	methods: {
		touchstart (event) {
			({ clientX: this.touchStartX, clientY: this.touchStartY } = event.touches[0])
			this.doItOnce = false
			this.maxScrollTop = this.$refs.scroll.scrollHeight - this.$refs.scroll.clientHeight
		},
		touchmove (event) {
			const scrollTop = this.$refs.scroll.scrollTop
			const { clientX, clientY } = event.touches[0]
			// 侧滑
			if (clientX < 0) {
				return
			}
			const isVerticalMove = Math.abs(clientY - this.touchStartY) > Math.abs(clientX - this.touchStartX)
			if (isVerticalMove) {
				if (scrollTop <= 0) {
					// 下拉
					if (clientY > this.touchStartY) {
						// 初始滚动位置为0,或者ios下滚动位置为负值，第一次点击
						if (scrollTop === 0 || (scrollTop < 0 && this.doItOnce === false)) {
							event.preventDefault()
							if (!this.headerVisible) {
								this.showHeader()
								this.headerVisible = true
							}
						}
						// 上拉
					} else {
						if (this.headerVisible) {
							this.hideHeader()
							this.headerVisible = false
						}
					}
					// 上拉
				} else if (clientY < this.touchStartY) {
					if (this.headerVisible) {
						this.hideHeader()
						this.headerVisible = false
					}
				}
				if (this.maxScrollTop <= 0 || scrollTop === this.maxScrollTop) {
					if (clientY < this.touchStartY) {
						event.preventDefault()
					}
				}
			}
			this.doItOnce = true
		},
		hideHeader () {
			this.$refs.innerWrapper.style.transform = `translateY(-${this.headerHeight}px)`
		},
		showHeader () {
			this.$refs.innerWrapper.style.transform = `translateY(0px)`
		},
		// 缓出
		easeOutQuad (x) {
			return 1 - (1 - x) * (1 - x)
		},
		imgLoad () {
			this.headerHeight = this.$refs.header.offsetHeight
		},
		// 点击线路滚动到中央
		smoothScrollBy (distance, duration, initialScroll) {
			const moveFunc = timeStamp => {
				if (!this.startTime) {
					this.startTime = timeStamp
					requestAnimationFrame(moveFunc)
				} else {
					const passTime = timeStamp - this.startTime
					const targetPosition = parseInt(this.easeOutQuad(passTime / duration) * distance) + initialScroll
					this.$refs.line.scrollLeft = targetPosition
					if (passTime < duration) {
						requestAnimationFrame(moveFunc)
					} else {
						this.$refs.line.scrollLeft = initialScroll + distance
						this.startTime = 0
					}
				}
			}
			requestAnimationFrame(moveFunc)
		},
		// 切换线路
		switchLine (lineNo) {
			if (lineNo !== this.currentLine) {
				this.currentLine = lineNo
				const forbidScrollClass = 'forbidScroll'
				this.$refs.scroll.classList.add(forbidScrollClass)
				this.$refs.scroll.scrollTop = 0
				this.$nextTick(() => {
					this.$refs.scroll.classList.remove(forbidScrollClass)
				})
				const index = Object.keys(lineList).indexOf(lineNo)
				const el = this.$refs.line.children[index]
				const { left, width } = el.getBoundingClientRect()
				if (!this.paddingLeft) {
					this.paddingLeft = parseInt(getComputedStyle(el).paddingLeft)
					this.middlePosition = window.innerWidth / 2 - width / 2 - this.paddingLeft
				}
				const scrollLeft = this.$refs.line.scrollLeft
				const delta = left - this.middlePosition
				this.smoothScrollBy(delta, 300, scrollLeft)
			}
		},
		// svg百分比path
		getSvgPath (width) {
			const fixed = num => num.toFixed(5)
			const template = `M ${fixed(20 / width)} 0
						A ${fixed(10 / width)} 0.0625 0 0 0 ${fixed(10 / width)} 0.0625
						V 0.4375
						L 0 0.5
						L ${fixed(10 / width)} 0.5625
						V 0.9375
						A ${fixed(10 / width)} 0.0625 0 0 0 ${fixed(20 / width)} 1
						H ${fixed((width - 10) / width)}
						A ${fixed(10 / width)} 0.0625 0 0 0 1 0.9375
						V 0.0625
						A ${fixed(10 / width)} 0.0625 0 0 0 ${fixed((width - 10) / width)} 0
						Z`
			return template
		},
		// 跳转详情
		toDetail ({ id, lmm, read }) {
		},
		// 全网图
		toCompleteRoute () {
		},
		// 打开大都会APP
		openMetroApp () {
			if (this.disableBtn) {
				return
			}
			this.disableBtn = true
			setTimeout(() => {
				this.disableBtn = false
			}, 500)
			// WeHotel.openThirdApp(metroObj)
		}
	},
	beforeDestroy () {
		const scrollArea = this.$refs.scroll
		scrollArea.removeEventListener('touchstart', this.touchstart)
		scrollArea.removeEventListener('touchmove', this.touchmove)
	}
}
</script>

<style lang="less" scoped>
// @import "~@/styles/variable.less";
@color-placeholder-1: rgba(0, 0, 0, 0.05);
@color-placeholder-2: #d8d8d8;
@trans-gray: #545451;
@trans-white: #fff;
@trans-black: #000;
@trans-border-1: #e6e6e6;
@trans-top-padding: 100px;
// 字号
@trans-font-small-1: 16px; //more
@trans-font-small-2: 18px; //详情
@trans-font-large-1: 26px; //线路名
@trans-font-large-2: 24px; //站点名
@trans-font-large-3: 22px; //景点名
// 各线路主题色
@trans-one: #fb2828; //1
@trans-two: #85cb39; //2
@trans-three: #ffc009; //3
@trans-four: #4200a9; //4
@trans-five: #892e94; //5
@trans-six: #d30057; //6
@trans-seven: #f8740a; //7
@trans-eight: #2c8ae2; //8
@trans-nine: #8ecef6; //9
@trans-ten: #ba9acf; //10
@trans-eleven: #8e2d12; //11
@trans-twlve: #56a400; //12
@trans-thirteen: #f48cb4; //13
@trans-sixteen: #53cdb1; //16
@trans-seventeen: #c48772; //17
// CSS 变量设置线路主题色 (https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
.line1 {
	--color-theme-dark: @trans-one;
	--color-theme-light: fade(@trans-one, 5%);
}
.line2 {
	--color-theme-dark: @trans-two;
	--color-theme-light: fade(@trans-two, 5%);
}
.line3 {
	--color-theme-dark: @trans-three;
	--color-theme-light: fade(@trans-three, 5%);
}
.line4 {
	--color-theme-dark: @trans-four;
	--color-theme-light: fade(@trans-four, 5%);
}
.line5 {
	--color-theme-dark: @trans-five;
	--color-theme-light: fade(@trans-five, 5%);
}
.line6 {
	--color-theme-dark: @trans-six;
	--color-theme-light: fade(@trans-six, 5%);
}
.line7 {
	--color-theme-dark: @trans-seven;
	--color-theme-light: fade(@trans-seven, 5%);
}
.line8 {
	--color-theme-dark: @trans-eight;
	--color-theme-light: fade(@trans-eight, 5%);
}
.line9 {
	--color-theme-dark: @trans-nine;
	--color-theme-light: fade(@trans-nine, 5%);
}
.line10 {
	--color-theme-dark: @trans-ten;
	--color-theme-light: fade(@trans-ten, 5%);
}
.line11 {
	--color-theme-dark: @trans-eleven;
	--color-theme-light: fade(@trans-eleven, 5%);
}
.line12 {
	--color-theme-dark: @trans-twlve;
	--color-theme-light: fade(@trans-twlve, 5%);
}
.line13 {
	--color-theme-dark: @trans-thirteen;
	--color-theme-light: fade(@trans-thirteen, 5%);
}
.line16 {
	--color-theme-dark: @trans-sixteen;
	--color-theme-light: fade(@trans-sixteen, 5%);
}
.line17 {
	--color-theme-dark: @trans-seventeen;
	--color-theme-light: fade(@trans-seventeen, 5%);
}
#transport {
	height: 100%;
	font-size: @trans-font-small-2;
	overflow: hidden;
}
#main {
	transition: transform 0.2s ease-out;
}
#bottom-content {
	display: flex;
	flex-direction: column;
	height: calc(100vh - (300 / 750 * 100vw));
	overflow: hidden;
	&.complete {
		height: 100vh;
	}
}
#header {
	position: relative;
	width: 100%;
	height: calc(300 / 750 * 100vw);
	background-color: @color-placeholder-1;
}
#header-img {
	width: 100%;
	height: 100%;
	background: #2c8ae2;
}
#header-title {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
	text-align: center;
}
#main-title {
	font-size: 50px;
	font-weight: 600;
	color: rgba(255, 255, 255, 1);
	line-height: 52px;
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	white-space: nowrap;
}
#sub-title {
	margin-top: 14px;
	font-size: 30px;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 40px;
	text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
.iconicon_dt {
	font-size: 28px;
}
.iconicon_dt {
	margin-left: 16px;
}
#line-wrapper {
	flex-shrink: 0;
	display: flex;
	background-color: @trans-black;
	overflow-x: auto;
	width: 100%;
	height: 96px;
	align-items: center;
}
#station-wrapper {
	background: linear-gradient(
		to right,
		var(--color-theme-light) 34%,
		transparent 34%
	);
	flex-grow: 1;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	&.forbidScroll {
		overflow-y: hidden;
	}
}
.line-no-wrapper {
	flex-shrink: 0;
	padding-left: 30px;
	&:last-child {
		padding-right: 30px;
	}
}
.line-no {
	color: @trans-white;
	font-size: @trans-font-large-1;
	font-weight: 500;
	height: 60px;
	line-height: 60px;
	min-width: 120px;
	text-align: center;
	padding: 0 20px;
	border-radius: 30px;
	border: 1px solid @trans-border-1;
	white-space: nowrap;
	&.active {
		border-color: var(--color-theme-dark);
		background-color: var(--color-theme-dark);
	}
}
.station {
	display: flex;
	position: relative;
	min-height: 58px;
	&.hasImages {
		// 有图片的站点，图片transform上移，所以用padding增加顶部空白，防止遮住上一站
		padding-top: 20px;
		// 圆点下移
		.station-m {
			top: 20px;
		}
	}
	&.isFirst {
		margin-top: @trans-top-padding;
	}
	&.largeHeight {
		min-height: 84px;
	}
	&.ultraLargeHeight {
		min-height: 94px;
	}
}
.station-l {
	width: 34%;
	padding-left: 10px;
	display: flex;
	justify-content: flex-end;
	.isLast & {
		padding-bottom: calc(@trans-top-padding / 2);
	}
}
// 宽度较小时，部分站点名高度较大
@media screen and (max-width: 340px) {
	.station {
		min-height: 78px;
		&.largeHeight {
			min-height: 98px;
		}
		&.ultraLargeHeight {
			min-height: 108px;
		}
	}
}
.station-name {
	font-size: @trans-font-large-2;
	color: @trans-gray;
	text-align: right;
	height: fit-content;
	padding-right: 12px;
	line-height: 40px;
	// 与右侧远点对齐
	transform: translateY(-50%);
	position: relative;
	top: 14px;
	margin-right: 20px;
	.hasSites & {
		padding-left: 12px;
		border-radius: 20px;
		font-size: @trans-font-large-1;
		font-weight: 500;
	}
}
.station-m {
	position: absolute;
	left: 34%;
	top: 0;
	transform: translateX(-50%);
	height: 100%;
}
.station-dot {
	position: relative;
	width: 28px;
	height: 28px;
	border-width: 4px;
	border-style: solid;
	background-color: @trans-white;
	border-radius: 50%;
	border-color: var(--color-theme-dark);
	.hasSites & {
		background-color: var(--color-theme-dark);
	}
}
.station-line {
	width: 6px;
	// 长20px，补偿hasImages加的padding-top
	height: calc(100% + 20px);
	position: absolute;
	left: 50%;
	// 14px为dot高度一半
	transform: translate(-50%, 14px);
	background-color: var(--color-theme-dark);
	.isFirst.isLast & {
		height: 0;
	}
}
// 透明度渐变，等待图片加载
.site-info {
	position: relative;
	width: fit-content;
}
.img-wrapper {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: fit-content;
	height: 148px;
	margin-bottom: 10px;
	// 右移适应箭头宽度
	border-radius: 10px;
	left: 10px;
	&.needSVG {
		left: 0;
	}
	&.svg1 {
		clip-path: url("#svg1");
	}
	&.svg2 {
		clip-path: url("#svg2");
	}
	&.svg3 {
		clip-path: url("#svg3");
	}
}
.station-sites {
	width: 66%;
	padding-left: 32px;
	// 有图片，上移
	&.needTransform {
		transform: translateY(-60px);
	}
	.hasSites & {
		padding-bottom: 50px;
	}
}
.site-img {
	display: block;
	height: 148px;
}
.site-bg {
	display: block;
	height: 148px;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	width: 100%;
	background-size: 100% 100%;
	border-radius: 10px;
	overflow: hidden;
}
.site-name {
	font-size: @trans-font-large-2;
	width: 200px;
	height: 36px;
	padding-left: 10px;
	padding-right: 10px;
	line-height: 36px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	color: @trans-white;
	text-align: center;
	background-color: rgba(0, 0, 0, 0.7);
	border-radius: 0 0 10px 10px;
	// 需要SVG切割的宽度加10像素箭头
	.needSVG & {
		padding-left: 20px;
		&.normal {
			width: 210px;
		}
		&.middle {
			width: 290px;
		}
		&.large {
			width: 410px;
		}
	}
	&.normal {
		width: 200px;
	}
	&.middle {
		width: 280px;
	}
	&.large {
		width: 400px;
	}
}
.site-icon {
	padding: 0 8px;
	line-height: 30px;
	border-radius: 0px 8px 0px 8px;
	font-size: @trans-font-small-2;
	&.ticket {
		background-color: #ffd00f;
	}
	&.detail {
		background-color: #50e3c2;
	}
	.site-info & {
		position: absolute;
		right: 0;
		top: 0;
	}
	.more-site & {
		padding: 3px 8px;
		vertical-align: middle;
		line-height: 1;
		margin-left: 10px;
		flex-shrink: 0;
		display: inline;
		word-break: keep-all;
	}
}
.hasSites {
	.station-name {
		background-color: var(--color-theme-dark);
		color: @trans-white;
	}
	.station-dot {
		background-color: var(--color-theme-dark);
	}
}
.more-btn {
	color: var(--color-theme-dark);
	height: 24px;
	line-height: 24px;
	margin-top: 20px;
	margin-bottom: 10px;
	font-size: @trans-font-small-1;
}
.needMargin {
	margin-top: 20px;
}
.more-site {
	display: flex;
	align-items: flex-start;
	margin-bottom: 20px;
	vertical-align: middle;
}
.more-dot {
	width: 8px;
	height: 8px;
	flex-shrink: 0;
	transform: translateY(8px);
	border-radius: 50%;
	background-color: var(--color-theme-dark);
	margin-right: 10px;
}
// 景点名称宽度限制， 与图片最大宽一致
.more-name {
	font-size: @trans-font-large-1;
	max-width: 400px;
	line-height: 28px;
}
// 隐藏svg
#svg {
	position: absolute;
	top: -999px;
	opacity: 0;
	pointer-events: none;
}
#fixed-btn {
	position: fixed;
	right: 20px;
	bottom: 200px;
	width: 88px;
}
#to-metro-app,
#to-complete-route {
	width: 88px;
	border-radius: 50%;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}
#to-complete-route {
	margin-top: 36px;
}
</style>
