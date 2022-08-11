<template>
  <div class="main-container">
    <div class="content-top">
      <div class="canvas-root"></div>
      <div class="operating-area"></div>
    </div>
    <div class="content-bottom">
      <div class="audio-container">
        <i class="icon-bgm iconfont fontSize" />
        <div class="wave-chart">
          <AudioWaveChart />
        </div>
      </div>
      <div class="frame-container"></div>
      <div class="audio-container">
        <i class="icon-voice iconfont fontSize" />
        <div class="wave-chart">
        </div>
      </div>
    </div>
    <FilesDialog />
  </div>
</template>
<script lang="ts" setup>
import AudioWaveChart from '@/components/audio-wave-chart'
import FilesDialog from './components/fileDialog'

</script>
<style lang="less" scoped>
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
    .frame-container {
      height: 100px;
      width: 100%;
    }
    .audio-container {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      display: flex;
      margin: 10px 0;
      .fontSize {
        font-size: 50px;
        margin-right: 10px;
      }
      .wave-chart {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
