<template>
<div class="main">
  <m-header title="showModal"></m-header>
  <m-button type="primary" @click.native="setGrade">setGrade</m-button>
</div>
</template>
<script>
import mHeader from '@/components/mHeader'
import mButton from '@/template/button'
import modal from '@/components/modal'
import Vue from 'vue'
Vue.use(modal)
export default {
	data () {
		return {
		}
	},
	components: {
		mHeader,
		mButton
	},
	methods: {
		showModal () {
			this.$modal({
				content: 'Hello！草莓不甜',
				cancelText: '取消',
				confirmText: '确定',
				headerRightClose: true,
				confirm: (evt) => {
					console.log('confirm')
				},
				cancel: (evt) => {
					console.log('cancel')
				}
			})
		}
	}
}
</script>
