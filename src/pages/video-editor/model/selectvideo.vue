<template>
  <div class="select-file-container">
    <Upload
    :drag="true"
    :changeFile="uploadFile"
    :validate="validateVideo"
    >
      <div class="upload-file">
        <div class="upload-click">Upload Video</div>
        <div class="upload-drag">drag and drop to upload files</div>
      </div>
    </Upload>
  </div>
</template>

<script lang="ts" setup>
import Upload from '@/components/upload.vue'
import {defineProps} from "vue"
import { validateVideo } from "@/utils";
import {UploadFile} from "element-plus"
interface Props {
  changeFile: (file: UploadFile) => void;
}
const props = defineProps<Props>()
const uploadFile = (file: UploadFile) => {
  props.changeFile(file)
}
</script>

<style lang="less" scoped>
.select-file-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .upload-file {
    width: auto;
    background-color: #c8d6e5;
    border-radius: 5px;
    padding: 10px;
    .upload-click {
      height: 50px;
      width: auto;
      padding-left: 60px;
      background: url("@/assets/svg/video-editor/uploadVideo.svg") no-repeat left center;
      background-size: 50px 50px;
      line-height: 50px;
      text-align: start;
    }
    .upload-drag {
      height: 20px;
      width: 100%;
      line-height: 20px;
      padding-left: 30px;
      text-align: start;
      background: url("@/assets/svg/video-editor/drag.svg") no-repeat left center;
      background-size: 20px 20px;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>
