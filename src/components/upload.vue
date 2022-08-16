<template>
    <ElUpload
        :multiple="false"
        :show-file-list="false"
        :auto-upload="false"
        :on-change="beforeUpload"
        :drag="drag"
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
  changeFile: (file: UploadFile) => void;
  drag: boolean;
}
const prop = defineProps<Props>()
const beforeUpload = (rawFile: UploadFile) => {
  const checked: boolean = prop.validate(rawFile)
  if (checked) {
    prop.changeFile(rawFile)
  }
}
</script>
<style lang="less">
.el-upload-dragger {
  border: none;
  padding: 0;
  border-radius: 0;
  background: none;
}
</style>
