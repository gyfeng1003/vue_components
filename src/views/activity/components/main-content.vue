<template>
	<div class="main-content">
		<page-header :image="pageHeaderImage" :rules="activityRules"></page-header>
		<!-- 盖住吸顶时上方出现的空隙 -->
		<fixed-menu v-if="hasMenu" 
			:menu-items="menuItems" 
			:related-elements="menuRelatedElements" 
			:offset="menuPositionOffset"
			@get-height="setMenuHeight"
			></fixed-menu>
		<to-top></to-top>
		<component class="group" 
			v-for="(group, index) in groups" 
			:key="index" 
			ref="group" 
			:is="getComponent(group.type)" 
			:data="transformData(group)" 
			:is-last-module="index === groups.length - 1" 
			:sticky-offset="stickyModuleOffset" 
			:location="location"
			@refresh="requestRefresh"
			></component>
			<is-bottom></is-bottom>
			<order-entry v-if="orderEntryVisible"/>
	</div>
</template>

<script>
import PageHeader from '../mainContent/page-header'
import FixedMenu from '../mainContent/fixed-menu'
import ToTop from '../mainContent/to-top'
import Banner from '../mainContent/banner'
import Pintuan from '../mainContent/pintuan'
import OneColGroup from '../mainContent/one-col-group'
import TwoColGroup from '../mainContent/two-col-group'
import Advertise from '../mainContent/advertise'
import Information from '../mainContent/information'
import Waterfall from '../mainContent/waterfall'
import Seckill from '../mainContent/seckill'
import Coupon from '../mainContent/coupon'
import IsBottom from '../mainContent/is-bottom'
import OrderEntry from '../mainContent/order-entry'

