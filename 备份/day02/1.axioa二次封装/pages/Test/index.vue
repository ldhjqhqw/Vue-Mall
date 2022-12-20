<template>
  <div>
    <h1>这个组件咱们用来书写一些测试代码</h1>
    <button @click="test">点击按钮发送获取三级分类的请求</button>
  </div>
</template>

<script>
import axios from 'axios'
import ajax from '@/api/ajax.js'
export default {
  name: 'Test',
  methods: {
    async test() {
      // 这是之前使用axios发送请求
      // try {
      //   const res = await axios({
      //     url: '/api/product/getBaseCategoryList',
      //     method: 'get',
      //   })
      //   console.log(res.data.data,'res')
      // } catch (error) {
      //   console.log(error,'error')
      // }

      // 这是咱们自己的ajax发送请求
      const res = await ajax({
        url: '/product/getBaseCategoryList',
        method: 'get',
      })
    },
  },
}
</script>

<style scoped>
</style>
