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
import { ElUpload, UploadRawFile } from "element-plus"
import 'element-plus/es/components/upload/style/css'
import { defineEmits } from "vue"
const emit = defineEmits(['changeFile'])
const beforeUpload = (rawFile: UploadRawFile) => {
  emit('changeFile', rawFile)
}
</script>
