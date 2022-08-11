<template>
  <Dialog :visible="useMain.dialogVisible" :mask-close="true">
    <header class="files-title">文件详情</header>
  </Dialog>
</template>
<script lang="ts" setup>
import Dialog from '@/components/dialog'
import { useMainStore } from "@/store"
const useMain = useMainStore()
</script>
<style lang="less" scoped>
  .files-title {
    width: 100%;
    height: 30px;
    font-size: 26px;
    font-weight: 500;
    line-height: 30px;
    padding-left: 30px;
    background: url("@/assets/svg/files.svg") no-repeat 0px 0px;
    background-size: 30px;
    color: #000;
  }
</style>
