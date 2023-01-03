<template>
  <div>
    <Header></Header>
    <!-- 第一次是不会缓存的 第二次才会缓存 发送请求是2次 -->
    <!-- <keep-alive :include="['Home','Search']">
      <router-view></router-view>
    </keep-alive> -->

    <router-view></router-view>
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
  // 为了解决分类请求多次发送 把发送请求放在App组件中 Home组件和Search切换并不会让App重新挂载
  mounted(){
    console.log('App组件挂载了')
    this.getCategoryList()
    // this.$store.dispatch('getUserInfo')
  },
  methods:{
    getCategoryList() {
      this.$store.dispatch('getCategoryList')
    },
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
