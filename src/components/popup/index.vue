<template>
	<div
		class="we-popup-wrapper"
		v-show="isShow"
		@scroll.stop.prevent
		@touchmove.stop.prevent
	>
		<!-- popup mask -->
		<div
			class="we-popup-mask"
			v-if="mask"
			v-show="isShow"
			@scroll.stop.prevent
			@touchmove.stop.prevent
			@click.stop="onMask"
			style="zIndex: 9"
		></div>
		<!-- popup body -->
		<div
			class="we-popup"
			v-show="isShow"
			@scroll.stop.prevent
			@touchmove.stop.prevent
			style="zIndex: 9"
		>
			<!-- popup slot -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'we-popup',
	props: {
		mask: {
			type: Boolean,
			default: true
		},
		maskClick: {
			type: Boolean,
			default: true
		}
	},
	data () {
		return {
			isShow: false
		}
	},
	methods: {
		showMask () {
			this.isShow = true
		},
		hideMask () {
			this.isShow = false
		},
		onMask (evt) {
			if (this.maskClick) {
				this.hideMask()
				this.$emit('onMask')
			}
		}
	}
}
</script>

<style lang="less">
	.we-popup-mask{
		width: 100%;
		height: 100%;

		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		background-color: rgba(0,0,0,0.5);

		transition: display ease 0.5s;
	}

	.we-popup{
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 999;
		transform: translate(-50%,-50%);

		transition: display ease 0.5s;
	}
</style>
