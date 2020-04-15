<template>
  <div class="m_button m_button--normal" :class="'m_button--'+type">
    <span class="m-button__text">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
	props: {
		type: {
			type: String,
			default: 'plain'
		}
	}
}
</script>
<style lang="less" scoped>
.m_button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 88px;
  margin: 0;
  padding: 0;
  font-size: 32px;
  line-height: 84px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: opacity 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;
  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }
  &--plain {
    background-color: #fff;
  }
  &--primary{
    color: #fff;
    background-color: #1989fa;
    border: 1px solid #1989fa;
  }
  &--normal {
    padding: 0 30px;
    font-size: 28px;
  }
}
</style>
