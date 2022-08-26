<template>
  <div class="donation-container">
    <h1 class="title">捐 赠</h1>
    <p class="content">
      开源不易，熬夜辛苦，如果您觉得此项目对您有帮助，您可以给予我一点支持。
      您的支持是我坚持下去的动力，而且这样会维持项目稳定的发展。
    </p>
    <p>非常感谢！🚀</p>
    <div class="pay">
      <img :src="WeChatPay" class="imaPay">
      <img :src="Alipay" class="imaPay">
    </div>
  </div>
</template>
<script lang="ts" setup>
import WeChatPay from '@/assets/images/pay/WeChatpay.png'
import Alipay from '@/assets/images/pay/Alipay.png'
</script>
<style lang="less" scoped>
.donation-container {
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    height: 30px;
    font-size: 28px;
    color: #000;
    text-align: center;
  }
  p{
    color: black;
    font-size: 18px;
    line-height: 30px;
  }
  .content {
    color: black;
    font-size: 18px;
    text-indent: 2em;
    margin-top: 20px;
    line-height: 30px;
  }
  .pay {
    width: 620px;
    height: 300px;
    display: flex;
    justify-content: space-between;
    margin: auto;
    align-items: center;
    .imaPay {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
