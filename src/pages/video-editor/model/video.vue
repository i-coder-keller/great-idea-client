<template>
  <div class="video-ref" ref="videoRef"></div>
</template>
<script lang="ts" setup>
import * as Pixi from 'pixi.js'
import { defineProps, ref, reactive, watch, defineExpose} from "vue"
const videoRef = ref()
interface Props {
  videoUrl: string;
  duration: number;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
}
interface Reactive {
  stage: any; // 舞台
  renderer: any; // 渲染器
  videoTexture: any; // 视频纹理
  videoSprite: any; // 视频精灵
  videoSource: any; // 视频元素
  app: any; // 画布实力
}
const data = reactive<Reactive>({
  stage: null,
  renderer: null,
  videoTexture: null,
  videoSprite: null,
  videoSource: null,
  app: null
})
const props = defineProps<Props>()
const init = () => {
  data.app = new Pixi.Application({
    width: videoRef.value.clientWidth,
    height: videoRef.value.clientHeight,
    antialias: true
  })
  videoRef.value.appendChild(data.app.view)
  data.stage = data.app.stage
  data.renderer = data.app.renderer
  loadVideo()
}
/**
 * 加载视频
 */
const loadVideo = () => {
  const video = document.createElement('video')
  video.setAttribute('src', props.videoUrl)
  data.videoTexture = Pixi.Texture.from(video)
  data.videoSprite = new Pixi.Sprite(data.videoTexture)
  data.videoSprite.width = videoRef.value.clientWidth
  data.videoSprite.height = videoRef.value.clientHeight
  data.videoSource = data.videoTexture.baseTexture.resource.source
  data.videoSource.addEventListener('timeupdate', () => {
    props.setCurrentTime(data.videoSource.currentTime)
  })
  data.videoSource.addEventListener('canplaythrough', () => {
    props.setDuration(data.videoSource.duration)
    data.videoSource.pause()
  })
  data.stage.addChild(data.videoSprite)
}
/**
 * 设置视频当前播放进度
 * @param currentTime
 */
const setCurrentTime = (currentTime: number) => {
  data.videoSource.currentTime = currentTime
}
/**
 * 播放器视频
 */
const setVideoPlay = () => {
  data.videoSource.play()
}
/**
 * 暂停视频
 */
const setVideoPause = () => {
  data.videoSource.pause()
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
}
</style>
