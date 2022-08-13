<template>
  <div class="main-container">
    <h1 class="title">Good Idea for web tools</h1>
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
  box-sizing: border-box;
  .title {
    font-size: clamp(38px,5vw,54px);
    font-weight: 700;
    font-family: 'Good Idea';
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
