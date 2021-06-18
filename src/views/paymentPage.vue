<template>
  <div class="payment-page">
    <m-header title="密码支付组件"></m-header>
    <m-button type="primary" @click.native="showPaymentDialog=true">打开支付密码框</m-button>
 		<payment-dialog :visible.sync="showPaymentDialog" getContainer="body" @close="handleClose"></payment-dialog>
  </div>
</template>
<script>
import paymentDialog from '@/components/paymentDialog'
import mButton from '@/template/button'
export default {
	data () {
		return {
			showPaymentDialog: false
		}
	},
	components: {
		mButton,
		paymentDialog
	},
	methods: {
		handleClose () {
			this.showPaymentDialog = false
		}
	}
}
</script>
