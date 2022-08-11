<template>
  <div class="wave-container">
    <div class="wave-ref" id="wave-ref"></div>
    <div id="wave-timeline" ref="wave-timeline"></div>
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js'
import audioFile from '@/assets/audio/test.mp3'
import { REACTIVE } from "@/components/audio-wave-chart-types";
import { onMounted, reactive } from 'vue'
const data = reactive<REACTIVE>({
  waveRef: null
})
const initWaveSurfer = () => {
  const parent = document.querySelector('#wave-ref') as Element
  data.waveRef = WaveSurfer.create({
    container: '#wave-ref',
    waveColor: '#636e72',
    progressColor: '#2d3436',
    barHeight: parent.clientHeight / 8,
    height: parent.clientHeight,
    plugins: [
    ]
  })
  data.waveRef.load(audioFile)
}
onMounted(() => {
  initWaveSurfer()
})
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
