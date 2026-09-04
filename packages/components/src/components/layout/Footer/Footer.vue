<!--
 * @component QFooter
 * @description 底部栏布局组件，作为 QLayout 的底部区域，对齐 Ant Design Layout.Footer。
 -->
<template>
  <footer :class="containerClass">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { useFooter } from './composable';

defineOptions({ name: 'QFooter' });

const { containerClass } = useFooter();
</script>

<style scoped>
.q-layout-footer {
  flex: none;
  padding: var(--q-space-4) var(--q-space-6);
  background: var(--q-color-bg-card);
  color: var(--q-color-text-secondary);
  text-align: center;
  border-top: 1px solid var(--q-color-border-light);
}
</style>
