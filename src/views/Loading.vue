<template>
<div class="main">
  <m-header title="Loading"></m-header>
  <m-button type="primary" @click.native="showLoading">showLoading</m-button>
</div>
</template>
<script>
import mButton from '@/template/button'
import loading from '@/components/loading'
export default {
	data () {
		return {
		}
	},
	components: {
		mButton
	},
	methods: {
		showLoading () {
			loading.openLoading()
			setTimeout(() => {
				loading.closeLoading()
			}, 2000)
		}
	}
}
</script>
