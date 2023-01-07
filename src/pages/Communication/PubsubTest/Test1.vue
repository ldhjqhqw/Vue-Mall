<template>
  <div>
    <h1>Test1组件</h1>
    <p>接收Test2传递的数据:{{ content }}</p>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
  name: 'Test1',
  data(){
    return {
      content:''
    }
  },
  methods:{
    test(msgName,msg){
      this.content = msg
    }
  },
  mounted(){
    // 全局事件总线和pubsub-js差异点
    // 1.pubsub回调函数形参第一个恒固定是消息的名字
    // 2.pubsub传递多个数据 必须传一个对象或者数组

    // this.$bus.$on('test',(msg)=>{})
    // subscribe来去订阅消息 参数1 消息名字 参数2 回调函数(参数1恒固定拿到消息的名字 参数2才是接收传递过来的数据)

    // 箭头函数 可行
    // PubSub.subscribe('test',(msgName,msg,num1,num2,num3)=>{
    //   console.log(num1,num2,num3)
    //   this.content = msg
    // })

    // 普通函数 不可行
    // PubSub.subscribe('test',function(msgName,msg){
    //   console.log(this)
    //   this.content = msg
    // })

    // methods方法
    PubSub.subscribe('test',this.test)
  }
}
</script>

<style scoped>

</style>
