<template>

  <div class="container">
    <header class="header">
      <img class="logo" src="https://img1.bdstatic.com/static/common/img/baidu_image_logo_2dd9a28.png" />
      <div class="search-container">
        <input class="search" type="text" placeholder="请输入想要搜索的内容" />
        <span class="search-icon">
          <el-icon><Search /></el-icon>
        </span>
      </div>
      <div><el-button type="primary" class="add-btn" @click="addImageBtn">添加图片</el-button></div>
    </header>
    <main class="main">
      <div class="aside">
        <img class="aside-image" :src="compilationDetail.image" />
        <div class="detail">
          <div class="title">{{ compilationDetail.name }}专题</div>
          <div class="total">共{{ compilationDetail.total }}张图片</div>
        </div>
      </div>
      <div class="main-content" @scroll="scrollEventFn">
        <Waterfall 
          :images="imageList"
          :column-count="4" 
          :column-gap="10" 
          :border-radius="6"
          background-color="#fff"
          @onDelete="handleDelete"
        ></Waterfall>
      </div>
    </main>
  </div>

  <AddImage :show="showAddImage" @close="showAddImage=false" @onSubmit="onSubmit" />

</template>

<script setup lang='ts'>
import {ref,onMounted,reactive,toRaw} from 'vue'
import {useRoute} from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import AddImage from './components/AddImage.vue'
import {getCompilationDetailApi,getImageListApi,deleteImageApi} from '@/request/index'
import Waterfall from '@/components/Waterfall.vue'

const route = useRoute()
let showAddImage = ref(false)
const compilationDetail = reactive({
  name: '',
  image: '',
  total: 0
})
const imageList = ref([])
const queryParams = reactive({
  pageSize: 14,
  currentPage: 1
})

const addImageBtn = () => {
  showAddImage.value = true
}

onMounted(() => {
  getCompilationDetail()
  getImageList()
})

const handleDelete = (id: string) => {
  ElMessageBox.alert('确定删除该图片吗？', '提示', {
    confirmButtonText: '确定',
    showCancelButton: true,
    cancelButtonText: '取消',
    type: 'warning',
    callback(action: Action) {
      if (action === 'confirm') {
        deleteImageApi({id}).then((res:any) => {
          if (res.code === 200) {
            ElMessage.success('删除成功')
            queryParams.currentPage = 1
            getImageList()
          } else {
            ElMessage.error(res.message)
          }
        }).catch(err => {})
      }
    }
  })
}

const scrollEventFn = (e: any) => {
  if (e.srcElement.scrollTop + e.srcElement.clientHeight > e.srcElement.scrollHeight - 20) {
    console.log("触发了")
  }
}

const onSubmit = async () => {
  queryParams.currentPage = 1
  await getImageList()
  showAddImage.value = false
}

const getImageList = () => {
  getImageListApi({compilationId: route.query.id, ...toRaw(queryParams)}).then((res:any) => {
    if (res.code === 200) {
      imageList.value = res.data.list.map((item:any) => {
        return {
          src: item.image,
          ...item,
          title: item.name
        }
      })
    }
  }).catch(err => {})
}

const getCompilationDetail = () => {
  getCompilationDetailApi({id: route.query.id}).then((res:any) => {
    if (res.code === 200) {
      compilationDetail.name = res.data.name
      compilationDetail.image = res.data.image
      compilationDetail.total = res.data.total
    }
  }).catch(err => {
    console.log('err', err)
  })
}
</script>

<style scoped lang="scss">
.container{
  width: 100vw;
  height: 100vh;
  .header{
    width: 100%;
    height: 72px;
    box-sizing: border-box;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    .logo{
      width: 67px;
      height: 24px;
      cursor: pointer;
    }
    .search-container{
      width: 470px;
      height: 40px;
      position: relative;
      .search{
        width: 470px;
        height: 40px;
        outline: none;
        box-sizing: border-box;
        padding: 0 84px 0 16px;
        border-radius: 999px;
        border: none;
        background-color: rgba(0,0,0,0.03);
        caret-color: #333;
        color: #333;
        font-size: 16px;
      }
      .search-icon{
        width: 20px;
        height: 20px;
        display: inline-block;
        position: absolute;
        top: 13px;
        right: 10px;
        cursor: pointer;
      }
    }
    .add-btn{
      width: 234px;
      height: 48px;
      border-radius: 999px;
      font-size: 16px;
    }
  }
  .main{
    width: 100vw;
    height: calc(100vh - 72px);
    display: flex;
    .aside{
      width: 220px;
      height: 100%;
      box-sizing: border-box;
      padding: 10px 20px;
      display: flex;
      .aside-image{
        width: 80px;
        height: 80px;
        border-radius: 12px;
      }
      .detail{
        height: 80px;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title{
          font-size: 16px;
        }
        .total{
          font-size: 14px;
          color: #9195A3;
          margin-top: 5px;
        }
      }
    }
    .main-content{
      min-width: calc(100% - 235px);
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>