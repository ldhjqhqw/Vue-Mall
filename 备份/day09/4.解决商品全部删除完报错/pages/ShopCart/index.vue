<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="goods in shopcartList" :key="goods.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="goods.isChecked" @click="updateSomeChecked(goods)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="goods.imgUrl" />
            <div class="item-msg">{{ goods.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ goods.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              @click="changeNum('sub', -1, goods)"
              class="mins"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="goods.skuNum"
              minnum="1"
              class="itxt"
              @change="changeNum('input', $event.target.value * 1, goods)"
            />
            <a
              href="javascript:void(0)"
              @click="changeNum('add', 1, goods)"
              class="plus"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ goods.skuPrice * goods.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteSome(goods)">删除</a>
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool" v-if="shopcartList.length">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="chooseAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ chooseNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getShopcartList()
  },
  methods: {
    getShopcartList() {
      this.$store.dispatch('getShopcartList')
    },

    // 更改商品数量
    changeNum: throttle(async function (flag, disNum, goods) {
      // flag作用 可以判断用户究竟是那种方式走进来的这个函数
      // disNum作用  对于点击增加和减少而言 传递的是变化的量  对于输入而言 传递的是输入的最新值
      // goods作用 获取到某个商品
      if (flag === 'add') {
        //这个判断里面咱们不需要做一些特殊的事情  可以删掉 我不删是为了逻辑清晰 你晚上看代码时清楚
      } else if (flag === 'sub') {
        // 如果当前数量就是1个 不能再让他减了
        if (goods.skuNum === 1) return
      } else {
        // 看一下他输入的内容小不小于1
        // if(disNum < 1){ //原先数量多少 现在就是几个
        //   disNum = 0
        // }else{ //计算数量差 最新的数量-原先的数量
        //   disNum = disNum - goods.skuNum
        // }
        disNum = disNum < 1 ? 0 : disNum - goods.skuNum
      }
      // 本质是要传递商品id及变化的数量 发送请求 通知后端把数据库当中的商品数量更新了
      try {
        await this.$store.dispatch('getAddShopcart', {
          skuId: goods.skuId,
          skuNum: disNum,
        })
        // 更改数量成功之后 要显示最新的状态 重新获取最新的购物车列表
        this.getShopcartList()
      } catch (err) {
        alert('商品数量更改失败')
      }
    }, 2000,{trailing:false}),
    // 更改单个选中状态
    async updateSomeChecked(goods){
      try{
        // 原先选中 点击之后传0  原先不选中 点击之后传1
        await this.$store.dispatch('getUpdateSomeChecked',{skuId:goods.skuId,isChecked:goods.isChecked?0:1})
        // 获取最新的购物车列表
        this.getShopcartList()
      }catch(err){
        alert('更新单个选中状态失败')
      }
    },
    // 删除单个商品
    async deleteSome(goods){
      try {
        await this.$store.dispatch('getDeleteSome',goods.skuId)
        this.getShopcartList()
      } catch (error) {
        alert('删除单个商品失败')
      }
    },
    // 删除已选中
    async deleteChecked(){
      let skuIdList = []
      this.shopcartList.forEach(item=>{
        if(item.isChecked){
          skuIdList.push(item.skuId)
        }
      })
      try {
        await this.$store.dispatch('getDeleteChecked',skuIdList)
        this.getShopcartList()
      } catch (error) {
        alert('删除已选中的商品失败')
      }
    }
  },
  computed: {
    ...mapState({
      shopcartList: (state) => state.shopcart.shopcartList,
    }),
    // 已选择数量
    chooseNum() {
      let num = 0
      this.shopcartList.forEach((item) => {
        if (item.isChecked) {
          num += item.skuNum
        }
      })
      return num
    },
    // 总价
    allPrice() {
      return this.shopcartList.reduce((prev, item, index) => {
        if (item.isChecked) {
          prev += item.skuNum * item.skuPrice
        }
        return prev
      }, 0)
    },
    // 全选
    chooseAll: {
      get() {
        return this.shopcartList.every((item) => item.isChecked)
      },
      async set(newVal) {
        let skuIdList = []
        // 把每一项的选中状态和全选最新状态不一样的id放进数组中
        this.shopcartList.forEach(item=>{
          if(item.isChecked != newVal){
            skuIdList.push(item.skuId)
          }
        })
        try {
          await this.$store.dispatch('getUpdateAllChecked',{isChecked:newVal?1:0,skuIdList})
          this.getShopcartList()
        } catch (error) {
          alert('更改多个选中状态失败')
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
          &hover {
            color: white !important;
          }
        }
      }
    }
  }
}
</style>