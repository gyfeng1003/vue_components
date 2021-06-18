<template>
<van-overlay class="payment-dialog" :show="show">
  <div class="pwd-dialog">
    <div class="close" @click="handleClose">
      <img src="@/assets/images/ic_xx.png" alt="">
    </div>
    <div class="wrapper">
      <p class="tip">使用超过1000积分，需输入支付密码</p>
      <code-input class="paypwd" type="number" pattern="\d*" :value="pwdValueStr" :mask="true"
       @complete="complete" :disabled="true"></code-input>
      <p class="errorMsg">密码输入错误3次冻结积分，24小时后解除冻结</p>
      <m-button className="pwdcomfirm" color="#3E83F1" round block :disabled="!pwdIsValid" @click="confirm">确认</m-button>
    </div>
  </div>
  <transition
    enter-active-class="animated slideInUp"
    leave-active-class="animated slideOutDown"
  >
    <van-number-keyboard
      class="keyboard"
      v-show="show"
      extra-key=" "
      @input="onInput"
      @delete="onDelete"
    />
  </transition>
</van-overlay>
</template>
<script>
import ua from '@/utils/ua.js'
import CodeInput from '@/components/CodeInput'
import mButton from '@/template/button'

function getElement (selector) {
	if (typeof selector === 'string') {
		return document.querySelector(selector)
	}
	return selector()
}
export default {
	data () {
		return {
			isiOS: ua.isIOS,
			show: false,
			pwdValue: [],
			pwdIsValid: false
		}
	},
	components: {
		CodeInput,
		mButton
	},
	mounted () {
		if (this.getContainer) {
			this.portal()
		}
	},
	props: {
		visible: Boolean,
		getContainer: [String, Function]
	},
	watch: {
		visible (newVal) {
			this.show = newVal
		}
	},
	computed: {
		pwdValueStr () {
			return this.pwdValue.join('')
		}
	},
	methods: {
		onInput (value) {
			if (this.pwdValue.length < 6) {
				this.pwdValue.push(value)
			}
			console.log(value)
		},
		onDelete () {
			this.pwdValue.pop()
		},
		handleClose () {
			this.show = false
			this.$emit('close')
		},
		async complete (code) {
		
		},
		confirm () {
			// 跳转到收银台
		},
		portal () {
			const { getContainer } = this
			const el = this.$el

			let container
			if (getContainer) {
				container = getElement(getContainer)
			}

			if (container && container !== el.parentNode) {
				container.appendChild(el)
			}
		}
	}
}
</script>
<style lang="less" scoped>
.payment-dialog {
 .pwd-dialog {
    position: fixed;
    top: 32%;
    background: #fff;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
  }
  .close {
    width: 26px;
    height: 26px;
    padding: 20px;
		img {
			width: 100%;
		}
  }
  .tip {
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    padding-top: 34px;
    text-align: center;
  }
  .wrapper {
    padding: 0 40px 40px;
  }
  .paypwd {
    margin: 30px 30px 10px 30px;
  }
  .pwdcomfirm {
    height: 70px;
    line-height: 70px;
    font-size: 32px;
    margin-top: 42px;
  }
  .errorMsg {
    margin: 0 30px;
    font-size: 20px;
    font-weight: 400;
    line-height: 28px;
    color: #F35543;
  }
  .keyboard {
    /deep/ .van-number-keyboard__body {
      padding: 0;
    }
    /deep/ .van-key__wrapper {
      background: #fff;
      &:last-child, &:nth-child(10) {
        background: none;
      }
    }
    /deep/ .van-key {
      font-size: 38px;
      font-weight: bold;
      background: none;
      color: #3c3c3c;
    }
  }
}
.animated {
  animation-duration: 300ms;
}
.slideInUp {
  animation-name: slideInUp;
}
.slideOutDown {
  animation-name: slideOutDown;
}
@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
