<template>
  <div class="text-control-container">
    <div class="control-menu">
      <div class="great-select">24 </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.text-control-container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .control-menu {
    margin: 0 60px;
    height: auto;
    width: auto;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    padding: 5px 10px;
    background-color: rgba(0,0,0,.25);
    border-radius: 5px;
  }
  .great-select {
    width: auto;
    height: 20px;
    cursor: pointer;
    padding: 5px 20px 5px 0;
    background-image: url("@/assets/svg/video-editor/text-control-down.svg");
    background-size: 15px 15px;
    background-position: right center;
    background-repeat: no-repeat;
    line-height: 20px;
  }
}
</style>