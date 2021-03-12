<template>
	<div class="page-header">
		<img :src="optimizedImageUrl" alt="" :style="{ height: headerImageHeight }">
		<div class="rule-button" v-if="rules" @click="showActivityRules">
				{{isDomestic ? '活动规则' : 'Terms & Conditions'}}
		</div>
		<!-- <activity-rules :visible.sync="ruleVisible" :content="rules"/> -->
	</div>
</template>

<script>
// import ActivityRules from '@wuxin/components/activity-rules'
export default {
	name: 'PageHeader',
	props: {
		image: Object,
		rules: String
	},
	components: {
		// ActivityRules
	},
	data () {
		return {
			ruleVisible: false
		}
	},
	computed: {
		headerImageHeight () {
			if (this.image) {
				const { width, height } = this.image
				if (width && height) {
					return `${(parseFloat(height) / parseFloat(width) * 100).toFixed(2)}vw`
				}
			}
			return ''
		},
		optimizedImageUrl () {
			return this.image.url
		}
	},
	methods: {
		showActivityRules () {
			this.ruleVisible = true
		}
	}
}
</script>

<style lang="scss">
.page-header{
  position: relative;
  img{
    display: block;
    width: 100%;
  }
  .rule-button{
    position: absolute;
    top: 16px;
    right: 20px;
    font-size: 26px;
    padding: 6px 13px;
    color: #FFFFFF;
    line-height: 35px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 25px;
  }
}
</style>
