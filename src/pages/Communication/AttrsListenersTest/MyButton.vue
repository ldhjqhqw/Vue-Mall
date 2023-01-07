<template>
  <div>
    <!-- 希望一次性把加给咱们组件的属性应用到el-button身上 -->
    <a :title="title">
      <!-- 一次性把$listeners当中的事件全部加给el-button -->
      <el-button v-bind="$attrs" v-on="$listeners">我是按钮</el-button>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'MyButton',
    props:['title']
  }
</script>
