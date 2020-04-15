<template>
  <transition name="fade">
    <div class="loading-wrapper" v-show="show" @touch.prevent>
      <div class="loading-box">
        <spinner></spinner>
        <span class="loading-text">
          加载中
        </span>
      </div>
    </div>
  </transition>
</template>
<script>
import Spinner from '@/template/loadingSpinner'
export default {
	components: {
		Spinner
	},
	data () {
		return {
			show: false
		}
	}
}
</script>
<style lang="less" scoped>
.loading-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 999;
    background-color: rgba(0, 0, 0, .05);
    .loading-box{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 150px;
      height: 150px;
      background: rgba(0,0,0,0.70);
      border-radius: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .loading-text{
        display: inline-block;
        margin-top: 16px;
        color: #969799;
        font-size: 14px;
        vertical-align: middle;
      }
	}
}
</style>
