<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" ref="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="banner in bannerList"
              :key="banner.id"
            >
              <img :src="banner.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: 'Listcontainer',
  mounted() {
    //页面挂载完成之后执行的钩子函数
    this.getBannerList()
    // 1. 实例早于结构生成  结构是通过数据遍历生成的 数据是请求来的(响应的结果是一个异步) new Swiper是同步的
    // 先newSwiper 然后才有了结构
    // new Swiper(this.$refs.mySwiper, {
    //   speed:2000, //到下一张所花费的时间
    //   loop:true,//无缝轮播
    //   spaceBetween: 30,
    //   autoplay: {
    //     delay: 2000,
    //     disableOnInteraction: false,
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
  },
  methods: {
    getBannerList() {
      this.$store.dispatch('getBannerList')
    },
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
  watch: {
    bannerList: {
      handler(newVal, oldVal) {
        // 2. 实例早于结构生成
        // 能走进handler执行 说明bannerList变了 state数据变了后 Vue要更新页面 更新页面是一个微任务(Promise.then)  new Swiper同步代码
        // 面试题 Vue当中的更新是同步的还是异步的???
        // 数据的更新是同步的 页面的更新是异步的
        // new Swiper(this.$refs.mySwiper, {
        //   speed: 2000, //到下一张所花费的时间
        //   loop: true, //无缝轮播
        //   spaceBetween: 30,
        //   autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        //   },
        // })

        // 3. 宏任务中newSwiper  更新页面是微任务  可行 不用
        //#region
        // setTimeout(() => {
        //   new Swiper(this.$refs.mySwiper, {
        //   speed: 2000, //到下一张所花费的时间
        //   loop: true, //无缝轮播
        //   spaceBetween: 30,
        //   autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        //   },
        //   pagination: {
        //     el: '.swiper-pagination',
        //     clickable: true,
        //   },
        //   navigation: {
        //     nextEl: '.swiper-button-next',
        //     prevEl: '.swiper-button-prev',
        //   },
        // })
        // });
        //#endregion

        // 5. watch + $nextTick
        // 如果只这么写  只能保证数据变了 还得保证数据变了页面也更新了 才能去执行new Swiper
        // $nextTick 等到某次数据发生变化并且这次页面也更新完成了 才去执行里面的回调函数
        this.$nextTick(() => {
          new Swiper(this.$refs.mySwiper, {
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
    },
  },
  updated() {
    // 4. 数据得发生变化  页面更新之后执行得回调函数 可行 只要这个组件当中的任意数据发生变化 都会执行 所以不用
    // new Swiper(this.$refs.mySwiper, {
    //   speed: 2000, //到下一张所花费的时间
    //   loop: true, //无缝轮播
    //   spaceBetween: 30,
    //   autoplay: {
    //     delay: 2000,
    //     disableOnInteraction: false,
    //   },
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // })
  },
}
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
