<template>

  <el-dialog :before-close="() => emits('onClose')" :width="dialogWidth"
   v-model="props.show" title="添加专辑" class="dialog-sty" center>
    <el-form ref="formRef" :model="formData"
      :label-width="labelWidth" :rules="rules">
      <el-form-item prop="name" label="合辑名称：">
        <el-input v-model="formData.name" aria-placeholder="请输入合辑名称" />
      </el-form-item>
      <el-form-item prop="sort" label="合辑排序：">
        <el-input v-model="formData.sort" aria-placeholder="请输入合辑排序"></el-input>
      </el-form-item>
      <el-form-item prop="image" label="合辑封面图：">
        <el-upload ref="uploadRef" :auto-upload="false" action="#" list-type="picture-card" :on-change="beforeAvatarUpload"
          :limit="1" v-model:file-list="fileList" :on-exceed="handleExceed">
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span
                  v-if="!disabled"
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
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang='ts'>
import {reactive, ref, toRaw, onMounted} from 'vue'
import { genFileId, ElMessage } from 'element-plus'
import type { UploadInstance, UploadRawFile, FormRules, FormInstance } from 'element-plus'
import {addCompilationApi} from '@/request/index'
import {getBase64} from '@/utils/common'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

let fileList = ref([])
const uploadRef = ref<UploadInstance>()
const formRef = ref<FormInstance>()

const emits = defineEmits(['onClose', 'getList'])

const formData = reactive({
  name: '',
  sort: null,
  image: ''
})

let disabled = ref(false)
let dialogWidth = ref(600)
let labelWidth = ref(110)
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入合辑名称', trigger: 'blur'}
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur'}
  ],
  image: [
    { required: true, message: '请上传封面', trigger: 'blur'}
  ]
})

onMounted(() => {
  if (window.screen.width < 560) {
    dialogWidth.value = 350
    labelWidth.value = 100
  }
})

const handleRemove = () => {
  formData.image = ''
  fileList.value = []
}

const reset = () => {
  fileList.value = []
  formData.name = ''
  formData.sort = null
  formData.image = ''
}

const handleExceed = (files:any) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const onClose = () => {
  formRef?.value?.resetFields()
  reset()
  emits('onClose')
}

const handleSubmit = () => {
  formRef?.value?.validate(valid => {
    if (valid) {
      addCompilationApi({...toRaw(formData)}).then((res:any) => {
        if (res.code === 200) {
          ElMessage.success('添加成功')
          formRef?.value?.resetFields()
          reset()
          emits('onClose')
          emits('getList')
        } else {
          ElMessage.error(res.message)
        }
      }).catch((err:any) => {
        console.log('err', err)
      })
    }
  })
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
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep(.el-upload)  {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader ::v-deep(.el-upload):hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.dialog-sty{
  width: 600px;
}
</style>