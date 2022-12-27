<template>
  <div class="swiper-container" :ref="someRef">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in someList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Carousel',
  props:['someList','someRef'],
  watch: {
    someList: {
      handler(newVal, oldVal) {
        if(!newVal.length) return
        this.$nextTick(() => {
          new Swiper(this.$refs[this.someRef], {
            speed: 2000, //到下一张所花费的时间
            loop: true, //无缝轮播
            spaceBetween: 30,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
      immediate:true
    },
  },
}
</script>

<style lang="less" scoped>
</style>
