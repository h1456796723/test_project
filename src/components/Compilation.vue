<template>

  <div class="compilation" @mouseenter="show=true" @mouseleave="show=false">
    <img class="bg" :src="props.image" alt="">
    <div class="content">{{ name }}</div>
    <div v-show="show" class="opera-container">
      <span @click="emit('edit')" class="edit"><el-icon><Edit /></el-icon></span>
      <span @click="emit('delete')" class="delete"><el-icon><Delete /></el-icon></span>
    </div>
  </div>

</template>

<script setup lang='ts'>
import {ref} from 'vue'
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['edit','delete'])

let show = ref(false)

</script>

<style scoped lang="scss">
@media screen and (max-width: 560px) {
  .compilation{
    width: 300px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 16px;
    position: relative;
    &:hover .bg{
      transform: scale(1.2);
    }
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
    .content{
      position: absolute;
      z-index: 98;
      width: 100%;
      height: 26px;
      left: 0;
      bottom: 0;
      color: #fff;
      font-size: 14px;
      background-image: linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.45) 100%);
      box-sizing: border-box;
      padding: 5px 20px;
    }
    .opera-container{
      position: absolute;
      z-index: 99;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #fff;
        font-size: 25px;
        cursor: pointer;
      }
      .edit{
        margin-right: 20px;
      }
    }
  }
}
@media screen and (min-width: 560px) and (max-width: 1044px) {
  .compilation{
    width: 380px;
    height: 250px;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 16px;
    position: relative;
    &:hover .bg{
      transform: scale(1.2);
    }
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
    .content{
      position: absolute;
      z-index: 98;
      width: 100%;
      height: 26px;
      left: 0;
      bottom: 0;
      color: #fff;
      font-size: 14px;
      background-image: linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.45) 100%);
      box-sizing: border-box;
      padding: 5px 20px;
    }
    .opera-container{
      position: absolute;
      z-index: 99;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #fff;
        font-size: 25px;
        cursor: pointer;
      }
      .edit{
        margin-right: 20px;
      }
    }
  }
}
@media screen and (min-width: 1044px) {
  .compilation{
    width: 400px;
    height: 250px;
    border-radius: 12px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 16px;
    position: relative;
    &:hover .bg{
      transform: scale(1.2);
    }
    .bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }
    .content{
      position: absolute;
      z-index: 98;
      width: 100%;
      height: 26px;
      left: 0;
      bottom: 0;
      color: #fff;
      font-size: 14px;
      background-image: linear-gradient(180deg,rgba(0,0,0,0) 0,rgba(0,0,0,.45) 100%);
      box-sizing: border-box;
      padding: 5px 20px;
    }
    .opera-container{
      position: absolute;
      z-index: 99;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #fff;
        font-size: 25px;
        cursor: pointer;
      }
      .edit{
        margin-right: 20px;
      }
    }
  }
}
</style>