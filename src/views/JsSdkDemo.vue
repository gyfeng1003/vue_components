<template>
  <div class="jssdk-demo">
   <m-header title="h5端js-sdk功能demo"></m-header>
	 <br/>
	 <h4>注：该功能需要在原生android、ios客户端环境下运行</h4>
	 <h4>sdk源码地址：<a href="https://github.com/gyfeng1003/js-sdk" target="_blank">https://github.com/gyfeng1003/js-sdk</a></h4>
	 <h4>android原生测试包需要的联系：2584903317@qq.com</h4>
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
		// 原生app header头的返回按钮事件
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
	h4{
		padding: 16px 0;
	}
}
</style>
