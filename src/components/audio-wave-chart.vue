<template>
  <div class="wave-container">
    <div class="wave-ref" ref="waveRef"></div>
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js'
import audioFile from '@/assets/audio/test.mp3'
import { REACTIVE } from "@/components/audio-wave-chart-types";
import { onMounted, reactive, ref, defineExpose } from 'vue'
const waveRef = ref()
const data = reactive<REACTIVE>({
  waveRef: null
})
const play = () => {
  data.waveRef.play()
}
const pause = () => {
  data.waveRef.pause()
}
const initWaveSurfer = () => {
  data.waveRef = WaveSurfer.create({
    container: waveRef.value,
    waveColor: '#636e72',
    progressColor: '#2d3436',
    barHeight: waveRef.value.clientHeight / 8,
    height: waveRef.value.clientHeight
  })
  data.waveRef.load(audioFile)
}
onMounted(() => {
  initWaveSurfer()
})
defineExpose({ play, pause })
</script>
<style lang="less" scoped>
.wave-container {
  width: 100%;
  height: 100%;
  .wave-ref {
    width: 100%;
    height: 100%;
  }
}
</style>
