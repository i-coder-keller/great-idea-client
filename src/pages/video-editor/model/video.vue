<template>
  <div class="video-ref">
    <div class="video-proxy">
      <video
        class="videoRef"
        ref="videoRef"
        @canplaythrough="canplaythrough"
        @timeupdate="timeUpdate"
      >
        <source :src="videoUrl" />
      </video>
    </div>
    <div class="canvas-proxy">
      <canvas ref="canvasRef" id="canvasRef"></canvas>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, reactive, watch, defineExpose, nextTick } from "vue";
import { fabric } from "fabric";
const videoRef = ref();
const canvasRef = ref();
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
  rect: null,
});
const props = defineProps<Props>();
/**
 * 初始化
 */
const initFabric = () => {
  data.canvas = new fabric.Canvas("canvasRef");
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
    minScaleLimit: 0.1
  }) as fabric.Rect;
  data.rect.setControlsVisibility({
    mtr: false,
  });
  data.canvas.add(data.rect);
  data.canvas.setActiveObject(data.rect);
  initCanvasEvent()
}

/**
 * 初始化画布事件
 */
const initCanvasEvent = () => {
  const target = data.canvas as fabric.Canvas
  target.on("object:moving", e => displayMoveArea(e));
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
 * 视频加载完毕
 */
const canplaythrough = () => {
  props.setDuration(videoRef.value.duration);
  canvasRef.value.width = videoRef.value.clientWidth + 10;
  canvasRef.value.height = videoRef.value.clientHeight + 10;
  initFabric();
};
/**
 * 播放器时间更新
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
};
/**
 * 播放器视频
 */
const setVideoPlay = () => {
  videoRef.value.play();
};
/**
 * 暂停视频
 */
const setVideoPause = () => {
  videoRef.value.pause();
};
defineExpose({ setVideoPause, setVideoPlay, setCurrentTime });
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
