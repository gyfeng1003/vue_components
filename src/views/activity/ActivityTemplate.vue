<template>
  <div class="activity-template">
    <m-header title="活动模板"></m-header>
		<activity-status v-if="statusVisible" 
		:status="activityStatus" 
		:start-time="commonState.activityStartTime" 
		:end-time="commonState.activityEndTime"/>
  </div>
</template>
<script>
// import MainContent from './components/main-content'
import ActivityStatus from './components/activity-status'
import util from '../../utils'
import commonState from '../../utils/common-state'
import activityBeforeStart from '@/mock/activity/activityBeforeStart.json'
export default {
	data () {
		const actId = util.getPara('actCode', location.href)
		return {
			actId,
			statusVisible: false,
			activityStatus: '',
			commonState
		}
	},
	components: {
		// MainContent,
		ActivityStatus
	},
	created () {
		if (this.actId) {
			this.init()
		}
	},
	methods: {
		init () {
			let { code } = activityBeforeStart
			if (code === 0) {
				this.onRequestSuccess(activityBeforeStart)
			} else {
				this.onRequestFail(activityBeforeStart)
			}
		},
		onRequestSuccess ({ code, result }) {
			if (+code === 0 && result) {
				this.pageConfig = result
				const { actName, backgroundColor, share } = result
				this.pageBackground = backgroundColor
				this.shareInfo = share
				this.isPageVisible = true
				this.setPageTitle(actName)
				this.setActivityTime(result)
			}
			console.log('result:', result)
		},
		onRequestFail (error) {
			const { code, result } = error
			if (code === 405) {
				// token失效
			} else if (result) {
				const { actName, actStatus } = result
				if (actStatus === 'NOTSTARTED') {
					this.setPageTitle(actName)
					this.setActivityTime(result)
					this.activityStatus = 'notStart'
					this.statusVisible = true
				} else if (actStatus === 'EXPIRED') {
					this.setPageTitle(actName)
					this.activityStatus = 'end'
					this.statusVisible = true
				}
			}
		},
		setPageTitle (title) {
			if (this.shareInfo) {
				this.setPageTitleWithShareButton(title)
				this.setUpShare()
			} else {
				this.setPageTitleWithoutShareButton(title)
			}
		},
		setPageTitleWithShareButton (title) {
			// util.setAppTitle({
			// 	title: title,
			// 	// 分享按钮
			// 	showRightBTImage: 2
			// })
		},
		setPageTitleWithoutShareButton (title) {
			// util.setAppTitle({
			// 	title: title
			// })
		},
		setActivityTime ({ actBeginTime, actEndTime }) {
			this.commonState.activityStartTime = actBeginTime
			this.commonState.activityEndTime = actEndTime
		}
	}
}
</script>
<style lang="less" scoped>
.activity-template {
  
}
</style>
