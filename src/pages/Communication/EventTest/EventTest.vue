<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 在html元素身上绑定原生dom事件及自定义事件 -->
    <button @click="test1">我是按钮</button>
    <!-- $event就理解为是一个占位符(默认参数)  在原生dom事件中$event是事件对象-->
    <button @click="test1($event)">我是按钮</button>
    <!-- 给html元素绑定自定义事件 是没有意义的 -->
    <button @xxx="test2">我是按钮</button>

    <!-- 在组件标签身上绑定原生dom事件及自定义事件 -->
    <!-- 给组件标签身上绑定无论原生dom事件还是自定义事件 都当作自定义事件执行 -->
    <!-- 给组件标签绑定原生dom事件 就想让他当作原生dom事件执行 增加native修饰符-->
    <!-- 给组件绑定原生dom事件 其实本质是把这个回调函数加给了组件的根标签 事件冒泡 -->
    <!-- <Event1 @click.native="test3"></Event1> -->
    <!-- <Event2 @xxx="test4"></Event2> -->
    <Event2 @xxx="test4($event)"></Event2>

    <!-- 如果给html元素身上绑定原生dom事件 就当作原生dom事件处理 自定义事件无意义 -->
    <!-- 如果给组件标签绑定无论是原生dom事件还是自定义事件 都当作自定义事件处理 除非你加了native修饰符 -->
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',
    components: {
      Event1,
      Event2,
    },
    methods:{
      test1(e){
        console.log(e.target.innerHTML)
      },
      test2(){
        console.log(222)
      },
      test3(e){
        console.log(e.target.innerHTML)
      },
      test4(e){
        console.log(e)
      }
    }
  }
</script>
