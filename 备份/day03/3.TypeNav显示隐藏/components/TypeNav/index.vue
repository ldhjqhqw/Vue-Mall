<template>
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="moveOut">
        <h2 class="all" @mouseenter="isShow = true" >全部商品分类</h2>
        <div class="sort" v-if="isShow">
          <div class="all-sort-list2" @click="goSearch">
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
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                <!-- 1.使用声明式导航 不好 组件的本质是一个实例化对象 需要存储在堆内存 性能不好 太多了 -->
                <!-- <router-link :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId},}">{{ c1.categoryName }}</router-link> -->
                <!-- 2.使用编程式导航 效果上不卡 但是每一个都会生成一个回调函数 也需要储存在堆内存 太多了 性能不好-->
                <!-- <a @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId},})">{{ c1.categoryName }}</a> -->
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      <!-- <router-link :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId},}">{{ c2.categoryName }}</router-link> -->
                      <!-- <a @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId},})">{{ c2.categoryName }}</a> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        <!-- <router-link :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId},}">{{ c3.categoryName }}</router-link> -->
                        <!-- <a @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId},})">{{ c3.categoryName }}</a> -->
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
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      isShow:true, //一打开页面 Home展示下面分类内容 初始值给true
    }
  },
  mounted() {
    if(this.$route.path!=='/home'){
      this.isShow = false
    }
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      this.$store.dispatch('getCategoryList')
    },
    handle(index){
      // console.log(index)
      this.currentIndex = index
    },
    // 节流完成移入一级高亮
    moveIn:throttle(function(index){
      // console.log(index)
      this.currentIndex = index
      // trailing 默认值是true  不管操作是否还有 两秒这次一定帮你执行
      // trailing false  如果在2s之前结果了操作 2s那次不帮你执行了
    }, 60,{trailing:false}),
    // 事件委派完成点击分类跳转
    goSearch(e){
      // 判断他点的是不是a标签  点的几级的a标签  怎么获取那些药传递的数据
      // dataset可以获取某个dom节点身上data-开头的自定义属性（属性名偷偷的帮你全部变成了小写）
      let dataset = e.target.dataset
      let {categoryname,category1id,category2id,category3id} = dataset
      if(categoryname){ //点的一定是a标签 因为只给a标签加过这个自定义属性
        let location ={
          name:'search'
        }
        // 无论传递的是params参数还是query  值如果是undefined  不会显示在路径中
        location.query = {
          categoryName:categoryname,
          category1Id:category1id,
          category2Id:category2id,
          category3Id:category3id
        }
        // 本质是跳转过去search 并且传参
        this.$router.push(location)
      }
    },
    moveOut(){
      if(this.$route.path!=='/home'){
        this.isShow = false
      }
    }
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
