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
    <Dialog />
    <DonationDialog>
      <DonationContent />
    </DonationDialog>
    <ConcatMeDialog >
      <ConcatMeCOntent />
    </ConcatMeDialog>
  </div>
</template>
<script lang="ts" setup>
import LayoutHeader from './layout-header.vue'
import Dialog from '@/components/dialog/dialog.vue'
import DonationDialog from '@/components/dialog/donation/donationDialog.vue'
import DonationContent from '@/components/dialog/donation/donation.vue'
import ConcatMeDialog from '@/components/dialog/concatMe/concatMeDialog.vue'
import ConcatMeCOntent from '@/components/dialog/concatMe/concatMe'
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
