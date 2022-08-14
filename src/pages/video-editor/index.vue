<template>
  <div class="videoEditor">
    <div class="video-top">
      <div class="video-container">
      </div>
      <div class="function-area">
        <Upload :validate="validateVideo" :change-file="changeFile">
          <div>上传</div>
        </Upload>
      </div>
    </div>
    <div class="frame-area">
      <div class="frame-images">
        <img v-for="(img, index) in data.frames" :src="img" :key="index" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from "vue"
import { validateVideo } from "@/utils"
import { UploadFile } from 'element-plus'
import Upload from '@/components/upload'
interface DATA {
  videoUrl: string;
  duration: number;
  frames: string[]
}
const data = reactive<DATA>({
  videoUrl: '',
  duration: 0,
  frames: []
})
const changeFile = (file: UploadFile) => {
  data.videoUrl = URL.createObjectURL(file.raw as File)
  const video = document.createElement('video')
  video.setAttribute('src', data.videoUrl)
  video.onloadedmetadata = async () => {
    for (let s = 1; s<= video.duration; s += 12) {
      const image = await videoInit(data.videoUrl, s) as string
      data.frames.push(image)
    }
  }
}
const videoInit = (url:string, s: number) => {
  const video = document.createElement('video')
  video.setAttribute("src", url)
  video.currentTime = s
  return new Promise((resolve, reject) => {
    video.addEventListener('loadeddata',() => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      const image = canvas.toDataURL('image/jpeg')
      resolve(image)
    })
  })

}
</script>
<style lang="less" scoped>
.videoEditor {
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
  .video-top {
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .video-container {
      flex: 1;
      height: 100%;
      border: 1px solid aqua;
      position: relative;
      .video-play {
        position: absolute;
        width: 500px;
        height: 50%;
        top: 50%;
      }
      canvas {
        width: 500px;
        height: 50%;
        background-color: black;
      }
    }
    .function-area {
      width: 590px;
      margin-left: 10px;
      height: 100%;
      border: 1px solid firebrick;
    }
  }
  .frame-area {
    margin-top: 10px;
    width: 100%;
    height: calc( 100% - 610px );
    border: 1px solid aqua;
    box-sizing: border-box;
    .frame-images {
      width: 100%;
      height: 50px;
      display: flex;
      img {
        height: 50px;
      }
    }
  }
}
</style>
