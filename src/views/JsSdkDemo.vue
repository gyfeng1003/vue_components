<template>
  <div class="jssdk-demo">
   <m-header title="h5端js-sdk功能demo"></m-header>
   <div class="load-btn" @click="showloading">显示Loading</div>
  </div>
</template>
<script>
import mHeader from '@/components/mHeader'
import yjyJsSDK from 'yjy-js-sdk'
export default {
	data () {
		return {
		
		}
	},
	components: {
		mHeader
	},
	mounted () {
		yjyJsSDK.watchAppBackBtn(() => {
			yjyJsSDK.closeWebView()
		})
		// 调用setAppTitle方法后、APP原生头返回按钮的点击事件托管给H5注册调用
		yjyJsSDK.setAppTitle({
			title: '测试返回按钮'
		})
		console.log(yjyJsSDK)
	},
	methods: {
		showloading () {
			yjyJsSDK.showLoading()
		}
	}
}
</script>
<style lang="less" scoped>
.jssdk-demo {
  .load-btn {
    width: 200px;
    height: 80px;
    line-height: 80px;
    background: #fff;
    margin: 100px auto 0;
  }
}
</style>
