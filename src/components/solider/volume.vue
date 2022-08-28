<template>
  <div class="video-speed" ref="container">
    <div class="control-container">
      <div class="controls-target">
        <img :src="controlVolumeMin" alt="音量减少" class="controls-left ">
        </div>
      <el-slider
          v-model="data.volume"
          :show-tooltip="false"
          @input="inputTarget"
      ></el-slider>
      <div class="controls-target">
        {{data.volume}}
      </div>
      <div class="controls-target">
        <img :src="controlVolumeMax" alt="音量增加" class="controls-right ">
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElSlider } from 'element-plus'
import 'element-plus/es/components/slider/style/css'
import { reactive, defineProps, onMounted, ref } from "vue";
import controlVolumeMin from '@/assets/svg/video-editor/control-volume-min.svg'
import controlVolumeMax from '@/assets/svg/video-editor/control-volume-max.svg'
const container = ref()
interface Props {
  changeVolume: (val: number) => void
}
const props = defineProps<Props>()
const data = reactive({
  volume: 50,
})
const inputTarget = (val: number) => {
  props.changeVolume(val)
  initOpacity()
}
const initOpacity = () => {
  const opacity = data.volume / 100
  container.value.style.setProperty('--left', 1 - opacity + 0.1)
  container.value.style.setProperty('--right', opacity + 0.1)
}
onMounted(() => {
  inputTarget(data.volume)
  initOpacity()
})
</script>
<style lang="less" scoped>
.video-speed{
  width: 100%;
  height: 100%;
  border-radius: 5px;
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
      background-color: #484d68;
    }
    .el-slider__button {
      box-shadow: 0 0 5px rgb(255 255 255 / 50%);
      background-color: #fff;
      border: 1px solid #fff;
    }
  }
}
</style>
