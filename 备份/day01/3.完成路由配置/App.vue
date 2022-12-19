<template>
  <div>
    <Header></Header>
    <!-- 中间之后有可能展示首页 搜索 详情 购物车... -->
    <router-view></router-view>
    <Footer></Footer>
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
  }
}
</script>


<style lang="less" scoped>
// 一定要记得安装less 以及 less-loader

</style>
