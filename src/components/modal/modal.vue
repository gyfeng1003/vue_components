<template>
	<popup
		ref="popup"
		:mask="options.mask"
		:maskClick="options.maskClick"
		:shows="true"
		@mask="onCancel"
	>
		<div class="we-modal-wrapper">
			<!-- header -->
			<slot name="header">
				<div class="we-modal-header" v-if="options.title">{{ options.title }}</div>
				<div @click="onCancel" class="we-modal-header-right" v-if="options.headerRightClose">
					<div class="img"></div>
				</div>
			</slot>
			<div
				class="we-modal-body"
				:class="{
                    'we-modal-body-line': options.cancelText || options.confirmText
                }"
			>
				<slot name="body">{{ options.content }}</slot>
			</div>
			<slot name="footer">
				<div class="we-modal-footer">
					<div class="we-modal-btn" @click="onCancel" v-show="options.cancelText">
						<slot name="cancel">{{ options.cancelText }}</slot>
					</div>
					<div
						class="we-modal-btn"
						@click="onConfirm"
						v-show="options.confirmText"
						:class="{
                            'we-modal-active': options.confirmTextActive
                        }"
						:style="[
                            options.confirmTextStyle
                        ]"
					>
						<slot name="confirm">{{ options.confirmText }}</slot>
					</div>
				</div>
			</slot>
		</div>
	</popup>
</template>
<script>
import Popup from '../popup'
export default {
	name: 'we-modal',
	components: {
		Popup
	},
	data () {
		return {
			defaultOptions: {
				maskClick: true,
				mask: true,
				title: false,
				content: '',
				headerRightClose: false,
				cancelText: false,
				confirmText: false,
				confirmTextActive: false,
				confirmTextStyle: {},
				cancel: () => {},
				confirm: () => {}
			},
			options: {}
		}
	},
	methods: {
		show (opt = {}) {
			this.options = Object.assign({}, this.defaultOptions, opt)
			this.$refs.popup.showMask()
		},
		hide () {
			this.$refs.popup.hideMask()
		},
		onCancel (evt) {
			this.hide()
			this.options.cancel && this.options.cancel(evt)
		},
		onConfirm (evt) {
			this.hide()
			this.options.confirm && this.options.confirm(evt)
		}
	}
}
</script>

<style lang="less" scoped>
@h: 100px;
.we-modal-wrapper {
	position: relative;
	background-color: white;
	border-radius: 8px;

	font-size: 34px;
	color: #333;
	width: 580px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	overflow: hidden;

	box-sizing: border-box;
}

.we-modal-header {
	width: 100%;
	height: @h;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-bottom: -40px;
}

.we-modal-header-right {
	position: absolute;
	top: 0px;
	right: 0px;
	width: 80px;
	height: 80px;
	line-height: 80px;
	text-align: center;
	.img {
		width: 30px;
		height: 30px;
	}
}

.we-modal-body {
	width: 580px;
	min-height: 260px;
	text-align: left;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 90px 50px 70px;
	box-sizing: border-box;

	word-break: break-word;
	word-wrap: break-word;

	font-weight: 500;
	font-size: 34px;
	color: #333333;
	line-height: 48px;

	&.we-modal--body-line {
		border-bottom: 1px solid red;
	}
}

.we-modal-footer {
	width: 100%;

	display: flex;
	justify-content: space-around;
	align-items: center;

	border-top: 1px solid #efefef;

	& > .we-modal--btn:last-of-type {
		border-left: 1px solid red;
	}
}

.we-modal-btn {
	flex: 1;
	height: @h;

	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	color: #397bb9;
	&:nth-of-type(1) {
		border-right: 1px solid #efefef;
	}
}
.cancel {
	color: #333;
}
.we-modal-active {
	color: red;
}
</style>
