<template>
  <div class="pagination">
    <!-- 如果当前页就是第一页 禁用上一页按钮 -->
    <button :disabled="pageNo === 1">上一页</button>
    <!-- 如果计算出来的start大于1 才有必要显示这个写死的1 -->
    <button v-if="startEnd.start > 1">1</button>
    <!-- 如果计算出来的start大于2 才有必要显示这个... -->
    <button v-if="startEnd.start > 2">···</button>

    <!-- 不能遍历continues 想想国外特工的这种情况-->
    <!-- 3 4 五 6 7-->
    <button :class="{active:pageNo === num + startEnd.start -1}" v-for="num in startEnd.end - startEnd.start +1" :key="num">{{ num + startEnd.start -1 }}</button>

    <!-- 如果计算出来的end小于总页数-1 才有必要显示这个... -->
    <button v-if="startEnd.end<totalPage-1">···</button>
    <!-- 如果计算出来的end小于总页数 才有必要显示写死的总页数 -->
    <button v-if="startEnd.end<totalPage">{{totalPage}}</button>
    <!-- 当前页就是最后一页 禁用下一页 -->
    <button :disabled="pageNo === totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props:{
    total:Number,
    pageNo:{
      type:Number
    },
    continues:{
      type:Number,
      default:5
    },
    pageSize:{
      type:Number,
      required:true
    }
  },
  computed:{
    // 总页数
    totalPage(){
      // 向上取整(总数/页大小)
      return Math.ceil(this.total/this.pageSize)
    },
    // 开始和结束
    startEnd(){
      // 根据已有数据(pageNo continues)计算
      let {pageNo,continues,totalPage} = this
      // 去处理你得开始和结束
      let start
      let end
      if(continues>totalPage){ //特殊情况1.连续页数大于总页数
        start = 1
        end = totalPage
      }else{  //说明连续页数小于等于总页数
        // 正常情况
        start = pageNo - Math.floor(continues/2)
        end = pageNo + Math.floor(continues/2)
        // 特殊情况2 左侧超出
        if(start<1){
          start = 1
          end = continues
        }
        // 特殊情况3 右侧超出
        if(end>totalPage){
          start = totalPage - continues +1
          end = totalPage
        }
      }
      // 把最终处理好的开始和结束进行返回
      return {start,end}
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
