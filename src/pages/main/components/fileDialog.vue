<template>
  <Dialog :visible="useMain.dialogVisible" :mask-close="true">
    <header class="files-title">文件详情</header>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from '@/components/dialog'
import { useMainStore } from "@/store";
const useMain = useMainStore()
</script>
<style lang="less" scoped>
  .files-title {
    width: 100%;
    height: auto;
    font-size: 26px;
    font-weight: 500;
  }
</style>
