<template>

  <div class="container">
    <header class="header">
      <img class="logo" src="https://img1.bdstatic.com/static/common/img/baidu_image_logo_2dd9a28.png" />
      <div class="search-container">
        <input class="search" type="text" placeholder="请输入想要搜索的内容" v-model="queryParams.keywords" />
        <span class="search-icon" @click="searchImage">
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
      <div class="main-content" >
        <Waterfall
          :images="imageList"
          :column-count="collumnCount" 
          :column-gap="10" 
          :border-radius="6"
          background-color="#fff"
          @onDelete="handleDelete"
          @scrollEvent="scrollEventFn"
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

const route = useRoute()
let showAddImage = ref(false)
const compilationDetail = reactive({
  name: '',
  image: '',
  total: 0
})
const imageList = ref<any[]>([])
const queryParams = reactive({
  pageSize: 9999,
  currentPage: 1,
  keywords: ''
})
let canGetList = ref(true)

// 每行列数
let collumnCount = ref(4)

const addImageBtn = () => {
  showAddImage.value = true
}

onMounted(() => {
  if (window.innerWidth < 560) {
    collumnCount.value = 1
  } else if (window.innerWidth < 1044) {
    collumnCount.value = 2
  }
  getCompilationDetail()
  getImageList()
})

const searchImage = () => {
  queryParams.currentPage = 1
  getImageList()
}

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

const scrollEventFn = async () => {
    if (canGetList.value === false) return
    console.log("触发了", imageList.value.length, compilationDetail.total)
    canGetList.value = false
    if (imageList.value.length < compilationDetail.total) {
      queryParams.currentPage += 1
      await getImageList()
      canGetList.value = true
    } else {
      ElMessage.warning('没有更多了')
      setTimeout(() => {
        canGetList.value = true
      }, 100)
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
      console.log('res', res)
      compilationDetail.total = res.data.total
      if (queryParams.currentPage === 1) {
        imageList.value = res.data.list.map((item:any) => {
          return {
            src: item.image,
            ...item,
            title: item.name
          }
        })
      } else {
        const lastList = res.data.list.map((item:any) => {
          return {
            src: item.image,
            ...item,
            title: item.name
          }
        })
        imageList.value = [...imageList.value, ...lastList]
      }
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
@media screen and (max-width: 560px) {
  .container{
    width: 100vw;
    height: 100vh;
    .header{
      width: 100%;
      height: 110px;
      box-sizing: border-box;
      background-color: #fff;
      padding: 0 32px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 99;
      .logo{
        width: 67px;
        height: 24px;
        cursor: pointer;
        // order: 1;
      }
      .search-container{
        width: 270px;
        height: 40px;
        position: relative;
        order: 3;
        background-color: #fff;
        .search{
          width: 270px;
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
        order: 2;
        width: 90px;
        height: 30px;
        border-radius: 999px;
        font-size: 14px;
      }
    }
    .main{
      width: 100vw;
      height: calc(100vh - 110px);
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-bottom: 30px;
      .aside{
        width: 100%;
        height: 120px;
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
        min-width: calc(100% - 120px);
        height: 100%;
        // overflow-y: scroll;
      }
    }
  }
}
@media screen and (min-width: 560px) {
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
        box-sizing: border-box;
        padding-bottom: 20px;
        // overflow-y: scroll;
      }
    }
  }
}
</style>