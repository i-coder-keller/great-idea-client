<template>
  <div class="layout-container">
    <div class="layout-header">
      <LayoutHeader />
    </div>
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Dialog :visible="useMain.dialogVisible"/>
    <DonationDialog :visible="useMain.donationVisible">
      <DonationContent />
    </DonationDialog>
  </div>
</template>
<script lang="ts" setup>
import LayoutHeader from './layout-header.vue'
import Dialog from '@/components/dialog.vue'
import DonationDialog from '@/components/donationDialog.vue'
import DonationContent from '@/components/donation.vue'
import { useMainStore } from "@/store"
const useMain = useMainStore()
</script>
<style lang="less" scoped>
@import "./router-animate";
  .layout-container {
    min-width: 1200px;
    width: 100%;
    margin: 0 auto;
    height: 100%;
    min-height: 800px;
    background-color: #FFF;
    .layout-header {
      width: 100%;
      box-sizing: border-box;
      height: 50px;
      padding: 0 30px;
      background-color: #000;
    }
    .layout-content {
      width: 100%;
      height: calc(100% - 50px);
      box-sizing: border-box;
    }
  }
</style>
