<template>
  <div>
    <h1>Test2组件</h1>
    <button @click="handle">点击按钮给Test1传递数据</button>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'Test2',
  data(){
    return {
      msg:'二狗子'
    }
  },
  methods:{
    handle(){
      // this.$bus.$emit('test',this.msg,3,5,7)
      // publish是发布消息 参数1 消息名字  参数2 要传递过去的数据(如果传递过去多个数据 需要是一个对象或者数组)
      PubSub.publish('test',this.msg,3,5,7)
    }
  }
}
</script>

<style scoped>

</style>
