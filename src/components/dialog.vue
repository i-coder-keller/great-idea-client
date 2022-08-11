<template>
  <Teleport to="body">
    <Transition name="bounce">
    <div class="dialog-mask" @click.self="closeDialog" v-show="visible">
      <div class="dialog-container">
        <slot />
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { useMainStore } from "@/store";

interface DialogPropsTypes {
  visible: boolean;
  maskClose: boolean
}

const props = defineProps<DialogPropsTypes>()
const { SET_DIALOG_VISIBLE_STATUS } = useMainStore()

const closeDialog = () => {
  if(!props.maskClose) return
  SET_DIALOG_VISIBLE_STATUS()
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
    height: 50%;
    min-width: 900px;
    min-height: 500px;
    padding: 10px;
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
