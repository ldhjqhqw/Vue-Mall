<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- floorList确实也是发送请求获取到数据的 -->
    <!-- 刚开始空数组时没有生成floor 数据请求回来后才有了floor组件 -->
    <!-- floor想要有 他的数据一定请求回来了 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.getFloorList()
  },
  methods:{
    getFloorList(){
      this.$store.dispatch('getFloorList')
    }
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped>

</style>
