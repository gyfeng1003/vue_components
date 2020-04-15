<template>
<div class="main">
  <m-header title="showToast"></m-header>
  <m-button type="primary" @click.native="showToast">showToast</m-button>
</div>
</template>
<script>
import mHeader from '@/components/mHeader'
import mButton from '@/template/button'
import toast from '@/components/toast'
import Vue from 'vue'
Vue.use(toast)
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
		showToast () {
			this.$toast({
				content: 'hi, 草莓不甜'
			})
		}
	}
}
</script>
