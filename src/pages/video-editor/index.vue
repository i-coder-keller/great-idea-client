<template>
  <div class="videoEditor">
    <div class="video-top">
      <div class="video-area">
        <div class="video-container">
          <VideoRef
              :video-url="data.videoUrl"
              :setDuration="setDuration"
              :setCurrentTime="setCurrentTime"
              ref="player"
          />
        </div>
        <div class="video-controls">
          <div
              :class="['video-base', data.videoPlayStatus ? 'video-pause' : 'video-play' ]"
              @click="broadcastControl"
          />
          <div class="video-process">
            <span class="video-process-current">{{current}}</span>
             /
            <span class="video-process-duration">{{ duration }}</span>
          </div>
        </div>
      </div>
      <div class="function-area">
        <Upload :validate="validateVideo" :change-file="changeFile">
          <div>上传</div>
        </Upload>
      </div>
    </div>
    <div class="frame-area">
      <TimeLine
          :frames="data.frames"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from "vue"
import { validateVideo, generateFrame, Frame, dateTimeDuration } from "@/utils"
import { UploadFile } from 'element-plus'
import TimeLine from '@/components/timeLine/time-line'
import Upload from '@/components/upload'
import VideoRef from './model/video'
interface Reactive {
  videoUrl: string;
  duration: number;
  frames: Frame[];
  showTimeline: boolean;
  videoPlayStatus: boolean;
  videoDuration: number;
  videoCurrentTime: number;
}
const player = ref()
const data = reactive<Reactive>({
  videoUrl: '',
  duration: 0,
  frames: [],
  showTimeline: false,
  videoPlayStatus: false,
  videoDuration: 0,
  videoCurrentTime: 0
})
const duration = computed(() => dateTimeDuration(data.videoDuration))
const current = computed(() => dateTimeDuration(data.videoCurrentTime))
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
/**
 * 视频播控函数
 */
const broadcastControl = () => {
  data.videoPlayStatus = !data.videoPlayStatus
  if (data.videoPlayStatus) {
    player.value.setVideoPause()
  } else {
    player.value.setVideoPlay()
  }
}
/**
 * 设置当前播放进度
 * @param currentTime
 */
const setCurrentTime = (currentTime: number) => {
  data.videoCurrentTime = currentTime
}
/**
 * 设置总时长
 * @param duration
 */
const setDuration = (duration: number) => {
  data.videoDuration = duration
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
    .video-area {
      flex: 1;
      height: 100%;
      border: 1px solid aqua;
      position: relative;
      .video-container {
        width: 100%;
        height: calc(100% - 50px);
      }
      .video-controls {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .video-base {
          height: 25px;
          width: 25px;
          cursor: pointer;
        }
        .video-play {
          background: url("@/assets/svg/video-editor/play.svg") no-repeat center center;
          background-size: 100% 100%;
        }
        .video-pause {
          background: url("@/assets/svg/video-editor/pause.svg") no-repeat center center;
          background-size: 100% 100%;
        }
        .video-process {
          margin-left: 20px;
          font-size: 15px;
          color: hsla(0,0%,100%,.5);
          .video-process-current {
            color: #FFFFFF;
          }
          .video-process-duration {
            color: hsla(0,0%,100%,.5);
          }
        }
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
    overflow: hidden;
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
