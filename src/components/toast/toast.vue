<template>
  <transition
    appear
    enter-active-class="animated slideInUp"
    leave-active-class="animated fadeOut"
  >
    <div v-if="show" class="toast-container" style="z-index: 999;">
      <span>{{content}}</span>
    </div>
  </transition>
</template>

<script>
export default {
	name: 'toast'
}
</script>

<style lang="less" scoped>
.toast-container {
  display: flex;
  z-index: 100;
  justify-content: center;
  position: fixed;
  bottom: 120px;
  width: 100%;
  font-size: 28px;
  color: #fff;
  animation-duration: 0.35s;
  span {
    display: block;
    max-width: 700px;
    padding: 30px 30px;
    border-radius: 12px;
    background: rgba(0, 0, 0, .6);
    word-wrap: break-word; // 英文换行
    white-space: pre-wrap; // 中文换行
  }
}
</style>
