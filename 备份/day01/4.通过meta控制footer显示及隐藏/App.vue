<template>
  <div>
    <Header></Header>
    <!-- 中间之后有可能展示首页 搜索 详情 购物车... -->
    <router-view></router-view>
    <!-- <Footer v-if="$route.path !== '/login' && $route.path !== '/register'"></Footer> -->
    <!-- <Footer v-if="test"></Footer> -->
    <!-- 通过路由元数据控制footer显示和隐藏 -->
    <Footer v-if="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    console.log(this.$route)
  },
  computed:{
    test(){
      return this.$route.path !== '/login' && this.$route.path !== '/register'
    }
  }
}
</script>


<style lang="less" scoped>
// 一定要记得安装less 以及 less-loader

</style>
