<template>
  <div class="pwdinput-page">
    <m-header title="密码输入框-显示*号"></m-header>
    <m-button type="primary" @click.native="showPaymentDialog=true">打开支付密码框</m-button>
    <div class="input-group">
      <div class="text-input border_bottom">
        <span class="label">{{"*".repeat(formData.password.length)}}</span>
        <input :type="ua.isIOS?'number':'tel'" class="border_bottom" v-model="password"
        @keydown="handelKeydown('password', $event)"
        :placeholder="formData.password?'':'请设置6位数字密码'" />
      </div>
    </div>
  </div>
</template>
<script>
import ua from '@/utils/ua'
import mButton from '@/template/button'
export default {
	data () {
		return {
			ua,
			password: '',
			formData: {
				password: ''
			}
		}
	},
	components: {
		mButton
	},
	watch: {
		password (val) {
			if (val) {
				val = val.trim()
				if (/.*[^\d]+.*$/.test(val)) {
					this.password = ''
					return
				}
				if (this.formData.password.length < 6) {
					this.formData.password += val
				}
				this.password = ''
			}
		}
	},
	methods: {
		handelKeydown (name, e) {
			if (e.keyCode === 8) {
				let value = this.formData[name]
				this.formData[name] = value.slice(0, value.length - 1)
			}
		}
	}
}
</script>
<style lang="less" scoped>
.pwdinput-page {
  .input-group {
    margin: 0 40px;
    padding: 0 20px;
    background: #FFFFFF;
    border-radius: 16px;
    .text-input {
      height: 100px;
      line-height: 100px;
      display: flex;
    }
    input {
      outline:none;
      border:none;
      line-height: 50px;
      flex: 1;
      padding: 0;
      width: 100%;
      &::-ms-input-placeholder{
          font-size: 28px;
          font-weight: 400;
          color: #BDBDBD;
          line-height: 50px;
      }
      &::-webkit-input-placeholder{
          font-size: 28px;
          font-weight: 400;
          color: #BDBDBD;
          line-height: 50px;
      }
    }
  }
}
</style>
