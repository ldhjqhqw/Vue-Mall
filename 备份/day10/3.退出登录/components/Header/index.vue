<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList" v-if="!userInfo.name">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="loginList" v-else>
          <p>尚品汇欢迎您！</p>
          <p>
            <a>用户名: {{ userInfo.name }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Header',
  data(){
    return {
      keyword:undefined
    }
  },
  methods:{
    goSearch(){
      console.log(this.$route.query,'this.$route.query')
      // 直接获取之前的query参数 加入自己的这个跳转中
      this.$router.push({
        name:'search',
        params:{
          keyword:this.keyword
        },
        query:this.$route.query
      })
    },
    // 退出登录
    async logout(){
      //发送请求 让后端删除掉这个token  如果用户之后重新登录 获取最新的token与之对应
      try {
        await this.$store.dispatch('getLogout')
        // 为了防止用户是在某些需要登录的页面 统一处理 让他退出登录后回首页
        this.$router.push('/')
      } catch (error) {
        alert('退出登录失败')
      }
      //本地存储的token以及localStorage做出清除
    }
  },
  mounted(){
    this.$bus.$on('removeKeyword',()=>{
      this.keyword = undefined
    })
  },
  computed:{
    ...mapState({
      userInfo:state=>state.user.userInfo
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
