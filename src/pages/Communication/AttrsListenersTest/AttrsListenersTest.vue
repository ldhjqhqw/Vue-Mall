<template>
  <div>
    <!-- 认识了$attrs以及$listeners以及注意点 -->
    <!-- <Child a="1" b="2" style="color:red" class="cls1" @x="test1" @y="test2"></Child> -->

    <h2>自定义带Hover提示的按钮</h2>
    <!-- 使用场景:二次封装组件 -->
    <!-- <el-button type="primary" size="mini" icon="el-icon-search">我是按钮</el-button> -->

    <MyButton type="primary" size="mini" icon="el-icon-search" title="搜索按钮" @click="test3"></MyButton>
    <MyButton type="danger" icon="el-icon-delete" title="删除按钮"></MyButton>

    <!-- el-button内部只特殊处理了点击 别的都没处理 -->
    <!-- <el-button @click="test4">element-ui中的button</el-button> -->
    <el-button @mousemove="test5">element-ui中的button</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import MyButton from './MyButton.vue'
export default {
    name: 'AttrsListenersTest',
    components:{
      Child,
      MyButton
    },
    methods: {
      test1(){

      },
      test2(){

      },
      test3(){
        console.log(333)
      },
      test4(){
        console.log(444)
      },
      test5(){
        console.log(555)
      },
    },
  }
</script>
