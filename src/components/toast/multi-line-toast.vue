<template>
	<transition leave-active-class="animated fadeOut">
		<div class="multi-line-toast" v-show="visible">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		visible: Boolean,
		// 自适应宽度
		flexWidth: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style lang="less" scoped>
.multi-line-toast{
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background:rgba(0,0,0, 0.8);
	border-radius:8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 30px 20px;
}
</style>
