<template>
  <div>
    <h1>这个组件咱们用来书写一些测试代码</h1>

    <!-- 全写写法 -->
    <!-- <h1>展示总store中的e: {{ $store.state.e }}</h1>
    <h1>展示home模块中的a: {{ $store.state.home.a }}</h1>
    <h1>展示user模块中的c: {{ $store.state.user.c }}</h1> -->

    <!-- 简写 -->
    <!-- <h1>展示总store中的e: {{ eee }}</h1> -->
    <!-- <h1>展示home模块中的a: {{ a }}</h1>
    <h1>展示user模块中的c: {{ c }}</h1> -->

    <!-- <button @click="test1">点击触发home模块中的FN1这个mutations函数</button>
    <button @click="test2">点击触发user模块中的fn2这个actions函数</button> -->

    <!-- <h1>展示home当中的newA:{{ $store.getters.newA }}</h1>
    <h1>展示user当中的newC:{{ $store.getters.newC }}</h1> -->

    <h1>展示home当中的newA:{{ newA }}</h1>
    <h1>展示user当中的newC:{{ newC }}</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'Test',
  computed:{
    // ...mapState(['e'])
    // ...mapState({
    //   eee:'e'
    // })
    
    // 不行
    // ...mapState(['a'])
    // ...mapState({
    //   a:'home.a'
    // })

    // 行  映射模块里的
    // ...mapState({
    //   a:function(state){ //默认可以接收state (总store的state)
    //     return state.home.a  //return的结果是这个数据的值
    //   },
    //   c:state=>state.user.c
    // })

    ...mapGetters(['newA','newC'])
  },
  methods:{
    // test1(){
    //   this.$store.commit('FN1')
    // },
    // test2(){
    //   this.$store.dispatch('fn2')
    // }
    // ...mapMutations({
    //   test1:'FN1'
    // }),
    // ...mapActions({
    //   test2:'fn2'
    // })
  }
}
</script>

<style scoped>
</style>
