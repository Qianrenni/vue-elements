
<template>
  <div v-html="content" style="cursor: pointer;" class="container-align-center container-center" />
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: 'User'
  },
  size: {
    type: String,
    default: '32'
  }
});

const rawSvgContent = ref('');

// 动态加载SVG内容
const loadSvg = async () => {
  try {
    const module = await import(`../icons/${props.icon}.svg?raw`);
    rawSvgContent.value = module.default;
  } catch (error) {
    console.error(`Failed to load SVG: ../icons/${props.icon}.svg`, error);
    rawSvgContent.value = '';
  }
};

// 响应式计算属性，根据rawSvgContent和props.size生成最终SVG内容
const content = computed(() => {
  if (!rawSvgContent.value) return '';
  return rawSvgContent.value.replace('<svg', `<svg width="${props.size}" height="${props.size}"`);
});

// 监听props.icon的变化，重新加载SVG
watch(() => props.icon, loadSvg);

// 初始化加载SVG
onMounted(() => {
  loadSvg();
});
</script>

<style scoped></style>
