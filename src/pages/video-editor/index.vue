<template>
  <div class="video-function-container" ref="view">
    <transition name="slide">
      <SelectFile :change-file="changeFile" v-if="!data.showWorks"/>
      <VideoWork v-else ref="videoWork"/>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import SelectFile from './model/selectvideo'
import VideoWork from './model/videoWork.vue'
import {UploadFile} from "element-plus";
import {Frame, generateFrame} from "@/utils";
import {reactive, ref, nextTick, onMounted} from "vue";
import videoAssets from '@/assets/video/test.mp4'
const videoWork = ref()
const view = ref()
interface Reactive {
  videoUrl: string;
  frames: Frame[];
  showWorks: boolean;
}
const data = reactive<Reactive>({
  videoUrl: '',
  frames: [],
  showWorks: true
})
onMounted(() => {
  changeFile()
})
const changeFile = () => {
// const changeFile = (file: UploadFile) => {
  data.showWorks = true
  // data.videoUrl = URL.createObjectURL(file.raw as File)
  data.videoUrl = videoAssets
  const video = document.createElement('video')
  video.setAttribute('src', data.videoUrl)
  nextTick(() => {
    videoWork.value.setUrl(data.videoUrl)
  })
  video.onloadedmetadata = async () => {
    const image = await generateFrame(data.videoUrl, 1)
    const img = new Image()
    img.src = image.image
    img.onload = oImg => {
      const poor = (50 / img.height).toFixed(3)
      const width = Number((img.width * Number(poor)).toFixed(2))
      const n = Math.floor((view.value.clientWidth - 70) / width)
      frameList(video.duration / n)
    }

    const frameList = async(n: number) => {
      for (let s = 1; s<= video.duration; s += n) {
        const image = await generateFrame(data.videoUrl, s)
        await nextTick(() => {
          videoWork.value.setFrames(image)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "@/layout/router-animate";
.video-function-container {
  width: 100%;
  height: 100%;
  background-color: #576574;
}
</style>
