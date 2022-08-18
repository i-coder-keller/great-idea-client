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
import { Frame, dateTimeDuration } from "@/utils"
import TimeLine from '@/components/timeLine/time-line.vue'
import VideoRef from './video.vue'
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

/**
 * 视频播控函数
 */
const broadcastControl = () => {
  data.videoPlayStatus = !data.videoPlayStatus
  if (data.videoPlayStatus) {
    player.value.setVideoPlay()
  } else {
    player.value.setVideoPause()
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

/**
 * 设置帧图
 */
const setFrames = (file: Frame) => {
  data.frames.push(file)
}
/**
 * 设置帧图
 */
const setUrl = (url: string) => {
  data.videoUrl = url
}
defineExpose({setFrames, setUrl})
</script>
<style lang="less" scoped>
.videoEditor {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #2c3e50;
  overflow: auto;
  .video-top {
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8395a7;
    .video-area {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      .video-container {
        width: 100%;
        padding-top: 50px;
        height: calc(100% - 110px);
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 150px;
          .video-process-current {
            display: inline-block;
            color: #FFFFFF;
            flex: 1;
            text-align: center;
          }
          .video-process-duration {
            color: hsla(0,0%,100%,.5);
          }
        }
      }
    }
  }
  .frame-area {
    margin-top: 10px;
    width: 100%;
    height: calc( 100% - 500px );
    overflow: hidden;
    border: 1px solid aqua;
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
