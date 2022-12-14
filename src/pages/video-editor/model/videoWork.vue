<template>
  <div class="videoEditor">
    <div class="video-top">
      <div class="video-area">
        <div class="video-container">
          <VideoRef
              :video-url="data.videoUrl"
              :setDuration="setDuration"
              :setCurrentTime="setCurrentTime"
              :setPlayStatus="setPlayStatus"
              ref="player"
          />
        </div>
        <div class="video-controls">
          <div
              :class="['video-base', data.videoPlayStatus ? 'video-pause' : 'video-play' ]"
              @click="broadcastControl(!data.videoPlayStatus)"
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
          :change-video-progress="changeVideoProgress"
      />
      <div class="video-controls">
        <div class="controls-menus">
          <div
              v-for="menu in menus"
              :class="[
                  menu.className,
                   data.selectedMenu === menu.mark ?
                    menu.selectedClassName :
                     menu.unselectedClassName
                     ]"
              :key="menu.mark"
              :aria-label="menu.ariaLabel"
              @click="selectMenu(menu.mark)"
          />
        </div>
        <div class="video-control-target">
          <Speed v-if="data.selectedMenu === 'speed'" :change-speed="changeVideoSpeed"/>
          <Volume v-if="data.selectedMenu === 'volume'" :changeVolume="changeVideoVolume"/>
          <CurMarkGroup v-if="data.selectedMenu === 'cutMark'" />
          <VoiceRecorder v-if="data.selectedMenu === 'voice'" />
          <TextControl v-if="data.selectedMenu === 'text'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from "vue"
import { Frame, dateTimeDuration } from "@/utils"
import TimeLine from '@/components/timeLine/time-line.vue'
import Speed from '@/components/solider/speed.vue'
import Volume from '@/components/solider/volume.vue'
import VideoRef from './video.vue'
import CurMarkGroup from './cutMarkGourp'
import TextControl from './text-control'
import VoiceRecorder from './voice-recorder.vue'
import { useUserStore } from "@/store/user"
import { menus, Selected_Menu } from "./Menus"

interface Reactive {
  videoUrl: string;
  duration: number;
  frames: Frame[];
  showTimeline: boolean;
  videoPlayStatus: boolean;
  videoDuration: number;
  videoCurrentTime: number;
  selectedMenu: Selected_Menu
}
const UserStore = useUserStore()
const player = ref()
const data = reactive<Reactive>({
  videoUrl: '',
  duration: 0,
  frames: [],
  showTimeline: false,
  videoPlayStatus: false,
  videoDuration: 0,
  videoCurrentTime: 0,
  selectedMenu: 'volume'
})
const duration = computed(() => dateTimeDuration(data.videoDuration))
const current = computed(() => dateTimeDuration(data.videoCurrentTime))

/**
 * ????????????
 */
const generateVideo = () => {
  if (!UserStore.$state.token) {
    // TODO ???????????????????????????
  }
}

// const donationDialog = () => {
//   setTimeout(() => {
//     useDialog.SET_DONATION_VISIBLE_STATUS()
//   }, 3000)
// }

/**
 * ??????????????????
 * @param val
 */
const changeVideoSpeed = (val: number) => {
  player.value.setVideoSpeed(val)
}
/**
 * ??????????????????
 * @param val
 */
const changeVideoVolume = (val: number) => {
  player.value.setVideoVolume(val)
}
/**
 * ???????????????
 * @param mark
 */
const selectMenu = (mark: Selected_Menu) => {
  data.selectedMenu = mark
  player.value.discardObject()
  player.value.disposeCurMarkEvent()
  player.value.disposeTextEvent()
  player.value.videoCutRectSelectable(false)
  player.value.videoCutMarkStatus(false)
  switch (mark) {
  case "cutVideo":
    player.value.videoCutRectSelectable(true)
    break
  case "cutMark":
    player.value.videoCutMarkStatus(true)
    player.value.initCutMarkEvent()
    break
  case "text":
    player.value.initAddText()
  }
}

/**
 * ??????????????????
 */
const broadcastControl = (status: boolean) => {
  data.videoPlayStatus = status
  if (data.videoPlayStatus) {
    player.value.setVideoPlay()
  } else {
    player.value.setVideoPause()
  }
}
/**
 * ????????????????????????
 * @param currentTime
 */
const setCurrentTime = (currentTime: number) => {
  data.videoCurrentTime = currentTime
}
/**
 * ???????????????
 * @param duration
 */
const setDuration = (duration: number) => {
  data.videoDuration = duration
}
/**
 * ??????????????????
 */
const setPlayStatus = (status: boolean) => {
  broadcastControl(status)
}
/**
 * ????????????
 */
const setFrames = (file: Frame) => {
  data.frames.push(file)
}
/**
 * ????????????
 */
const setUrl = (url: string) => {
  data.videoUrl = url
}
/**
 * ????????????????????????
 */
const changeVideoProgress = (time: number) => {
  player.value.setCurrentTime(time)
}
defineExpose({
  setFrames,
  setUrl
})
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
    .video-controls {
      width: 100%;
      height: 100%;
      .controls-menus {
        height: 60px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .video-generate {
          position: absolute;
          right: 50px;
          width: 80px;
          height: 40px;
          border-radius: 20px;
          line-height: 40px;
          text-align: center;
          cursor: pointer;
          font-size: 14px;
          background-color: rgba(255,255,255,.8);
          color: rgba(0,0,0,.6);
          font-family: 'Round-zh',serif;
        }
        .video-generate:hover {
          background-color: rgba(255,255,255,1);
          color: rgba(0,0,0,.8);
        }
        .video-control-menus {
          height: 32px;
          width: 50px;
          cursor: pointer;
          margin: 0 60px;
          box-sizing: border-box;
          border-radius: 5px;
          background-repeat: no-repeat;
          background-size: 20px 20px;
          background-position: center center;
          background-color: rgba(0,0,0,.1);
        }
        .video-control-menus-selected {
          background-color: rgba(0,0,0,.25);
        }
        .video-volume {
          background-image: url("@/assets/svg/video-editor/video-volume.svg");
        }
        .video-volume-selected {
          background-image: url("@/assets/svg/video-editor/video-volume-selected.svg");
        }
        .video-speed {
          background-image: url("@/assets/svg/video-editor/video-speed.svg");
        }
        .video-speed-selected {
          background-image: url("@/assets/svg/video-editor/video-speed-selected.svg");
        }
        .video-cut-mark {
          background-image: url("@/assets/svg/video-editor/video-cut-mark.svg");
        }
        .video-cut-mark-selected {
          background-image: url("@/assets/svg/video-editor/video-cut-mark-selected.svg");
        }
        .video-cut {
          background-image: url("@/assets/svg/video-editor/video-cut.svg");
        }
        .video-cut-selected {
          background-image: url("@/assets/svg/video-editor/video-cut-selected.svg");
        }
        .video-text {
          background-image: url("@/assets/svg/video-editor/video-text.svg");
        }
        .video-text-selected {
          background-image: url("@/assets/svg/video-editor/video-text-selected.svg");
        }
        .video-image {
          background-image: url("@/assets/svg/video-editor/video-image.svg");
        }
        .video-image-selected {
          background-image: url("@/assets/svg/video-editor/video-image-selected.svg");
        }
        .video-voice {
          background-image: url("@/assets/svg/video-editor/video-voice.svg");
        }
        .video-voice-selected {
          background-image: url("@/assets/svg/video-editor/video-voice-selected.svg");
        }
      }
      .video-control-target {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 160px;
        border-radius: 5px;
        background-color: rgba(0,0,0,.25);
      }
    }
  }
}
</style>
