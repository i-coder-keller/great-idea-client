<template>
  <div class="main-container">
    <div class="content-top">
      <div class="canvas-root"></div>
      <div class="operating-area"></div>
    </div>
    <div class="content-bottom">
      <div class="audio-container">
        <div
             :class="{
              'audio-header-icon':true,
              'rotate': data.musicPlaying,
              'play': !data.musicPlaying,
              'pause': data.musicPlaying,
            }"
             @click="changeMusicPlayStatus"
        />
        <div class="wave-chart">
          <AudioWaveChart class="music-ref" ref="musicRef" />
        </div>
        <div class="function-footer-upload"></div>
      </div>
      <div class="audio-container">
        <div
             :class="{
              'audio-header-icon':true,
              'rotate': data.voicePlaying,
              'play': !data.voicePlaying,
              'pause': data.voicePlaying,
            }"
             @click="changeVoicePlayStatus"
        />
        <div class="wave-chart">
          <AudioWaveChart class="voice-ref" ref="voiceRef" />
        </div>
        <div class="function-footer-upload"></div>
      </div>
      <div class="frame-container">
        <div
            :class="{
              'frame-head-icon':true,
              'rotate': data.videoPlaying,
              'play': !data.videoPlaying,
              'pause': data.videoPlaying,
            }"
            @click="changeVideoPlayStatus"
        >
        </div>
        <div class="frame-image"></div>
        <div class="function-footer-upload"></div>
      </div>
    </div>
    <FilesDialog />
  </div>
</template>
<script lang="ts" setup>
import AudioWaveChart from '@/components/audio-wave-chart'
import FilesDialog from './components/fileDialog'
import { reactive, ref } from 'vue'
const musicRef = ref()
const voiceRef = ref()
const data = reactive({
  videoPlaying: false,
  musicPlaying: false,
  voicePlaying: false,
})
const changeVideoPlayStatus = () => {
  data.videoPlaying = !data.videoPlaying
}
const changeMusicPlayStatus = () => {
  data.musicPlaying = !data.musicPlaying
  if (data.musicPlaying) {
    musicRef.value.play()
  } else {
    musicRef.value.pause()
  }
}
const changeVoicePlayStatus = () => {
  data.voicePlaying = !data.voicePlaying
  if(data.voicePlaying) {
    voiceRef.value.play()
  } else {
    voiceRef.value.pause()
  }
}
</script>
<style lang="less" scoped>
@import './animate';
.main-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .content-top {
    width: 100%;
    height: 50%;
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
    .operating-area, .canvas-root {
      width: calc(50% - 5px);
      height: 100%;
    }
    .canvas-root {
      background-color: black;
    }
    .operating-area {
      background-color: royalblue;
    }
  }
  .content-bottom {
    width: 100%;
    height: calc(50% - 10px);
    margin-top: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .function-footer-upload {
      width: 80px;
      height: 80px;
      cursor: pointer;
      box-sizing: border-box;
      background: url("@/assets/svg/upload.svg") no-repeat center center;
      background-size: 50px 50px;
    }
    .frame-container {
      height: 80px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .frame-head-icon {
        width: 60px;
        height: 60px;
        margin: 10px;
        box-sizing: border-box;
        position: relative;
        border-radius: 50%;
      }
      .frame-head-icon:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background: url("@/assets/svg/video-background.svg") no-repeat center center;
        background-size: 60px 60px;
        transform-origin: center;
      }
      .frame-head-icon:after {
        content: '';
        position: absolute;
        z-index: 2;
        width: 35px;
        height: 35px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .play:after {
        background: url("@/assets/svg/play-white.svg");
        background-size: 100% 100%;
      }
      .pause:after {
        background: url("@/assets/svg/pause-white.svg");
        background-size: 100% 100%;
      }
      .rotate:before{
        animation: rotate 3s linear infinite;
      }

      .frame-image {
        height: 100%;
        flex: 1;
        box-sizing: border-box;
        border: 1px solid firebrick;
      }
    }
    .audio-container {
      width: 100%;
      height: 80px;
      box-sizing: border-box;
      display: flex;
      .audio-header-icon {
        width: 60px;
        height: 60px;
        margin: 10px;
        box-sizing: border-box;
        position: relative;
        border-radius: 50%;
      }
      .audio-header-icon:before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background: url("@/assets/svg/music-background.svg") no-repeat center center;
        background-size: 60px 60px;
        transform-origin: center;
      }
      .audio-header-icon:after {
        content: '';
        position: absolute;
        z-index: 2;
        width: 35px;
        height: 35px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .play:after {
        background: url("@/assets/svg/play-black.svg");
        background-size: 100% 100%;
      }
      .pause:after {
        background: url("@/assets/svg/pause-black.svg");
        background-size: 100% 100%;
      }
      .rotate:before{
        animation: rotate 3s linear infinite;
      }
      .wave-chart {
        height: 100%;
        flex: 1;
      }
    }
  }
}
</style>
