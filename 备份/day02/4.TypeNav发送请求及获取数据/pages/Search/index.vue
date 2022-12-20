<template>
  <div>
    <h1>Search</h1>
    <h1>接收到params参数: {{ keyword }}</h1>
    <h1>接收到query参数: {{ keyword1 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword1']
}
</script>

<style lang="less" scoped>

</style>
