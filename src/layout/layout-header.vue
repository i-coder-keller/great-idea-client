<template>
  <header class="header-container">
    <div class="header-logo">超会编</div>
    <div class="header-group">
      <button class="header-files">文件列表</button>
    </div>
  </header>
</template>

<script lang="ts" setup>

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
    font-family:'jin_mei_mxplzx312d4e78bd248fe';
    font-size: 38px;
    height: 100%;
    width: auto;
    line-height: 60px;
    color: #FFF;
    cursor: pointer;
  }
  .header-group {
    display: flex;
    .header-files {
      width: 80px;
      height: 32px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,.3);
      background-color: transparent;
      border-radius: 4px;
      color: #fff;
      font-family: "Rubik","Open Sans",sans-serif;
      font-weight: 300;
      font-size: 12px;
    }
  }
}
</style>
