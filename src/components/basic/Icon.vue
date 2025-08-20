<template>
  <img
      :src="src"
      :style="{
        'width':`${props.size}px`,
        'height':`${props.size}px`,
      }"
      alt="Unknown"
  >
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";

defineOptions({
  name: "Icon",
})
const props = withDefaults(defineProps<{
  icon: 'Aim' | 'Bell' | 'Card' | 'ChatDotRound' | 'ChatLineSquare' | 'CircleMinus' | 'CirclePlus' | 'Clock' | 'Close' | 'Copy' | 'Down' | 'Download' | 'Edit' | 'Emotion' | 'EyeClose' | 'EyeOpen' | 'Female' | 'Find' | 'ForbiddenBell' | 'FullScreen' | 'History' | 'House' | 'Larger' | 'Left' | 'Link' | 'Loading' | 'Location' | 'Lock' | 'Male' | 'Menu' | 'Message' | 'Minus' | 'Moon' | 'More' | 'Picture' | 'Plus' | 'Position' | 'RectangularClose' | 'Refresh' | 'Right' | 'Save' | 'Scissor' | 'Search' | 'Select' | 'Service' | 'Setting' | 'Share' | 'Smaller' | 'Star' | 'Sun' | 'svg' | 'Switch' | 'Trash' | 'Unlock' | 'Up' | 'Upload' | 'User' | 'VideoPause' | 'VideoPlay' | 'Warning' | 'Wifi';
  size?: string | number;
}>(), {
  size: "32",
})
const src = computed(() => {
  return `/assets/svg/${props.icon}.svg`
})
</script>

<style scoped></style>
