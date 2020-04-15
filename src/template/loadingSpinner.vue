<template>
  <div class="loading_spinner">
    <i v-for="(data, index) in 12" :key="index"></i>
  </div>
</template>
<style lang="less" scoped>
.loading_spinner {
  position: relative;
  display: inline-block;
  width: 60px;
  max-width: 100%;
  height: 60px;
  max-height: 100%;
  vertical-align: middle;
  animation: van-rotate 0.8s steps(12) infinite;
  i {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::before {
      width: 4px;
      height: 25%;
      content: '';
      display: block;
      margin: 0 auto;
      border-radius: 40%;
      background-color: #fff;
    }
  }
}
.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .loading_spinner i:nth-of-type(@{i}) {
    opacity: 1 - (0.75 / 12) * (@i - 1);
    transform: rotate(@i * 30deg);
  }
  .generate-spinner(@n, (@i + 1));
}
.generate-spinner(12);

@keyframes van-rotate{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
