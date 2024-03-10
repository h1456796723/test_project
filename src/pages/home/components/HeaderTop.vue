<template>
  <div class="full-cover"></div>
  <header class="header">
    <ul class="left">
      <a>新闻</a>
      <a>hao123</a>
      <a>地图</a>
      <a>好看</a>
      <a>贴吧</a>
      <a>学术</a>
      <a>更多</a>
    </ul>
    <ul class="right">
      <a>百度首页</a>
      <a>收藏本页</a>
    </ul>
  </header>

</template>

<script setup lang='ts'>
</script>

<style scoped lang="scss">
.full-cover{
  width: 100%;
  height: 48px;
  position: absolute;
  top: 0;
  left: 0;
  background: #0F1932;
  opacity: 0.3;
}
.header{
  width: 100%;
  height: 48px;
  line-height: 48px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  .left{
    display: flex;
    a{
      margin-left: 24px;
      color: #fff;
      cursor: pointer;
      font-size: 13px;
    }
  }
  .right{
    display: flex;
    a{
      margin-right: 24px;
      color: #fff;
      cursor: pointer;
      font-size: 13px;
    }
  }
}
</style>