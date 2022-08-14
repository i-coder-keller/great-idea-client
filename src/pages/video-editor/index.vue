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
      <TimeLine
          :duration="data.duration"
          :frame-time="12"
          :frames="data.frames"
          v-if="data.showTimeline"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue"
import { validateVideo, generateFrame } from "@/utils"
import { UploadFile } from 'element-plus'
import TimeLine from '@/components/timeLine/time-line'
import Upload from '@/components/upload'
interface DATA {
  videoUrl: string;
  duration: number;
  frames: string[];
  showTimeline: boolean
}
const data = reactive<DATA>({
  videoUrl: '',
  duration: 0,
  frames: [],
  showTimeline: false
})
const changeFile = (file: UploadFile) => {
  data.videoUrl = URL.createObjectURL(file.raw as File)
  const video = document.createElement('video')
  video.setAttribute('src', data.videoUrl)
  video.onloadedmetadata = async () => {
    for (let s = 1; s<= video.duration; s += 12) {
      const image = await generateFrame(data.videoUrl, s)
      data.frames.push(image)
    }
  }
  data.showTimeline = true
}

</script>
<style lang="less" scoped>
.videoEditor {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
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
    padding: 5px;
    .frame-images {
      width: 100%;
      height: 50px;
      display: flex;
      border-radius: 5px;

      overflow-x: scroll;
      img {
        height: 50px;
      }
    }
  }
}
</style>
