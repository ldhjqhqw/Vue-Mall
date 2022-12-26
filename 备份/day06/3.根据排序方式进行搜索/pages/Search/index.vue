<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性的面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="prop"
            >
              {{ prop.split(':')[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector
          @searchOfTrademark="searchOfTrademark"
          @searchOfProp="searchOfProp"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 1. 谁背景色高亮 取决于排序类型是谁  1综合高亮 2价格高亮 -->
                <!-- 2.  图标
                      2.1 图标用谁 iconfont  
                      2.2 谁出现图标 看排序类型(谁背景高亮谁就出现图标) 
                      2.3 图标使用向上的还是向下的 取决于排序标识 desc降序用向下的 asc升序用向上的
                -->
                <li
                  :class="{ active: orderType === '1' }"
                  @click="searchOfOrder('1')"
                >
                  <a
                    >综合
                    <i
                      v-if="orderType === '1'"
                      class="iconfont"
                      :class="{
                        'icon-up': orderFlag === 'asc',
                        'icon-down':
                        orderFlag === 'desc',
                      }"
                    ></i>
                  </a>
                </li>
                <li
                  :class="{ active: orderType === '2' }"
                  @click="searchOfOrder('2')"
                >
                  <a
                    >价格
                    <i
                      v-if="orderType === '2'"
                      class="iconfont"
                      :class="{
                        'icon-up': orderFlag === 'asc',
                        'icon-down':
                        orderFlag === 'desc',
                      }"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ goods.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      // 初始化一个参数对象 里面包含用户所有的搜索条件 之后某个条件变了 修改里面对象的属性 然后拿最新的对象发送请求
      searchParams: {
        category1Id: '', //一级分类id
        category2Id: '', //二级分类id
        category3Id: '', //三级分类id
        categoryName: '', //分类名字
        keyword: '', //关键字
        props: [], //属性
        trademark: '', //品牌
        // 下面这三个是默认参数
        order: '1:desc', //排序规则 综合降序
        // 排序类型:排序标识
        // 排序类型 1代表是按照综合排序 2代表价格排序
        // 排序标识 desc代表降序   asc代表升序

        pageNo: 1, //获取分页当中的第几页
        pageSize: 5, //页大小 一页获取几个数据
      },
    }
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    // 发送请求之前应该把用户点击或者输入的关键字或者分类信息 修改掉搜索条件对象里面的某些属性 从而去发送请求
    this.handleSearchParams()
  },
  mounted() {
    // 页面一挂载就直接发送了请求
    this.getGoodsInfo()
  },
  methods: {
    // 发送请求
    getGoodsInfo() {
      // 现在暂时不和用户的操作挂上联系 暂时传递一个空对象做为请求参数 只是为了获取数据展示数据
      // this.$store.dispatch('getGoodsInfo', {})
      this.$store.dispatch('getGoodsInfo', this.searchParams)
    },
    // 处理搜索条件对象中属性
    handleSearchParams() {
      // 获取用户输入的关键字及点击的分类信息
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query
      let { keyword } = this.$route.params

      // 根据路由当中的参数 修改搜索条件里面的对应属性
      let searchParams = {
        // 展开this.searchParams里面所有的属性
        ...this.searchParams,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
        keyword,
      }
      this.searchParams = searchParams
    },
    // 删除分类的面包屑
    removeCategory() {
      // 分类的面包屑不应该显示了
      this.searchParams.categoryName = ''
      // 拿最新的搜索条件对象发送请求(利用监视来去发送请求)
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    // 删除关键字的面包屑
    removeKeyword() {
      // 关键字面包屑不能展示
      this.searchParams.keyword = ''
      // 应该携带这query参数重新发送请求
      this.$router.push({ name: 'search', query: this.$route.query })
      // 还需要把Header组件当中的数据清空
      this.$bus.$emit('removeKeyword')
    },
    // 根据品牌进行搜索
    searchOfTrademark(tm) {
      // 应该把点击的这个品牌来去修改搜索条件对象里面的trademark属性
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
      // 拿着最新的搜索条件对象发送请求
      this.getGoodsInfo()
    },
    // 删除品牌的面包屑
    removeTrademark() {
      // 品牌面包屑不显示
      this.searchParams.trademark = ''
      // 重新发送请求
      this.getGoodsInfo()
    },
    // 根据属性进行搜索
    searchOfProp(attr, attrValue) {
      // 拿到属性和属性值拼装成对应的是格式("属性ID:属性值:属性名") 放入searchparams中props里
      let str = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 判断新增的str之前有没有出现在数组中
      let flag = this.searchParams.props.some((item) => {
        return item === str
      })
      if (flag) {
        //代表这一项重复了
        alert('请不要重复添加此属性')
        return
      }
      this.searchParams.props.push(str)
      // 重新发送请求
      this.getGoodsInfo()
    },
    // 删除属性的面包屑
    removeProp(index) {
      // 应该把searchParams中的props符合这个下标的那一项删除掉
      this.searchParams.props.splice(index, 1)
      // 重新发送请求
      this.getGoodsInfo()
    },
    // 根据排序方式进行搜索
    searchOfOrder(type){
      // 获取之前的排序类型以及排序的标识
      let originType = this.orderType
      let originFlag = this.orderFlag
      // 准备一个回头要完成的order
      let finishiOrder
      // 判断点击的是不是同一个类型
      if(originType === type){  //点的同一个 修改排序的标识
        finishiOrder = `${type}:${originFlag==='asc'?'desc':'asc'}`
      }else{ //点的不是同一个 排序类型要变 排序标识默认是升序或者降序 (降序)
        finishiOrder = `${type}:desc`
      }
      // 要去修改搜索条件对象当中的order
      this.searchParams.order = finishiOrder
      // 重新发送请求
      this.getGoodsInfo()
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    orderType(){
      return this.searchParams.order.split(':')[0]
    },
    orderFlag(){
      return this.searchParams.order.split(':')[1]
    }
  },
  watch: {
    // 只要路径信息有变化就可以监听到
    $route() {
      this.handleSearchParams()
      // 重新用最新的搜索条件对象发送请求
      this.getGoodsInfo()
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>