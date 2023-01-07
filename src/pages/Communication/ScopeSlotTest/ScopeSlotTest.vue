<template>
  <div>
    <!-- 插槽 -->
    <!-- 1.默认插槽(父向子)  2.具名插槽(父向子)  3.作用域插槽(父子之间传递数据) -->
    <Child>
      <template>
        <button>按钮</button>
      </template>
    </Child>
    
    <Child>
      <template>
        <a href="http://www.baidu.com">去百度</a>
      </template>
      <template slot="test">
        <p>段落</p>
      </template>
      <template>
        <span>span</span>
      </template>
    </Child>


    <!-- <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>

    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2> -->

  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  import Child from './Child'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },
    components: {
      List,
      Child
    }
  }
</script>
