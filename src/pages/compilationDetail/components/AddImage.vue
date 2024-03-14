<template>

  <el-dialog
    v-model="props.show"
    title="添加图片"
    :width="dialogWidth"
    :before-close="() => emits('close')"
    :append-to-body="true"
    center
  >
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="图片描述：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入图片描述"></el-input>
      </el-form-item>
      <el-form-item prop="image" label="上传图片：">
        <el-upload ref="uploadRef" :auto-upload="false" action="#" list-type="picture-card" :on-change="beforeAvatarUpload"
          :limit="1" v-model:file-list="fileList" :on-exceed="handleExceed">
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove()"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
          <template #tip>
            <div class="el-upload__tip">
              请上传png/jpg格式图片
            </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emits('close')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang='ts'>
import {reactive, ref, toRaw, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {genFileId,ElMessage} from 'element-plus'
import type { UploadInstance, UploadRawFile, FormRules, FormInstance } from 'element-plus'
import {getBase64} from '@/utils/common'
import {addImageApi} from '@/request/index'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close', 'onSubmit'])
const route = useRoute()
const formData = reactive({
  name: '',
  image: '',
})
let fileList = ref([])
const uploadRef = ref<UploadInstance>()
const formRef = ref<FormInstance>()

const formRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入图片描述', trigger: 'blur' }],
  image: [{ required: true, message: '请上传图片', trigger: 'blur' }],
})
let dialogWidth = ref(500)

onMounted(() => {
  if (window.screen.width < 560) {
    dialogWidth.value = 350
  }
})

const handleSubmit = () => {
  addImageApi({compilationId: route.query.id,...toRaw(formData)})
  .then((res:any) => {
    if (res.code === 200) {
      ElMessage.success('添加成功')
      emits('onSubmit')
      reset()
    } else {
      ElMessage.error(res.msg)
      emits('close')
    }
  }).catch(err => {
    console.log('err', err)
  })
}

const reset = () => {
  formRef.value?.resetFields()
  fileList.value = []
  formData.name = ''
  formData.image = ''
}

const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.raw.type !== 'image/jpeg' && rawFile.raw.type !== 'image/png') {
    ElMessage.error('只能上传png或者jpg类型文件!')
    return false
  }
  getBase64(rawFile.raw).then((res) => {
    formData.image = res as string
  }).catch(err => {
    console.log(err, 'err')
  })
  return Promise.reject()
}

const handleExceed = (files:any) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const handleRemove = () => {
  formData.image = ''
  fileList.value = []
}
</script>

<style scoped lang="scss">

</style>