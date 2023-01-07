<template>
  <div>
    <h2>深入v-model</h2>
    <!-- v-model 1.让data数据流向页面 2.页面操作之后还能进一步影响我的data数据 -->
    <input type="text" v-model="msg">
    <span>{{msg}}</span><br>

    <!-- v-model本质 :value+@input -->
    <input type="text" :value="msg" @input=" msg = $event.target.value">
    <span>{{msg}}</span><br>

    <CustomInput :value="msg" @input=" msg = $event"></CustomInput>

    <CustomInput v-model="msg"></CustomInput>
    <!-- 1.通过props把父组件数据给到子组件 -->
    <!-- 2.子组件接收数据并且使用 -->
    <!-- 3.父组件给子组件绑定一个自定义事件 -->
    <!-- 4.子组件在合适的时刻触发父组件给他绑定的自定义事件 并且传递最新数据 -->
    <!-- 5.父组件拿到子组件传递的最新数据 来去修改自己的数据 -->
    <!-- 6.父组件数据变化 传递给子组件的数据就是最新的 -->

    <!-- el-input身上的v-model  大伙可以粗浅的理解为是双向数据绑定 本质是父子组件数据同步 -->
    <el-input v-model="msg"></el-input>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    components: {
      CustomInput
    },
    data(){
      return {
        msg:'二狗子'
      }
    }
  }
</script>
