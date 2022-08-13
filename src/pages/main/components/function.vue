<template>
  <div class="function-container">
    <div class="icon"></div>
    <div class="title">Video Editor</div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
.function-container {
  min-width: 175px;
  width: 100%;
  background-color: #f7f9fa;
  cursor: pointer;
  height: 200px;
  border-radius: 10%;
  padding: 20px;
  box-sizing: border-box;
  .icon {
    width: 100%;
    height: 60%;
    background-image: var(--icon);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .title {
    line-height: 64px;
    height: 40%;
    width: 100%;
    text-align: center;
    font-size: 15px;
    white-space: pre-line;
    font-weight: 600;
  }
}
.function-container:hover {
  background-color: #ffdf00;
}
</style>
