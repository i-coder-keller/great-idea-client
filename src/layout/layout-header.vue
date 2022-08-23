<template>
  <header class="header-container">
    <div class="header-logo" @click="goRouter"/>
    <div class="header-group">
      <button class="call-me" @click="SET_DIALOG_VISIBLE_STATUS">联系我</button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useMainStore } from "@/store";
import { useRouter } from "vue-router";
const { SET_DIALOG_VISIBLE_STATUS } = useMainStore()
const router = useRouter()
const goRouter = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  .header-logo {
    font-size: 38px;
    height: 100%;
    width: 50px;
    background: url("@/assets/svg/logo.svg") no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .header-group {
    display: flex;
    .call-me {
      width: 70px;
      height: 26px;
      cursor: pointer;
      border: 1px solid #FFF;
      background-color: transparent;
      border-radius: 4px;
      color: #FFF;
      font-family: 'Round-zh',serif;
      font-weight: 300;
      font-size: 12px;
    }
  }
}
</style>
