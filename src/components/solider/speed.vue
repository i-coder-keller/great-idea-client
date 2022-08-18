<template>
  <div class="video-speed">
    <div class="control-container">
      <el-slider
          v-model="data.speed"
          :step="100 / 15"
          :marks="data.marks"
          :show-tooltip="false"
          show-stops
          @input="inputTarget"
      ></el-slider>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElSlider } from 'element-plus'
import 'element-plus/es/components/slider/style/css'
import { reactive, defineProps } from "vue";
interface Props {
  changeSpeed: (val: number) => void
}
const props = defineProps<Props>()
const initSpeed = () => {
  const step = 100 / 15
  const marks: any = {}
  for (let i = 0; i <= 15; i++) {
    marks[`${i * step}`] =`${i + 1}.x`
  }
  return marks
}
const data = reactive({
  speed: 0,
  marks: initSpeed()
})
const inputTarget = (val: number) => {
  props.changeSpeed(Math.ceil(val/ (100 / 15)))
}
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
    justify-content: center;
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
      box-shadow: 0 0 5px rgb(0 0 0 / 50%);
      background-color: #484d68;
      border: 1px solid #484d68;
    }
  }
}
</style>
