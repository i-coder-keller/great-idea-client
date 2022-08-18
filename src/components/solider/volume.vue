<template>
  <div class="video-speed">
    <div class="control-container">
      <el-slider
          v-model="data.volume"
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
  changeVolume: (val: number) => void
}
const props = defineProps<Props>()
const data = reactive({
  volume: 0,
})
const inputTarget = (val: number) => {
  props.changeVolume(val)
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
