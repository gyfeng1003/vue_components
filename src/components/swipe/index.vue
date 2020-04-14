<template>
  <div class="swipe-component"
       v-swipe="{options: options}">
    <div class="swipe-wrapper">
      <slot></slot>
    </div>
    <ul class="swipe-index" v-if="count >= 1">
      <li v-for="i in count" :key="i" :class="{'active': currentIndex === i - 1}"></li>
    </ul>
  </div>
</template>
<script>
import swipe from '@/directives/swipe'

export default {
  props: {
    // swipe 参数
    swipeOptions: Object
  },
  data () {
    let currentIndex = 0
    const { $slots: { default: slots = [] } = {} } = this
    const count = slots.filter(item => item.tag).length
    return {
      currentIndex: currentIndex,
      count
    }
  },
  computed: {
    options () {
      let vm = this
      return Object.assign({}, {
        startSlide: 0,
        auto: 2000,
        continuous: true,
        transitionEnd: index => {
          vm.currentIndex = index
        }
      }, vm.swipeOptions)
    }
  },
  directives: {
    swipe
  },
  methods: {}
}
</script>
<style lang="less">
  .swipe-component {
    position: relative;
    font-size: 0;
    visibility: hidden;
    overflow: hidden;

    .swipe-wrapper {
      position: relative;
      display: inline-block;
      width: 100%;
      overflow: hidden;
      z-index: 1;
    }

    .swipe-item {
      position: relative;
      float: left;
      width: 100%;
    }

    ul {
      position: relative;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-size: 0;
      z-index: 2;
      transform: translateZ(0);
      overflow: hidden;

      li {
        display: inline-block;
        width: 12px; /*px*/
        height: 12px; /*px*/
        margin: 0 5px;
        border-radius: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        transition: all .3s;

        &.active {
          background-color: #fff;
        }
      }
    }
  }
</style>