import { groupTypes } from '../constants'
import { transformTicketItem, isTicket, isFeed } from '../utils'
import EventBus from '../../common/eventBus'
export default {
	name: 'MainContent',
	props: {
		pageConfig: Object,
		location: Object,
		downloadBannerHeight: Number,
		pageClassName: {
			type: String,
			required: true
		},
		orderEntryVisible: Boolean
	},
	components: {
		PageHeader,
		FixedMenu,
		ToTop,
		IsBottom,
		OrderEntry
	},
	data () {
		const type2components = {
			[groupTypes.pintuan]: Pintuan,
			[groupTypes.banner]: Banner,
			[groupTypes.feed]: Waterfall,
			[groupTypes.topBottomProducts]: OneColGroup,
			[groupTypes.leftRightProducts]: TwoColGroup,
			[groupTypes.advertise]: Advertise,
			[groupTypes.information]: Information,
			[groupTypes.miaosha]: Seckill,
			[groupTypes.coupon]: Coupon
		}
		return {
			type2components,
			pageBackground: '',
			pageHeaderImage: '',
			isMenuEnabled: false,
			menuItems: [],
			menuRelatedElements: [],
			menuHeight: 0,
			normalMenuColor: '',
			activeMenuColor: '',
			groups: [],
			activityRules: ''
		}
	},
	computed: {
		headerImageHeight () {
			if (this.pageHeaderImage) {
				const { width, height } = this.pageHeaderImage
				if (width && height) {
					const heightWidthRatio = (parseFloat(height) / parseFloat(width) * 100).toFixed(2)
					return `${heightWidthRatio}vw`
				}
			}
			return ''
		},
		hasMenu () {
			return this.isMenuEnabled && this.menuItems.length > 0
		},
		stickyModuleOffset () {
			return this.downloadBannerHeight + this.menuHeight - 1
		},
		menuPositionOffset () {
			// 防止导航与下载引导间出现空隙
			if (this.downloadBannerHeight > 0) {
				const pixelsToPreventGap = 1
				return this.downloadBannerHeight - pixelsToPreventGap
			} else {
				return 0
			}
		}
	},
	methods: {
		init () {
			this.parsePageConfig()
			this.setUpMenu()
			this.insertDynamicStyle()
			this.setUpUpdateCouponListener()
		},
		parsePageConfig () {
			const { backgroundColor: pageBackground, actHeadImg, isEnableBar, barColor, selectedColor, elementTypes, actRule } = this.pageConfig
			this.pageBackground = pageBackground
			this.pageHeaderImage = actHeadImg
			this.isMenuEnabled = isEnableBar
			this.normalMenuColor = barColor
			this.activeMenuColor = selectedColor
			this.groups = elementTypes
			this.activityRules = actRule
		},
		setUpMenu () {
			this.$nextTick(() => {
				this.menuItems = []
				this.menuRelatedElements = []
				const groupElems = this.$refs.group
				this.groups.forEach((item, index) => {
					if (this.shouldAppearInMenu(item) && this.hasTitle(item)) {
						this.menuItems.push(item.titleName)
						this.menuRelatedElements.push(groupElems[index].$el)
					}
				})
			})
		},
		shouldAppearInMenu ({ type }) {
			return !this.isBanner(type)
		},
		isBanner (type) {
			return type === groupTypes.banner
		},
		hasTitle ({ titleName }) {
			return !!titleName
		},
		insertDynamicStyle () {
			let cssVariables = `
				--color-primary: ${this.pageBackground};
				--color-background: ${this.pageBackground};
				--color-nav: ${this.normalMenuColor || this.pageBackground};
				--color-nav-active: ${this.activeMenuColor || this.normalMenuColor || this.pageBackground};
			`
			const pintuanGroupConfig = this.groups.find(item => item.type === groupTypes.pintuan)
			if (pintuanGroupConfig) {
				const { 
					noTabBgColor: normalTabBgColor, 
					noTabColor: normalTabTextColor, 
					tabBgColor: activeTabBgColor, 
					tabColor: activeTabTextColor
				} = pintuanGroupConfig
				// TODO 没有设值的情况
				cssVariables += `
					--color-pintuan-normal-bg: ${normalTabBgColor};
					--color-pintuan-normal-font: ${normalTabTextColor};
					--color-pintuan-active-bg: ${activeTabBgColor};
					--color-pintuan-active-font: ${activeTabTextColor};
				`
			}
			let styleSheetContent = `.${this.pageClassName}{
				${cssVariables}
			}`
			styleSheetContent = styleSheetContent.replace(/\s/g, '')
			const styleSheet = document.querySelector('custom-stylesheet') || document.createElement('style')
			styleSheet.type = 'text/css'
			styleSheet.innerText = styleSheetContent
			styleSheet.id = 'custom-stylesheet'
			document.body.appendChild(styleSheet)
		},
		setUpUpdateCouponListener () {
			EventBus.$on('update-coupon', this.updateCoupon)
		},
		updateCoupon (result) {
			const { elementTypes } = result
			elementTypes.forEach((group, index) => {
				const oldGroup = this.groups[index]
				const oldGroupIsCoupon = oldGroup.type === groupTypes.coupon
				const newGroupIsCoupon = group.type === groupTypes.coupon
				if (oldGroupIsCoupon && newGroupIsCoupon) {
					this.groups.splice(index, 1, group)
				}
			})
		},
		setMenuHeight (height) {
			this.menuHeight = height
		},
		getComponent (type) {
			return this.type2components[type]
		},
		transformData (data) {
			const { groupType, type, groups } = data
			if (isTicket(groupType)) {
				return this.transformTicketData(data)
			} else {
				if (isFeed(type)) {
					groups.forEach((group, index) => {
						const { groupType } = group
						if (isTicket(groupType)) {
							groups[index] = this.transformTicketData(group)
						}
					})
				}
			}
			return data
		},
		transformTicketData (data) {
			const { tickets } = data
			data.products = tickets && tickets.map(transformTicketItem)
			return data
		},
		requestRefresh () {
			this.$emit('refresh')
		}
	},
	watch: {
		pageConfig: {
			immediate: true,
			handler (config) {
				if (config) {
					this.init()
				}
			}
		}
	}
}
</script>

<style lang="less">
	.main-content{
		padding-bottom: 100px;
	}
	.ad-container{
		img{
			display: block;
			width: 100%;
		}
	}
	.group{
		padding-bottom: 50px;
		.more-btn{
			margin-top: 30px;
			.button-inner{
				color: var(--color-background);
				.icon-icon-more{
					display: block;
					line-height: 1;
					color: var(--color-background);
					font-size: 30px;
					transform-origin: center;
					transform: rotateZ(90deg);
				}
			}
		}
	}
	.capsule-product{
		// 设计图上为240
		// 但是240在IOS上图片底部出现空白
		height: 230px;
		border-radius: 10px;
		.capsule-product-img{
			width: 230px;
			height: 230px;
			border-radius: 0 10px 10px 0;
		}
	}
	.capsule-product-sale{
		margin-top: 2px;
	}
	.capsule-product-btn{
		min-width: auto;
		padding: 0 24px;
	}
	.card-product-btn{
		padding: 0 24px;
	}
	// 备货中商品隐藏价格
	.capsule-product.is-preparing{
		.capsule-product-price{
			visibility: hidden;
		}
	}
	.card-product.is-preparing{
		.card-product-price{
			visibility: hidden;
		}
	}
</style>
