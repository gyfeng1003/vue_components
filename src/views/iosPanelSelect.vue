<template>
  <div class="ios_panel">
    <m-header title="IOS Select"></m-header>
    <m-button type="primary" @click.native="showIOSPanel">showLoading</m-button>
    <pd-select-box style="position: fixed;bottom: 0;width: 100%">
      <pd-select-item ref="month" :listData="listData" v-model="month"></pd-select-item>
      <pd-select-item ref="day" :listData="listData2" type="cycle" v-model="day"></pd-select-item>
    </pd-select-box>
  </div>
</template>
<script>
import mHeader from '@/components/mHeader'
import mButton from '@/template/button'
import pdSelect from '@/components/pdSelect'
import Vue from 'vue'
Vue.use(pdSelect)
export default {
	data () {
		return {
			listData: Array.from({ length: 12 }, (value, index) => 1 + index),
			listData2: Array.from({ length: 30 }, (value, index) => 'customValue' + index),
			month: 100,
			day: 'customValue15'
		}
	},
	components: {
		mHeader,
		mButton
	},
	methods: {
		showIOSPanel () {
      
		}
	}
}
</script>
