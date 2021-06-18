<template>
  <div class="code-input">
    <input ref="vcode" :id="`code-${uuid}`" :type="type" :maxlength="codeLen" :pattern="pattern" v-model="code" @focus="handleFocus" 
    @blur="handleBlur" :disabled="disabled">
    <label :for="`code-${uuid}`" class="line" v-for="(item,index) in codeLen" :key="index"
      :class="{'animated': focused && cursorIndex === index}">
      <template v-if="mask">
        <i :style="{'visibility': codeArr[index]?'visible': 'hidden'}"></i>
      </template>
      <template v-else>
        {{codeArr[index]}}
      </template>
    </label>
  </div>
</template>
<script>
export default {
	data () {
		return {
			code: this.value,
			focused: false
		}
	},
	computed: {
		codeArr () {
			return this.code.split('')
		},
		cursorIndex () {
			return this.code.length
		},
		uuid () {
			return Math.random().toString(36).substring(3, 8)
		}
	},
	props: {
		value: String,
		codeLen: {
			type: Number,
			default: 6
		},
		type: {
			type: String,
			default: 'text'
		},
		pattern: String,
		mask: Boolean, // 	是否隐藏密码内容
		disabled: Boolean
	},
	watch: {
		code (newVal) {
			this.code = newVal.replace(/[^\d]/g, '')
			if (newVal.length > this.codeLen - 1) {
				this.$refs.vcode.blur()
				setTimeout(() => {
					this.$emit('complete', this.code)
				}, 300)
			}
		},
		value (newVal) {
			this.code = newVal
		}
	},
	methods: {
		handleFocus () {
			this.focused = true
			this.$emit('on-focus')
		},
		handleBlur () {
			this.focused = false
			this.$emit('on-blur', this.code)
		}
	}
}
</script>
<style lang="less" scoped>
.code-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  input {
    position: absolute;
    top: -100%;
    left: -666666px;
    opacity: 0;
  }
  .line {
    position: relative;
    line-height: 70px;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    color: #333333;
    width: 74px;
    height: 74px;
    background: #EBEDF4;
    border-radius: 8px;
    &:not(:last-child) {
      margin-right: 7px;
    }
    &::after {
      border-bottom-width: 0;
    }
    &.animated::before {
      display: block;
      position: absolute;
      left: 50%;
      top: 20%;
      width: 1px;
      height: 60%;
      content: '';
      background-color: #333333;
      animation-name: coruscate;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 18px;
      height: 18px;
      background-color: #000;
      border-radius: 100%;
      transform: translate(-50%, -50%);
    }
  }
}

@keyframes coruscate {
  0% {
    opacity: 0
  }
  25% {
    opacity: 0
  }
  50% {
    opacity: 1
  }
  75% {
    opacity: 1
  }
  to {
    opacity: 0
  }
}
</style>
