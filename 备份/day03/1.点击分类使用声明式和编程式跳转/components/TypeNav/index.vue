<template>
  <div class="type-nav">
    <div class="container">
      <div class="nav-left">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <!-- 参考值思想 -->
            <div
              class="item"
              @mouseenter="moveIn(index)"
              @mouseleave="currentIndex = -1"
              :class="{ item_on: currentIndex === index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3>
                <!-- <a href="">{{ c1.categoryName }}</a> -->
                <!-- 1.使用声明式导航 不好 组件的本质是一个实例化对象 需要存储在堆内存 性能不好 太多了 -->
                <!-- <router-link :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId},}">{{ c1.categoryName }}</router-link> -->
                <!-- 2.使用编程式导航 效果上不卡 但是每一个都会生成一个回调函数 也需要储存在堆内存 太多了 性能不好-->
                <a @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId},})">{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <!-- <a href="">{{ c2.categoryName }}</a> -->
                      <!-- <router-link :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId},}">{{ c2.categoryName }}</router-link> -->
                      <a @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId},})">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="">{{ c3.categoryName }}</a> -->
                        <!-- <router-link :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId},}">{{ c3.categoryName }}</router-link> -->
                        <a @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId},})">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 全部引入
// import _ from 'lodash'
// 按需引入
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
// 组件开发的小步骤
// 1.静态搭建(拆组件)
//    1.1 接口函数  1.2 书写三连环  1.3 组件当中义映射数据
// 2.动态渲染
// 3.页面交互
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
    }
  },
  mounted() {
    // this.$store.dispatch('getCategoryList')
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch('getCategoryList')
    },
    handle(index){
      console.log(index)
      this.currentIndex = index
    },
    // lodash 之前有些包依赖于他 所以不需要再下载了 直接用就成
    // 引入lodash多一个_变量
    // throttle 把多次的一个频繁触发转变成少次的
    // 参数1 真正的事件处理函数 参数2 间隔时间
    // 返回值: 节流之后的新函数

    // 事件回调函数写成普通函数 可行
    moveIn:throttle(function(index){
      console.log(index)
      this.currentIndex = index
      // trailing 默认值是true  不管操作是否还有 两秒这次一定帮你执行
      // trailing false  如果在2s之前结果了操作 2s那次不帮你执行了
    }, 60,{trailing:false})

    // 写成methods方法 不行 this指向window  但是vue内部又开启了严格模式 指向undefined
    // moveIn:_.throttle(this.handle, 2000)

    // 写成箭头函数 不行 this指向window  但是vue内部又开启了严格模式 指向undefined
    // moveIn:_.throttle((index)=>{
    //   this.currentIndex = index
    // }, 2000)
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          // &父级引用
          // &:hover{
          //   background-color: skyblue;
          // }
          &.item_on {
            background-color: skyblue;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
