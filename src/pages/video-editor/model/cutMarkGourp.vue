<template>
  <div class="button-group">
    <div class="button-container">
      请按下 <span>Shift</span> 键使用鼠标左键标注
    </div>
  </div>
</template>
<script lang="ts" setup>
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
    height: auto;
    text-align: center;
    font-size: 32px;
    color: rgba(0, 0, 0, .3);
    user-select: none;
    font-family: 'Round-zh',serif;
    span {
      color: rgba(0, 168, 255,.5);
    }
  }
}
</style>
