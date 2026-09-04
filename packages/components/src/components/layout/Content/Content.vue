<!--
 * @component QContent
 * @description 内容区布局组件，作为 QLayout 的自适应主体区域，对齐 Ant Design Layout.Content。
 -->
<template>
  <main :class="containerClass">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { useContent } from './composable';

defineOptions({ name: 'QContent' });

const { containerClass } = useContent();
</script>

<style scoped>
.q-layout-content {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  padding: var(--q-space-6);
  overflow: auto;
  background: var(--q-color-bg);
  color: var(--q-color-text);
}
</style>
