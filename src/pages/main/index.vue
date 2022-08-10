<template>
  <div class="main-container">
    <div class="content-top">
      <div class="canvas-root"></div>
      <div class="operating-area"></div>
    </div>
    <div class="content-bottom">
      <div class="background-audio">
        <div class="title">背景音乐:</div>
        <div class="wave-chart">
          <AudioWaveChart />
        </div>
      </div>
      <div class="background-audio">
        <div class="title">配音:</div>
        <div class="wave-chart">
          <AudioWaveChart />
        </div>
      </div>
      <div class="background-audio">
        <div class="title">配音:</div>
        <div class="wave-chart">
          <AudioWaveChart />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AudioWaveChart from '@/components/audio-wave-chart'
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
    background-color: black;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .background-audio {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      flex: 1;
      .title {
        width: auto;
        height: 100%;
        color: #FFFFFF;
        font-size: 25px;
        display: flex;
        align-items: center;
      }
      .wave-chart {
        flex: 1;
        height: 100%;
      }
    }
  }
}
</style>
