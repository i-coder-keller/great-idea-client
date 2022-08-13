<template>
    <ElUpload
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="beforeUpload"
    >
      <slot />
    </ElUpload>
</template>
<script lang="ts" setup>
import { ElUpload, UploadFile } from "element-plus"
import 'element-plus/es/components/upload/style/css'
import { defineProps } from "vue"
interface Props {
  validate: (file: UploadFile) => boolean;
  changeFile: (file: UploadFile) => void
}
const prop = defineProps<Props>()
const beforeUpload = (rawFile: UploadFile) => {
  const checked: boolean = prop.validate(rawFile)
  if (checked) {
    prop.changeFile(rawFile)
  } else {
    console.log('视频格式不对')
  }
}
</script>
