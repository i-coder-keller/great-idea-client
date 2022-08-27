<template>
  <div class="video-ref">
    <div class="video-proxy">
      <video
          class="videoRef"
          ref="videoRef"
          @canplaythrough="canplaythrough"
          @ended="endedOrPause"
          @play="startPlay"
      >
        <source :src="videoUrl">
      </video>
    </div>
    <div class="canvas-proxy">
      <canvas ref="canvasRef" id="canvasRef"></canvas>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, reactive, defineExpose, nextTick, onBeforeUnmount } from "vue";
import { fabric } from "fabric"
import { factoryRect } from "@/utils/fabricUtils"
import { Selected_Menu } from "./Menus"

const videoRef = ref();
const canvasRef = ref();
interface Props {
  videoUrl: string;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  setPlayStatus: (status: boolean) => void;
}
interface Reactive {
 n: number;
 canvas: fabric.Canvas | null;
 rect: fabric.Rect | null;
 cWidth: number;
 cHeight: number;
 timeUpdateTimer: any;
 removeMarkRect: fabric.Rect[];
 pointer: PointerPosition;
}
interface PointerPosition {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
const data = reactive<Reactive>({
  n: 1,
  canvas: null,
  cWidth: 0,
  cHeight: 0,
  rect: null,
  timeUpdateTimer: null,
  removeMarkRect: [],
  pointer: {
    startY: 0,
    startX: 0,
    endX: 0,
    endY: 0
  },
})
const props = defineProps<Props>()
onBeforeUnmount(() => {
  disposeWindowEvent()
})


/**
 * 初始化剪裁框
 */
const initFabric = () => {
  data.canvas = new fabric.Canvas("canvasRef", {
    preserveObjectStacking: true
  });
  data.rect = new fabric.Rect({
    type: "rect",
    cornerSize: 10,
    borderColor: "#0984e3",
    cornerStyle: "circle",
    cornerColor: "#55efc4",
    hasControls: true,
    backgroundColor: "rgba(255, 255, 255, 0)",
    left: 5,
    top: 5,
    width: videoRef.value.clientWidth - 1,
    height: videoRef.value.clientHeight - 1,
    fill: "rgba(255, 255, 255, 0)",
    lockScalingFlip: true,
    stroke: '#0984e3',
    strokeWidth: 1,
    minScaleLimit: 0.1
  })
  data.rect.setControlsVisibility({
    mtr: false,
    bl: false,
    tl: false,
    mt: false,
    ml: false,
    tr: false
  });
  data.canvas.add(data.rect);
  data.canvas.setActiveObject(data.rect);
  initCanvasEvent()
}
/**
 * 初始化全局事件
 */
const initWindowEvent = () => {
  window.addEventListener('keydown', initDrawRemoveMarkRect)
  window.addEventListener('keyup', disposeDrawRemoveMarkRect)
}
const initDrawRemoveMarkRect = (e: { shiftKey: any }) => {
  if (e.shiftKey) {
    mouseCreateRemoveMark()
  }
}
const disposeDrawRemoveMarkRect = (e: { key: string; }) => {
  if (e.key === 'Shift') {
    data.canvas.off("mouse:up", mouseUpCreateFabricRect)
  }
}
const disposeWindowEvent = () => {
  window.removeEventListener('keydown', initDrawRemoveMarkRect)
  window.removeEventListener('keyup', disposeDrawRemoveMarkRect)
}
/**
 * 初始化画布事件
 */
const initCanvasEvent = () => {
  const target = data.canvas as fabric.Canvas
  target.on("object:moving", e => displayMoveArea(e))
  // target.on("object:scaling",e => displayScalingArea(e))
}

/**
 * 允许鼠标拖拽创建去水印框
 */
const mouseCreateRemoveMark = () => {
  data.pointer = {
    startY: 0,
    startX: 0,
    endX: 0,
    endY: 0
  }
  const target = data.canvas
  target.on("mouse:down", function ({ pointer: downPointer}) {
    data.pointer.startY = downPointer.y
    data.pointer.startX = downPointer.x
    target.on("mouse:move", function ({ pointer: endPointer }) {
      data.pointer.endY = endPointer.y
      data.pointer.endX = endPointer.x
    })
  })
  target.on("mouse:up", mouseUpCreateFabricRect)
}

/**
 * 创建矩形
 */
const mouseUpCreateFabricRect = () => {
  const markRect = ref(factoryRect({
    left: data.pointer.startX,
    top: data.pointer.startY,
    width: data.pointer.endX - data.pointer.startX,
    height: data.pointer.endY - data.pointer.startY,
    backgroundColor: "rgba(0, 0, 0, .3)",
    cornerColor: "#55efc4",
    borderColor: "#0984e3",
    fill: "rgba(255, 255, 255, 0)"
  }))
  markRect.value.setControlsVisibility({
    mtr: false,
    tl: false,
    tr: false,
    bl: false
  });
  markRect.value.bringToFront()
  data.removeMarkRect.push(markRect.value)
  data.canvas.add(markRect.value)
}
/**
 * 限制剪裁框缩放超出
 * @param e
 */
const displayScalingArea = (e: any) => {
  const padding = 5
  const target = e.target
  target.setCoords()
  const { left, top, height, width } = target.getBoundingRect()
  const {width: canvasWidth, height: canvasHeight} = target.canvas
  const targetX = left + width
  const targetY = top + height
  const maxX = canvasWidth - padding
  const maxY = canvasHeight - padding
  if (targetX > maxX || targetY > maxY) {
    target.scaleY = Math.min(1, width/(canvasWidth - padding * 2) )
    target.scaleX = Math.min(1, height/(canvasHeight - padding * 2) )
  }
}


/**
 * 限制剪裁拖动区域
 * @param e
 */
const displayMoveArea = (e: any) => {
  const padding = 5
  const target = e.target
  target.setCoords()
  const { left, top, height, width } = target.getBoundingRect()
  const {width: canvasWidth, height: canvasHeight} = target.canvas
  const cWidth = canvasWidth - padding
  const cHeight = canvasHeight - padding
  if (left < padding || top < padding ) {
    target.left = Math.max(target.left, padding)
    target.top = Math.max(target.top, padding)
  }
  if (
    (top + height > cHeight - padding) ||
      (left + width > cWidth - padding)
  ) {
    target.top = Math.min(target.top, cHeight - height + target.top - top)
    target.left = Math.min(target.left, cWidth - width + target.left - left)
  }
}

/**
 * 视频裁剪框禁止选中
 */
const videoCutRectSelectable = (status: boolean) => {
  data.rect.set('selectable', status)
}
/**
 * 丢弃所有选中对象
 */
const discardObject = () => {
  data.canvas.discardActiveObject().renderAll()
}
/**
 * 视频播放完成或暂停
 */
const endedOrPause = () => {
  clearInterval(data.timeUpdateTimer)
  props.setPlayStatus(!videoRef.value.ended)
}
/**
 * 视频开始播放
 */
const startPlay = () => {
  data.timeUpdateTimer = setInterval(() => {
    timeUpdate()
  })
}
/**
 * 视频加载完毕
 */
const canplaythrough = () => {
  props.setDuration(videoRef.value.duration);
  canvasRef.value.width = videoRef.value.clientWidth + 10;
  canvasRef.value.height = videoRef.value.clientHeight + 10;
  initFabric();
};
/**
 * 更新当前播放器时间
 */
const timeUpdate = () => {
  props.setCurrentTime(videoRef.value.currentTime);
};
/**
 * 设置视频当前播放进度
 * @param currentTime
 */
const setCurrentTime = (currentTime: number) => {
  videoRef.value.currentTime = currentTime;
  clearInterval(data.timeUpdateTimer)
  nextTick(() => {
    startPlay()
  })
};
/**
 * 播放视频
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
/**
 * 设置音量
 */
const setVideoVolume = (volume: number) => {
  videoRef.value.volume = volume / 100
}
/**
 * 设置倍速
 */
const setVideoSpeed = (speed: number) => {
  videoRef.value.playbackRate = speed
}

defineExpose({
  setVideoPause,
  setVideoPlay,
  setCurrentTime,
  setVideoVolume,
  setVideoSpeed,
  videoCutRectSelectable,
  initWindowEvent,
  disposeWindowEvent,
  discardObject
})
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
