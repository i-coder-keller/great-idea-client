<template>
  <div class="better-concat-me-container">
    <h1 class="better-concat-me">如何联系我？</h1>
    <div class="better-contact">
      <div class="better-concat-email">yongzhi1.liu@gmail.com</div>
      <div class="better-concat-weChatQRCode"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.better-concat-me-container {
  width: 100%;
  height: 100%;
  .better-concat-me {
    text-align: center;
    margin-bottom: 20px;
    font-size: 36px;
    font-family: 'Round-zh',serif;
    color: #000000;
  }
  .better-contact {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    div {
      margin: 30px 0;
    }
    .better-concat-email {
      padding-left: 40px;
      height: 30px;
      background-image: url("@/assets/svg/concat-me/email.svg");
      background-size: 30px 30px;
      background-repeat: no-repeat;
      background-position: left center;
      font-size: 30px;
      color: #000000;
      font-family: 'Round-zh',serif;
    }
    .better-concat-weChatQRCode{
      width: 200px;
      height: 200px;
      background-image: url("@/assets/svg/concat-me/weChat_QR_code.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>