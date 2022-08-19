<template>
    <router-view />
</template>
<script lang="ts" setup>
import { loadFont } from "@/utils/font"
import FontZh from '@/assets/font/yuan.ttf'
import FontUs from '@/assets/font/idea-us-font.otf'
import {onMounted} from "vue"
onMounted(() => {
  loadFont('ideaZh', FontZh)
  loadFont('ideaUs', FontUs)
})
</script>
