<template>
  <div>
    <h1>里面有很多很多重复的结构...</h1>
    <!-- 在这个位置占个坑 之后使用子组件时千万要记得填坑 -->
    <!-- 1.默认插槽 在子组件内部某个位置书写slot标签 那么之后使用子组件标签时可以传递结构 那么这些传递的结构最终就会渲染在slot标签的位置 -->
    <!-- slot标签内部的结构 默认结构 -->
    <slot></slot>
    <!-- 2.具名插槽(给插槽起了个名字) -->
    <!-- 之后如果使用子组件时指定用哪一个具名插槽 那么这些结构就会渲染在具名插槽中 -->
    <slot name="test"></slot>
  </div>
</template>

<script>
export default {
  name: 'Child',
}
</script>

<style scoped>

</style>
