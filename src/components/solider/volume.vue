<template>
  <div class="video-speed">
    <div class="control-container">
      <div class="controls-left controls-target"/>
      <el-slider
          v-model="data.volume"
          :show-tooltip="false"
          @input="inputTarget"
      ></el-slider>
      <div class="controls-target">
        {{data.volume}}
      </div>
      <div class="controls-right controls-target"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElSlider } from 'element-plus'
import 'element-plus/es/components/slider/style/css'
import { reactive, defineProps, onMounted } from "vue";
interface Props {
  changeVolume: (val: number) => void
}
const props = defineProps<Props>()
const data = reactive({
  volume: 50,
})
const inputTarget = (val: number) => {
  props.changeVolume(val)
}
onMounted(() => {
  inputTarget(data.volume)
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
      background-color: rgba(0,0,0,.25);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: 5px;
      margin: 0 20px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      color: #fff;
    }
    .controls-left {
      background-image: url('@/assets/svg/video-editor/control-volume-min.svg');
    }
    .controls-right {
      background-image: url('@/assets/svg/video-editor/control-volume-max.svg');
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
