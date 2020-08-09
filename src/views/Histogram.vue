<template>
  <div class="histgram">
    <m-header title="柱状图"></m-header>
    <div class="chart">
      <div class="row" v-for="(data, index) in list" :key="index">
        <div class="data-txt">{{data.grade}}</div>
        <div class="progress" :style="'height:'+ (aniShow?(data.grade==0?0.08: data.grade*6/100): 0)+'rem'">
          <span class="pg-data"></span>
        </div>
        <div class="week">{{data.week}}</div>
      </div>
    </div>
    <m-button type="primary" @click.native="setProgress">setProgress</m-button>
  </div>
</template>
<script>
import mHeader from '@/components/mHeader'
import mButton from '@/template/button'

export default {
	data () {
		return {
			aniShow: false,
			timer: [],
			list: [{
				week: '第一周',
				grade: 0
			},
			{
				week: '第二周',
				grade: 30
			},
			{
				week: '第三周',
				grade: 99.99
			},
			{
				week: '第四周',
				grade: 76.98
			},
			{
				week: '第五周',
				grade: 100
			}]
		}
	},
	components: {
		mHeader,
		mButton
	},
	mounted () {
		setTimeout(() => {
			this.aniShow = true
		}, 0)
	},
	methods: {
		setProgress () {
			this.aniShow = !this.aniShow
		},
		// setTranform (data, index) {
		// 	let startH = 0
		// 	let maxTop = data.grade * 6 / 100
		// 	let change = (maxTop - startH) === 0 ? 0.08 :  maxTop - startH
		// 	if (change !== 0) {
		// 		let startTime = null
		// 		const fun = (timeStamp) => {
		// 			if (!startTime) {
		// 				startTime = timeStamp
		// 				this.timer[index] = window.requestAnimationFrame(fun)
		// 			} else {
		// 				let timeChange = timeStamp - startTime
		// 				if (timeChange > duration) {
		// 					data['height'] = maxTop
		// 					window.cancelAnimationFrame(this.timer[index])
		// 				} else {
		// 					let ratio = this.easeOutQuad(timeChange / duration)
		// 					data['height'] = startH + ratio * change
		// 					this.timer[index] = window.requestAnimationFrame(fun)
		// 				}
		// 			}
		// 		}
		// 		this.timer[index] = window.requestAnimationFrame(fun)
		// 	}
		// },
		easeOutQuad (x) {
			return 1 - (1 - x) * (1 - x)
		}
	}
}
</script>
<style lang="less" scoped>
.histgram {
  .chart {
    position: relative;
    margin: 74px 76px;
    min-height: 560px;
  }
  .chart {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  // 柱图
 .row {
   width: 92px;
   margin: -21px -6px -29px;
   text-align: center;
 }
 
 .data-txt {
   font-size: 30px;
   line-height: 30px;
   margin-bottom: 14px;
 }
 
 .progress {
   height: 0rem;
   transition: height 0.5s ease-in-out;
   transition-delay: .15s;
 }

 .pg-data {
   display: block;
   width: 36px;
   height: 100%;
   margin: 0 auto;
   background: url('~@/assets/images/timg.gif');
   box-shadow: 0 -6px 21px 0 rgba(129, 93, 255, 0.4);
   border-radius: 4px 4px 0 0;
 }
 .week {
   font-size: 30px;
   line-height: 30px;
   margin-top: 12px;
   color: #666;
 }
}
</style>
