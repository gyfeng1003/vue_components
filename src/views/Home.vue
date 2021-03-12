<template>
  <div class="home">
    <ul>
      <li class="menu" v-for="(data, index) in menus" :key="index" @click="goMenu(data)">
        {{data.name}}
        <span class="nav_icon"></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
			menus: [
				{ name: 'Loading', link: '/loading' },
				{ name: 'Toast', link: '/toast' },
				{ name: 'modalPage', link: '/modalPage' },
				{ name: '环形进度条', link: '/circle-progress' },
				{ name: '柱状图', link: '/histogram' },
				{ name: '音频播放器', link: '/audio-player' },
				{ name: 'h5端js-sdk功能demo', link: '/jssdk-demo' },
				{ name: '活动模板', link: '/activity-template' }
			]
		}
	},
	methods: {
		goMenu (data) {
			this.$router.push(data.link)
		}
	}
}
</script>

<style lang="less" scoped>
@import "~@/style/mixin";
.home {
  height: 100%;

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    text-align: left;
    background: #fff;
    box-sizing: border-box;
    font-size: 28px;
    .border-1px(1px, #ebedf0, bottom);
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
