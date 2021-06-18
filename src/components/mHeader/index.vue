<template>
<header>
<div class="back back_icon" @click="goBack"></div>
<div class="title">{{title}}</div>
<slot name="setting"></slot>
</header>
</template>
<script>
export default {
	name: 'mHeader',
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		goBack () {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang="less" scoped>
// @import '~@/style/mixin';
header {
  height: 88px;
  line-height: 88px;
  display: flex;
  position: relative;
  background: #fff;
  .back {
    position: absolute;
    left: 30px;
  }
  .title {
    text-align: center;
    width: 100%;
    padding: 0 30px;
    font-size: 32px;
  }
}
</style>
