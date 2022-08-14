<template>
  <div class="time-line-container">
    <div class="time-calibration-container" id="container"></div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps, onMounted, reactive, watch} from "vue"
import { Timeline, DataSet } from "vis-timeline/standalone"
interface Props {
  duration: number;
  frameTime: number;
  frames: string[];
}
interface REACTIVE {
  timelineRef: any
}
const props = defineProps<Props>()
const data = reactive<REACTIVE>({
  timelineRef: null
})
onMounted(() => {
  initTimeLine()
})
watch(props.frames, (np: string[]) => {
  const times = np.map((src, index) => {
    return {
      id: index,
      content: `<img src="${src}" height="50">`,
      start: index * 12,
      end: index * 12 + 12,
      selectable: false,
      type: 'background',
      editable: false
    }
  })
  const items = new DataSet(times)
  data.timelineRef.setItems(items)
})
const initTimes = () => {
  const times = []
  for (let s = 1; s <= props.duration; s += props.frameTime){
    times.push(s)
  }
  return times
}
const initTimeLine = () => {
  const container = document.querySelector('#container') as HTMLElement
  const times = initTimes().map((time, index) => {
    return {
      id: index,
      content: `<img src="${props.frames[index]}" height="50">`,
      start: time,
      end: time + 12,
      selectable: false,
      type: 'background',
      editable: false
    }
  })
  const items = new DataSet(times)
  data.timelineRef = new Timeline(container,items, {
    width: '100%',
    height: '60px',
    autoResize: false,
    locale: 'en_US',
    moveable: false,
    selectable: false
  })
}
</script>
<style lang="less" scoped>
.time-line-container {
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  .time-calibration-container {

  }
}
</style>
