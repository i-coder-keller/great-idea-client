<template>
  <div class="layout-container">
    <div class="layout-header">
      <LayoutHeader />
    </div>
    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LayoutHeader from './layout-header'
</script>
<style lang="less" scoped>
  .layout-container {
    max-width: 1440px;
    min-width: 1000px;
    margin: 0 auto;
    height: 100%;
    background-color: rgba(255, 255, 255,1.0);
    .layout-header {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      background-color: #000;
    }
    .layout-content {
      width: 100%;
      height: calc(100% - 70px);
      background-color: rgba(241, 242, 246,1.0);
      padding: 10px;
      box-sizing: border-box;
    }
  }
</style>
