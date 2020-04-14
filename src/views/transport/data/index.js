// 路线、景点写死数据
/* eslint-disable */
import { zh } from './constants'
import line_zh from './zh'

// 汉字当2宽度、英文、空格1宽度
// 三种宽度 界限 分别为 7汉字、14汉字
let minTextLength = 14
let maxTextLength = 20
let enWidth = 1
let zhWidth = 2

// 景点名称控制宽度类名
const smallClass = 'normal'
const middleClass = 'middle'
const largeClass = 'large'

// 图片切割clip-path属性对应svg id
const svgSmall = 'svg1'
const svgMiddle = 'svg2'
const svgLarge = 'svg3'

// 裁剪大小
const standardWidth = 750
const physicPixel = window.innerWidth * window.devicePixelRatio
const ratio = physicPixel / standardWidth

const smallImg = parseInt(200 * ratio)
const middleImg = parseInt(280 * ratio)
const largeImg = parseInt(400 * ratio)

const normalHeight = ''
const largeHeight = 'largeHeight'
const ultraLargeHeight = 'ultraLargeHeight'

/**
 *  @var siteSvg
 *  @description
 * 	  景点对应svg的id 缓存
 *  @example
 * 	  	let siteSvg = {
 * 	  		  '锦江乐园': svgSmall,
 * 	  		  'Jinjiang Park': svgMiddle		//英文更长点
 * 	  	}
 */
let siteSvg = {}

/**
 * 	@var widthList
 *  @description
 * 	  景点对应宽度类名
 *  @example
 * 	  	let widthList = {
 * 	  		  '锦江乐园': smallClass,
 * 	  		  'Jinjiang Park': middleClass		//英文更长点
 * 	  	}
 */
let widthList = {}

/**
 *  @description ۞۞۞۞۞ 线路数据结构 ۞۞۞۞۞
 *  @example
 * 		const line_zh = {
 * 			1: {
 * 				lineName: '1号线',			//下面会定义getter分配
 * 				colorClass: 'line1',	//主题色，必填
 * 				stations: [
 * 					{
 * 						stationName: '莘庄',
 * 						sites: [
 * 							{
 * 								siteName: '锦江公园',
 * 								lmm: '',				//驴妈妈id，非必填，优先于id
 * 								id: '',					//详情id，非必填
 * 								imgSrc: 'http://hhh.images.visitshanghai.com.cn/metro/JinjiangPark.jpg?imageView/1/w/'	//图片地址，非必填， imageView参数设置图片裁剪宽度，页面引用时需拼接图片长度 imgSrc + width
 * 							}
 * 						]
 * 					}
 * 				]
 * 			}
 * 		}
 * 		const line_zh = {
 * 			// 同上
 * 		}
 * 		
 * 		export default line_zh
 */
const clipPrefix = '?imageView/1/w/'
// 七牛引用图片高度固定148,宽度三个等级
const imgHeight = `/h/${parseInt(148 * ratio)}`
let imgWidth = {}
// 估计景点名称宽度
const calcWidth = siteName => {
	let width = 0
	for (let char of siteName) {
		// 汉字
		if (/[\u4e00-\u9fa5]/.test(char)) {
			width += zhWidth
		} else {
			width += enWidth
		}
	}
	if (width < minTextLength) {
		return {
			imgWidth: clipPrefix + smallImg + imgHeight,
			widthClass: smallClass,
			svgId: svgSmall
		}
	} else if (width <= maxTextLength) {
		return {
			imgWidth: clipPrefix + middleImg + imgHeight,
			widthClass: middleClass,
			svgId: svgMiddle
		}
	} else {
		return {
			imgWidth: clipPrefix + largeImg + imgHeight,
			widthClass: largeClass,
			svgId: svgLarge
		}
	}
}
// > 750
const largeScreen = [ 28, 50 ]
// > 350
const middleScreen = [18, 30]
// < 350
const smallScreen = [15, 25]
let largeStandard = 0,
	ultraStandard = 0
const windowWidth = window.innerWidth
if (windowWidth > 750) {
	[largeStandard, ultraStandard] = largeScreen
} else if (windowWidth > 350) {
	[largeStandard, ultraStandard] = middleScreen
} else {
	[largeStandard, ultraStandard] = smallScreen
}
const calcStationHeight = stationName => {
	let width = 0
	for (let char of stationName) {
		width += enWidth
	}
	if (width > ultraStandard) {
		return ultraLargeHeight
	} else if (width > largeStandard) {
		return largeHeight
	} else {
		return normalHeight
	}
}
// ۞۞۞۞۞ 数据预处理，定义getter及缺省字段 ۞۞۞۞
const dataFormat = data => {
	for (let line in data) {
		const lineData = data[line]
		const { stations } = lineData
		stations.forEach(station => {
			let { sites } = station
			if (sites) {
				sites = sites.filter(site => {
					return site.id || site.lmm || site.read
				})
				// 3个景点最多展示1个图，以上最多展示两个图
				const maxImg = sites.length > 3 ? 2 : 1
				// 有图片并且未超过限制的
				const sitesWithImages = []
				// 不展示图片的
				const sitesWithoutImages = []
				sites.forEach(site => {
					if (site.imgSrc && sitesWithImages.length < maxImg) {
						sitesWithImages.push(site)
					} else {
						sitesWithoutImages.push(site)
					}
					let svgId = '',
						widthClass = '',
						imgWidth = 0
					// defindProperty为了推迟计算，避免非当前语言计算
					// 图片根据名称长度确定使用的svg
					Object.defineProperty(site, 'svgId', {
						get () {
							// 闭包
							if (svgId) {
								if (sitesWithImages.indexOf(site) === 0) {
									return svgId
								} else {
									return ''
								}
							} else {
								({svgId, widthClass, imgWidth} = calcWidth(this.siteName))
								if (sitesWithImages.indexOf(site) === 0) {
									return svgId
								} else {
									return ''
								}
							}
						}
					})
					Object.defineProperty(site, 'widthClass', {
						get () {
							// 闭包
							if (widthClass) {
								return widthClass
							} else {
								({svgId, widthClass, imgWidth} = calcWidth(this.siteName))
								return widthClass
							}
						}
					})
					Object.defineProperty(site, 'imgWidth', {
						get () {
							// 闭包
							if (imgWidth) {
								return imgWidth
							} else {
								({svgId, widthClass, imgWidth} = calcWidth(this.siteName))
								return imgWidth
							}
						}
					})
				})
				// 有驴妈妈、详情的排在前面
				sitesWithImages.sort((prev, next) => {
					// 有驴妈妈的在前，没有则有详情的在前
					const hasLmm = !!next.lmm - !!prev.lmm
					if (hasLmm === 0) {
						return !!next.id - !!prev.id
					} else {
						return hasLmm
					}
				})
				sitesWithoutImages.sort((prev, next) => {
					const hasLmm = !!next.lmm - !!prev.lmm
					if (hasLmm === 0) {
						return !!next.id - !!prev.id
					} else {
						return hasLmm
					}
				})
				station.sitesWithImages = sitesWithImages
				station.sitesWithoutImages = sitesWithoutImages
			}
			station.sites = sites
		})
	}
}
dataFormat(line_zh)
export default line_zh
