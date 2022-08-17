<template>
  <div class="video-ref">
    <div class="video-proxy">
      <video class="videoRef" ref="videoRef" @canplaythrough="canplaythrough" @timeupdate="timeUpdate">
        <source :src="videoUrl">
      </video>
    </div>
    <div class="canvas-proxy">
      <canvas ref="canvasRef" id="canvasRef"></canvas>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, ref, reactive, watch, defineExpose, nextTick} from "vue"
import { fabric } from "fabric"
const videoRef = ref()
const canvasRef = ref()
interface Props {
  videoUrl: string;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
}
interface Reactive {
 n: number;
 canvas: fabric.Canvas | null;
 rect: fabric.Rect | null;
 cWidth: number;
 cHeight: number;
}
const data = reactive<Reactive>({
  n: 1,
  canvas: null,
  cWidth: 0,
  cHeight: 0,
  rect: null
})
const props = defineProps<Props>()
const init = () => {
  data.n = Math.random()
}
/**
 * 初始化
 */
const initFabric = () => {
  data.canvas = new fabric.Canvas('canvasRef')
  data.rect = new fabric.Rect({
    type: 'rect',
    cornerSize: 10,
    borderColor: '#0984e3',
    cornerStyle: 'circle',
    cornerColor: '#55efc4',
    hasControls: true,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    left: 5,
    top: 5,
    width: videoRef.value.clientWidth - 1,
    height: videoRef.value.clientHeight - 1,
    fill: 'rgba(255, 255, 255, 0)',
    minScaleLimit: 0.1
  }) as fabric.Rect
  data.rect.setControlsVisibility({
    mtr: false
  })
  data.canvas.add(data.rect)
  data.canvas.setActiveObject(data.rect)
}

/**
 * 视频加载完毕
 */
const canplaythrough = () => {
  props.setDuration(videoRef.value.duration)
  canvasRef.value.width = videoRef.value.clientWidth + 10
  canvasRef.value.height = videoRef.value.clientHeight + 10
  initFabric()
}
/**
 * 播放器时间更新
 */
const timeUpdate = () => {
  props.setCurrentTime(videoRef.value.currentTime)
}
/**
 * 设置视频当前播放进度
 * @param currentTime
 */
const setCurrentTime = (currentTime: number) => {
  videoRef.value.currentTime = currentTime
}
/**
 * 播放器视频
 */
const setVideoPlay = () => {
  videoRef.value.play()
}
/**
 * 暂停视频
 */
const setVideoPause = () => {
  videoRef.value.pause()
}
defineExpose({setVideoPause, setVideoPlay, setCurrentTime})
</script>
<style lang="less" scoped>
.video-ref {
  width: 100%;
  height: 100%;
  position: relative;
  .video-proxy {
    height: calc(100% - 10px);
    position: absolute;
    width: auto;
    left: 50%;
    top: 5px;
    transform: translateX(-50%);
    .videoRef {
      height: 100%;
      width: auto;
    }
  }
  .canvas-proxy {
    height: 100%;
    width: 800px;
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
