<template>
  <div
    class="mouse-cursor user-select-none container-center"
    v-html="svgContent"
  />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { shareMemoryCache } from '@/utils';
import { IconConfig } from '@/config';

defineOptions({
  name: 'Icon',
});
const props = withDefaults(
  defineProps<{
    icon: string;
    size?: string | number;
  }>(),
  {
    size: '32',
  },
);
const svgContent = ref('');
const loadSvg = async (icon: string) => {
  const key = `icon-${icon}`;
  if (shareMemoryCache.has(key)) {
    const rawContent = shareMemoryCache.get<string>(key)!;
    svgContent.value = rawContent.replace(
      /<svg/,
      `<svg width="${props.size}" height="${props.size}"`,
    );
    return;
  }
  try {
    const rawContent = await (
      await fetch(`${IconConfig.base}/assets/svg/${icon}.svg`)
    ).text();
    const content = rawContent.replace(
      /<svg/,
      `<svg width="${props.size}" height="${props.size}"`,
    );
    svgContent.value = content;
    shareMemoryCache.set<string>(key, rawContent);
  } catch (e) {
    console.error(e);
    svgContent.value = '';
  }
};
watch(
  () => props.icon,
  (icon) => {
    loadSvg(icon);
  },
);
watch(
  () => props.size,
  () => {
    loadSvg(props.icon);
  },
);

onBeforeMount(() => {
  loadSvg(props.icon);
});
</script>

<style scoped></style>
