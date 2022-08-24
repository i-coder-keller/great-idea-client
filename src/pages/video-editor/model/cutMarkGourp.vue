<template>
  <div class="button-group">
    <div class="button-container">
      <div class="button-target button-add-mark">添 加</div>
      <div class="button-target button-remove-mark">删 除</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { defineProps } from "vue"
// interface Props {
//   addRemoveMarkRect: () => void;
//   deleteRemoveMarkRect: () => void;
// }
// defineProps<Props>()
</script>
<style lang="less" scoped>
.button-group {
  width: 100%;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(0,0,0,.25);
  display: flex;
  align-items: center;
  justify-content: center;
  .button-container {
    width: 500px;
    display: flex;
    justify-content: space-between;
    height: auto;
    .button-target {
      width: 80px;
      height: 40px;
      border-radius: 20px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
    .button-remove-mark {
      color: rgba(255, 0, 0, .6);
      background-color: rgba(0,0,0,.25);
      transition: all 0.2s ease-in-out;
    }
    .button-remove-mark:hover {
      color: rgba(255, 0, 0, .8);
      background-color: rgba(0,0,0,.15);
    }
    .button-add-mark {
      color: rgba(0, 0, 0, .8);
      background-color: rgba(255, 255, 255, .8);
      transition: all 0.2s ease-in-out;
    }
    .button-add-mark:hover {
      color: rgba(0, 0, 0, 1);
      background-color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
