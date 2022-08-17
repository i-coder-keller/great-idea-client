<template>
  <div class="video-ref">
    <div class="video-proxy">
      <video
        class="video-player"
        ref="videoRef"
        :src="props.videoUrl"
        @canplaythrough="canplaythrough"
        @timeupdate="timeUpdate"
        :key="data.n"
      ></video>
      <div class="canvas-proxy">
        <canvas id="canvasRef" ref="canvasRef"></canvas>
      </div>
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
 rect: fabric.rect | null;
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
  data.canvas.backgroundColor = 'rgba(34, 47, 62,.3)'
  data.rect = new fabric.Rect({
    type: 'rect',
    cornerSize: 10,
    borderColor: '#0abde3',
    cornerStyle: 'circle',
    selectable: true,
    hasControls: true,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    selectionBackgroundColor: 'rgba(255, 255, 255, 0)',
    left: 0,
    top: 0,
    width: videoRef.value.clientWidth,
    height: videoRef.value.clientHeight,
    fill: 'rgba(255, 255, 255, 0)'
  })
  nextTick(() => {
    data.rect.setControlsVisibility({
      mtr: false
    })
  })
  data.canvas.add(data.rect)
  data.canvas.setActiveObject(data.rect)
  data.canvas.on('object:moving', (evt: fabric.IEvent) => disableMover(evt))
  data.canvas.on('object:scaling', (evt: fabric.IEvent) => disableScale(evt))
}
const disableMover = (evt: fabric.IEvent) => {
  const obj = evt.target as any
  if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
    return
  }
  obj.setCoords()
  if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
    obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top)
    obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left)
  }
  if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
    obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top)
    obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left)
  }
}

const disableScale = (evt: any) => {
  // TODO
}
/**
 * 视频加载完毕
 */
const canplaythrough = () => {
  props.setDuration(videoRef.value.duration)
  canvasRef.value.width = videoRef.value.clientWidth + 1
  canvasRef.value.height = videoRef.value.clientHeight
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
watch(() => props.videoUrl, () => {
  init()
})
defineExpose({setVideoPause, setVideoPlay, setCurrentTime})
</script>
<style lang="less" scoped>
.video-ref {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .video-proxy {
    height: 100%;
    width: auto;
    position: relative;
    .canvas-proxy {
      width: auto;
      height: 100%;
      position: absolute;
      z-index: 2000;
      left: 50%;
      top: 0;
      transform: translate(-50%);
    }
    .video-player {
      height: 100%;
    }
  }
}
</style>
