<!--
 * @component QLayout
 * @description 页面整体布局容器，与 QHeader / QSider / QContent / QFooter 组合使用，对齐 Ant Design Layout。
 * 默认纵向排列；检测到内部存在 QSider 时自动切换为横向（Sider 在左，其余子件在右）。
 -->
<template>
  <section ref="layoutRoot" :class="classes" class="q-layout">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { useLayout } from './composable';
import type { LayoutProps } from './type';

defineOptions({ name: 'QLayout' });

const props = withDefaults(defineProps<LayoutProps>(), {});

const { classes } = useLayout(props);
</script>

<style scoped>
.q-layout {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 0;
  width: 100%;
  flex: auto;
}

/* 含 Sider：切换为横向，子件占满剩余空间 */
.q-layout--has-sider {
  flex-direction: row;
}

.q-layout--has-sider > :deep(*:not(.q-layout-sider)) {
  flex: 1 1 auto;
  min-width: 0;
}
</style>
