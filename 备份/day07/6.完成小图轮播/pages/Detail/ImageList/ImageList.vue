<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuImageList"
        :key="img.id"
      >
        <img @click="changeImg(index)" :src="img.imgUrl" :class="{ active: defaultIndex === index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      defaultIndex: 0, //参考值
    }
  },
  methods:{
    changeImg(index){
      // 拿到传递的下标 去修改defaultIndex
      this.defaultIndex = index
      // 把下标传递给Zoom组件
      this.$bus.$emit('sendIndex',index)
    }
  },
  watch: {
    // 把监视的数据要记得更改 服务的那个容器页重新选择一下  配置对象中只留下左右按钮
    skuImageList: {
      handler(newVal, oldVal) {
        if(!newVal.length) return
        this.$nextTick(() => {
          new Swiper(this.$refs.imgSwiper, {
            slidesPerView:3, //一屏显示几张图片
            slidesPerGroup:2, //控制每次走几张图
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
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>