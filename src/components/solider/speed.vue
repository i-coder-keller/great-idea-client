<template>
  <div class="video-speed" ref="container">
    <div class="control-container">
      <div class="controls-target">
        <img :src="controlSpeedMin" alt="倍速减少" class="controls-left ">
        </div>
      <el-slider
          v-model="data.value"
          :show-tooltip="false"
          @input="inputTarget"
          @change="changeTarget"
      ></el-slider>
      <div class="controls-target">
        {{data.speed}}x
      </div>
      <div class="controls-target">
        <img :src="controlSpeedMax" alt="倍速增加" class="controls-right ">
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElSlider } from 'element-plus'
import 'element-plus/es/components/slider/style/css'
import { reactive, defineProps, onMounted, ref } from "vue";
import controlSpeedMin from '@/assets/svg/video-editor/control-speed-min.svg'
import controlSpeedMax from '@/assets/svg/video-editor/control-speed-max.svg'
const container = ref()
interface Props {
  changeSpeed: (val: number) => void
}
const props = defineProps<Props>()
const data = reactive({
  value: 20,
  speed: 1,
})
const inputTarget = () => {
  initOpacity()
}
const changeTarget = () => {
  props.changeSpeed(data.speed)
}
const initOpacity = () => {
  if (data.value === 20) {
    container.value.style.setProperty('--left', '.1')
    container.value.style.setProperty('--right', '.1')
    container.value.style.setProperty('--sliderBarWidth', '0')
    container.value.style.setProperty('--sliderBarLeft', '20%')
    data.speed = 1
  } else if (data.value < 20) {
    const poor = Math.abs(data.value - 20)
    const val = 1 - Number((poor / 20).toFixed(2))
    data.speed = Number((val * 0.75 + 0.25).toFixed(2))
    container.value.style.setProperty('--sliderBarColor', '#c9e2fb')
    container.value.style.setProperty('--sliderBarWidth', `${poor}%`)
    container.value.style.setProperty('--sliderBarLeft', `${Math.abs(poor - 20)}%`)
    container.value.style.setProperty('--right', '.1')
    container.value.style.setProperty('--left', `${ 1 - val}`)
  } else if (data.value > 20) {
    const poor = Number(((data.value - 20) / 80).toFixed(2))
    data.speed = Number((poor * 7 + 1).toFixed(2))
    container.value.style.setProperty('--sliderBarColor', '#eb2f06')
    container.value.style.setProperty('--sliderBarWidth', `${data.value - 20}%`)
    container.value.style.setProperty('--sliderBarLeft', '20%')
    container.value.style.setProperty('--left', '.1')
    container.value.style.setProperty('--right', `${poor}`)
  }
}
onMounted(() => {
  inputTarget(data.value)
  initOpacity()
})
</script>
<style lang="less" scoped>
.video-speed{
  width: 100%;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(0,0,0,.25);
  display: flex;
  align-items: center;
  justify-content: center;
  .control-container {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .controls-target {
      width: 60px;
      height: 30px;
      border-radius: 5px;
      margin: 0 20px;
      line-height: 30px;
      font-size: 12px;
      background-color: rgba(0,0,0,.25);
      text-align: center;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .controls-left {
      opacity: var(--left);
    }
    .controls-right {
      opacity: var(--right);
    }
  }
  :deep(.el-slider) {
    .el-slider__runway {
      background-color: #484d68;
      .el-slider__stop {
        background-color: #484d68;
      }
    }
    .el-slider__bar {
      background-color: var(--sliderBarColor);
      width: var(--sliderBarWidth) !important;
      left: var(--sliderBarLeft) !important;
      border-radius: unset;
    }
    .el-slider__button {
      box-shadow: 0 0 5px rgb(255 255 255 / 50%);
      background-color: #fff;
      border: 1px solid #fff;
    }
  }
}
</style>
