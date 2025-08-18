<template>
  <div
      class="container-align-center container-center"
      style="
      width: min-content;
      height: min-content;
      cursor: pointer"
      v-html="content"
  />
</template>
<script lang="ts" setup>
import {computed, defineProps, onMounted, ref, watch} from "vue";

defineOptions({
  name: "Icon",
})
const props = withDefaults(defineProps<{
  icon: 'Aim' | 'Bell' | 'Card' | 'ChatDotRound' | 'ChatLineSquare' | 'CircleMinus' | 'CirclePlus' | 'Clock' | 'Close' | 'Copy' | 'Down' | 'Download' | 'Edit' | 'Emotion' | 'EyeClose' | 'EyeOpen' | 'Female' | 'Find' | 'ForbiddenBell' | 'FullScreen' | 'History' | 'House' | 'Larger' | 'Left' | 'Link' | 'Loading' | 'Location' | 'Lock' | 'Male' | 'Menu' | 'Message' | 'Minus' | 'Moon' | 'More' | 'Picture' | 'Plus' | 'Position' | 'RectangularClose' | 'Refresh' | 'Right' | 'Save' | 'Scissor' | 'Search' | 'Select' | 'Service' | 'Setting' | 'Share' | 'Smaller' | 'Star' | 'Sun' | 'svg' | 'Switch' | 'Trash' | 'Unlock' | 'Up' | 'Upload' | 'User' | 'VideoPause' | 'VideoPlay' | 'Warning' | 'Wifi';
  size?: string | number;
}>(), {
  size: "32",
})

const rawSvgContent = ref("");

// 动态加载SVG内容
const loadSvg = async () => {
  try {
    const module = await import(`@/icons/${props.icon}.svg?raw`);
    rawSvgContent.value = module.default;
  } catch (error) {
    console.error(`Failed to load SVG: ../icons/${props.icon}.svg`, error);
    rawSvgContent.value = "";
  }
};

// 响应式计算属性，根据rawSvgContent和props.size生成最终SVG内容
const content = computed(() => {
  if (!rawSvgContent.value) return "";
  return rawSvgContent.value.replace(
      "<svg",
      `<svg width="${props.size}" height="${props.size}"`,
  );
});

// 监听props.icon的变化，重新加载SVG
watch(() => props.icon, loadSvg);

// 初始化加载SVG
onMounted(() => {
  loadSvg();
});
</script>

<style scoped></style>
