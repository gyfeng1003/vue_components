<template>
  <div class="swiper-page">
    swiper page
    <swipe class="swiper-box">
      <div
        class="swipe-item"
        v-for="img in roomImgList"
        :style="setBgImg(img.img)"
        :key="img.img"
      ></div>
    </swipe>
  </div>
</template>

<script>
import swipe from '@/components/swipe'

export default {
  name: 'swiper-page',
  data () {
    return {
      roomImgList: [
        {
          img: require('@/assets/images/swiper/img_zixun.png')
        },
        // {
        //   img: require('@/assets/images/swiper/food-bg.png')
        // },
        {
          img: require('@/assets/images/swiper/tour.png')
        }
      ]
    }
  },
  components: {
    swipe
  },
  methods: {
    setBgImg (url) {
      return {
        backgroundImage: `url(${url})`
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-box {
    .swipe-item {
      height: 360px;
      background-size: cover;
      background-position: center;
    }

    /deep/.swipe-index {
      top: -40px;
    }
  }
</style>
