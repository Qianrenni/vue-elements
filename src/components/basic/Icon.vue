<template>
  <div
      class="mouse-cursor user-select-none container-align-center container-center"
      v-html="svgContent"
  />
</template>
<script lang="ts" setup>
import {defineProps, onBeforeMount, ref, watch} from "vue";
import { shareMemoryCache } from "@/utils";

defineOptions({
  name: "Icon",
})
const props = withDefaults(defineProps<{
  icon: 'Aim' | 'Bell' | 'Book' | 'Calender' | 'Card' | 'Catalog' | 'ChatDotRound' | 'ChatLineSquare' | 'CircleMinus' | 'CirclePlus' | 'Clock' | 'Close' | 'Copy' | 'Down' | 'Download' | 'Edit' | 'Emotion' | 'EyeClose' | 'EyeOpen' | 'Female' | 'Find' | 'ForbiddenBell' | 'FullScreen' | 'Heart' | 'History' | 'House' | 'Larger' | 'Left' | 'Link' | 'Loading' | 'Location' | 'Lock' | 'Male' | 'Menu' | 'Message' | 'Minus' | 'Moon' | 'More' | 'Picture' | 'Plus' | 'Position' | 'RectangularClose' | 'Refresh' | 'Right' | 'Save' | 'Scissor' | 'Search' | 'Select' | 'Service' | 'Setting' | 'Share' | 'Smaller' | 'Star' | 'Sun' | 'svg' | 'Switch' | 'Tag' | 'Trash' | 'Unlock' | 'Up' | 'Upload' | 'User' | 'VideoPause' | 'VideoPlay' | 'Warning' | 'Wifi';
  size?: string | number;
}>(), {
  size: "32",
})
const svgContent = ref('');
const loadSvg = async (icon: string) => {
  const key = `icon-${icon}`
  if (shareMemoryCache.has(key)){
    svgContent.value = shareMemoryCache.get<string>(key)!;
    return 
  }
  try {
    const content = (await (await fetch(`assets/svg/${icon}.svg`)).text()).replace(/<svg/, `<svg width="${props.size}" height="${props.size}"`);
    svgContent.value = content;
    shareMemoryCache.set<string>(key,content);
  } catch (error) {
    svgContent.value = '';
  }
}
watch(() => props.icon, (icon) => {
  loadSvg(icon)
})
onBeforeMount(() => {
  loadSvg(props.icon)
})
</script>

<style scoped></style>
