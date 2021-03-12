<!-- 活动未开始、已结束弹窗 -->
<template>
	<div class="status-content" v-if="status">
		<div class="status-image" :class="[status]"></div>
		<h3 class="main-title">{{ mainTitle[status] }}</h3>
		<h3 class="sub-title" v-html="subTitle"></h3>
	</div>
</template>

<script>
import { formatDate } from '../../../utils'
export default {
	name: 'ActivityStatus',
	props: {
		visible: Boolean,
		startTime: [String, Number],
		endTime: [String, Number],
		status: {
			type: String,
			validator (value) {
				return value === '' || value === 'notStart' || value === 'end' || value === 'other'
			}
		}
	},
	data () {
		return {
			passVisible: this.visible,
			mainTitle: {
				notStart: '亲 您来早啦 活动还未开始',
				end: '亲 您来晚啦 活动已结束'
			}
		}
	},
	computed: {
		startTimeFormatted () {
			return this.formatDate(this.startTime, '/')
		},
		endTimeFormatted () {
			return this.formatDate(this.endTime, '/')
		},
		subTitle () {
			if (this.status === 'notStart') {
				let result = `活动时间<br/>${this.startTimeFormatted}`
				if (this.startTimeFormatted !== this.endTimeFormatted) {
					result = `${result}-${this.endTimeFormatted}`
				}
				return result
			} else if (this.status === 'end') {
				return '感谢您的参与<br/>敬请关注其他活动'
			}
			return ''
		}
	},
	methods: {
		formatDate
	},
	created () {
		if (this.status === 'notStart') {
			document.body.style.background = '#fff'
		} else {
			document.body.style.background = '#f0f2f5'
		}
	}
}
</script>

<style lang="less">
	.status-content{
		width: 100vw;
		border-radius: 8px;
		padding: 153px 0 90px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.status-image{
			width: 400px;
			height: 300px;
			background-size: 100% 100%;
			&.notStart {
				background-image: url('~@/assets/images/activity/image-not-start.png');
			}
			&.end {
				background-image: url('~@/assets/images/activity/image-end.png');
			}
		}
		.main-title{
			margin-top: 48px;
			font-size: 38px;
			font-weight: 500;
			color: #333333;
			line-height: 53px;
			text-align: center;
		}
		.sub-title{
			margin-top: 38px;
			font-size: 28px;
			font-weight: 400;
			color: #666666;
			line-height: 40px;
			text-align: center;
		}
	}
</style>
