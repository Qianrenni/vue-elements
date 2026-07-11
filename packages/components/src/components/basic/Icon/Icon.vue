<template>
  <div
    class="mouse-cursor user-select-none container-center"
    v-html="svgContent"
  />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, watch } from 'vue';
import { IconProps } from './type';
import { loadSvg } from './composable';

defineOptions({
  name: 'QIcon',
});
const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
});
const svgContent = ref('');

watch(
  (): [string, number | string] => [props.icon, props.size],
  ([icon, size]) => {
    loadSvg(icon, size, size).then((content) => {
      svgContent.value = content;
    });
  },
);

onBeforeMount(() => {
  loadSvg(props.icon, props.size, props.size).then((content) => {
    svgContent.value = content;
  });
});
</script>

<style scoped></style>
