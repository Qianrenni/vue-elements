<!--
 * @component QHeader
 * @description 顶部栏布局组件，作为 QLayout 的顶部区域，对齐 Ant Design Layout.Header。
 -->
<template>
  <header class="q-layout-header" :style="heightStyle">
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { useHeader } from './composable';
import type { HeaderProps } from './type';

defineOptions({ name: 'QHeader' });

const props = withDefaults(defineProps<HeaderProps>(), {});

const { heightStyle } = useHeader(props);
</script>

<style scoped>
.q-layout-header {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex: none;
  height: var(--q-layout-header-height, 56px);
  padding: 0 var(--q-space-6);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-bottom: 1px solid var(--q-color-border-light);
  line-height: var(--q-line-height-normal);
}
</style>
