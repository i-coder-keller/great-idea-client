<template>
  <div class="time-line-container">
    <div class="time-calibration-container">
      <div class="frame-item" v-for="(item, index) in props.frames" :key="index">
        <div class="frame-time">{{dateTimeLineFormat(item.s)}}</div>
        <div class="timeLine">
          <div />
          <div class="line" />
          <div class="line" />
          <div class="line" />
          <div class="line" />
          <div class="line" />
          <div />
        </div>
        <img :src="item.image" height="50" class="frame-image">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps } from "vue"
import { Frame, dateTimeLineFormat } from "@/utils";

interface Props {
  frames: Frame[];
}
const props = defineProps<Props>()

</script>
<style lang="less" scoped>
.time-line-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
  .time-calibration-container {
    width: auto;
    height: 85px;
    padding: 20px 15px 0;
    box-sizing: border-box;
    display: flex;
    position: absolute;
    left: 0;
    .frame-item:hover .frame-time {
      color: hsla(0,0%,100%,1);
    }
    .frame-item:hover {
      cursor: pointer;
    }
    .frame-item {
      width: auto;
      height: 85px;
      position: relative;
      .frame-time {
        height: 12px;
        position: absolute;
        z-index: 2000;
        color: hsla(0,0%,100%,.5);
        font-size: 12px;
        top: -15px;
        transform: translateX(-50%);
      }
      .frame-image {
        margin-top: 5px;
        border-left: 1px solid hsl(0deg 0% 100% / 50%);
      }
      .timeLine {
        display: flex;
        justify-content: space-between;
        height: 10px;
        border-left: 1px solid hsl(0deg 0% 100% / 50%);
        .line {
          height: 5px;
          border-left: 1px solid hsl(0deg 0% 100% / 50%);
        }
      }
    }
  }
}
</style>
