<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <!-- <img :src="skuImageList[0]?.imgUrl" /> -->
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data(){
      return {
        defaultIndex:0 //初始默认下标
      }
    },
    methods:{
      move(e){
        // 获取蒙版及大图
        let mask = this.$refs.mask
        let bigImg = this.$refs.bigImg
        // 获取鼠标位置
        let mouseX = e.offsetX
        let mouseY = e.offsetY
        // 计算蒙版移动的距离  鼠标位置-蒙版宽度的一半
        let moveX = mouseX - mask.offsetWidth/2
        let moveY = mouseY - mask.offsetHeight/2
        // 水平边界值判断
        if(moveX<0){ //左边界
          moveX = 0
        }else if(moveX > e.target.offsetWidth - mask.offsetWidth){ //右边界
          moveX = e.target.offsetWidth - mask.offsetWidth
        }
        // 垂直边界值判断
        if(moveY<0){ //上边界
          moveY=0
        }else if(moveY > e.target.offsetHeight - mask.offsetHeight){ //下边界
          moveY = e.target.offsetHeight - mask.offsetHeight
        }
        // 赋值给mask的left以及top
        mask.style.left = moveX +'px'
        mask.style.top = moveY +'px'
        // 还得让大图也动 
        bigImg.style.left = moveX * -2 +'px'
        bigImg.style.top = moveY * -2 +'px'
      }
    },
    props:['skuImageList'],
    computed:{
      defaultImg(){
        return this.skuImageList[this.defaultIndex] || {}
      }
    },
    mounted(){
      this.$bus.$on('sendIndex',(index)=>{
        // 接收到imageList传递的下标 修改defaultIndex  defaultIndex一旦变化 defaultImg重新执行
        this.defaultIndex = index
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>