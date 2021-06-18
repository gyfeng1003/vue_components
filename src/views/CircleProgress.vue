<template>
  <div class="circle-progress">
    <m-header title="环形进度条"></m-header>
    <div class="canvas-box">
      <canvas id="baseCanvas" class="my-canvas" ref="baseCanvas" width="300" height="300"></canvas>
      <canvas id="myCanvas" class="my-canvas clr-canvas" ref="myCanvas" width="300" height="300"></canvas>
      <span class="canvas-data num">{{grade}}分</span>
    </div>
    <m-button type="primary" @click.native="setGrade">setGrade</m-button>
  </div>
</template>
<script>
import mButton from '@/template/button'
let vm = null
/** canvas基础值 */
let c = null // this.$refs.myCanvas 彩色环
let ctx = null
let x = 301 / 2 // 圆心坐标
let r = (300 - 20) / 2 // 半径大小
export default {
	data () {
		return {
			timer: null,
			grade: 0, // 圆环图分数
			gradeTarget: 88 // 实际得分数
		}
	},
	components: {
		mButton
	},
	mounted () {
		vm = this
		c = this.$refs.myCanvas
		ctx = c.getContext('2d')
		this.drawBaseCanvas()
	},
	methods: {
		drawBaseCanvas () {
			/** 基础值 */
			let c = this.$refs.baseCanvas
			ctx = c.getContext('2d')
			let o = x
			let radius = r
			/** 默认灰色圆圈 */
			ctx.strokeStyle = '#eee'
			ctx.lineWidth = 20
			ctx.beginPath()
			ctx.arc(o, o, radius, 0, 2 * Math.PI)
			ctx.stroke()
		},
		clearCanvas () {
			// 清除画布
			ctx.clearRect(0, 0, 300, 300)
		},
		drawClrCanvas () {
			var gradient = ctx.createLinearGradient(75, 50, 5, 90)
			gradient.addColorStop('0', '#c88eff')
			gradient.addColorStop('1', '#7e5cff')
			ctx.strokeStyle = gradient
			ctx.lineWidth = 20
			ctx.lineCap = 'round'
			ctx.shadowColor = 'rgba(191, 142, 255, 0.36)'
			ctx.shadowBlur = 8
			ctx.shadowOffsetY = 8
			ctx.beginPath()
			var count = this.grade / (100 / 2) + 1
			ctx.arc(x, x, r, Math.PI, Math.PI * count, false)
			ctx.stroke()
		},
		setGrade () {
			vm.grade = 0
			function fun (timestamp) {
				var num = vm.grade
				num++
				if (num >= vm.gradeTarget) {
					vm.grade = vm.gradeTarget
					cancelAnimationFrame(vm.timer)
				} else {
					vm.grade = num
				}
				vm.clearCanvas()
				vm.drawClrCanvas()
				vm.timer = window.requestAnimationFrame(fun)  
			}
			vm.timer = window.requestAnimationFrame(fun)
		}
	}
}
</script>
<style lang="less" scoped>
.circle-progress {
  .canvas-box {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 30px auto;
  }
  .my-canvas {
    width: 300px;
    height: 300px;
  }
  .clr-canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  .canvas-data {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    margin: auto;
    text-align: center;
  }
  .num {
    font-size: 42px;
    font-weight: 600;
  }
}
</style>
