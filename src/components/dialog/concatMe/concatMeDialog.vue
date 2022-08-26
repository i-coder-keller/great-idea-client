<template>
  <Teleport to="body">
    <Transition name="bounce">
    <div
        class="dialog-mask"
        @click.self="closeDialog"
        v-show="useDialog.concatMeVisible"
    >
      <div class="dialog-container ss">
        <slot/>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { useDialogStore } from "@/store/dialog"
const useDialog = useDialogStore()

const closeDialog = () => {
  useDialog.SET_CONCAT_ME_VISIBLE_STATUS()
}

</script>

<style lang="less" scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .3);
  z-index: 2022;
  .dialog-container {
    width: 60%;
    height: auto;
    min-width: 200px;
    min-height: 200px;
    padding:  30px 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 5px 40px rgb(0 0 0 / 20%);
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
