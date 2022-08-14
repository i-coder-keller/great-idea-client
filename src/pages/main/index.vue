<template>
  <div class="main-container">
    <h1 class="title">Good Idea for web tools</h1>
    <h2 class="subtitle">transition、edit、create</h2>
    <div class="dotted-lined"></div>
    <div class="tools-list">
      <Function
          v-for="item in Menus"
          :key="item.path"
          :style="{'--icon': `url('${item.icon}')`}"
          @click="goPath(item.path)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Function from './components/function'
import { Menus } from './menus'
import { useRouter } from 'vue-router'
const router = useRouter()
const goPath = (path: string) => {
  router.push(path)
}
</script>
<style lang="less" scoped>
.main-container {
  width: 1660px;
  margin: auto;
  height: 100%;
  padding-top: 30px;
  box-sizing: border-box;
  .title {
    font-size: clamp(38px,5vw,54px);
    font-weight: 700;
    font-family: 'Good Idea';
  }
  .subtitle {
    margin-top: 20px;
    font-size: 30px;
    font-weight: 400;
    padding-left: 20px;
    padding-right: 40px;
    display: inline-block;
    height: 30px;
    background: url("@/assets/svg/multimedia.svg") no-repeat center right;
    background-size: 30px 30px;
  }
  .dotted-lined {
    margin-top: 55px;
    width: 100%;
    border-bottom: 1px dashed #ccc;
  }
  .tools-list {
    width: 100%;
    height: auto;
    display: grid;
    margin-top: 70px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 50px;
  }
}
</style>
