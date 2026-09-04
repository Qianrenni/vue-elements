<!--
 * @component QSpace
 * @description 间距组件，对齐 Ant Design Space：水平/垂直排列子内容并统一间距。
 -->
<template>
  <div :class="classList" :style="inlineStyle" class="q-space">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useQSpace } from './composable';
import type { QSpaceProps } from './type';

defineOptions({ name: 'QSpace' });

const props = withDefaults(defineProps<QSpaceProps>(), {
  direction: 'horizontal',
  size: 'middle',
  align: 'center',
  wrap: false,
});

const { classList, inlineStyle } = useQSpace(props);
</script>

<style scoped>
.q-space {
  display: inline-flex;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
  vertical-align: top;
}

.q-space--vertical {
  flex-direction: column;
}

/* 水平对齐 */
.q-space--align-start {
  align-items: flex-start;
}

.q-space--align-end {
  align-items: flex-end;
}

.q-space--align-center {
  align-items: center;
}

.q-space--align-baseline {
  align-items: baseline;
}

.q-space--wrap {
  flex-wrap: wrap;
}

/* 垂直排列时默认拉伸占满主轴宽度 */
.q-space--vertical:not(.q-space--align-start):not(.q-space--align-end):not(
    .q-space--align-baseline
  ) {
  width: fit-content;
}

/* — 分隔（split） — */
.q-space--split {
  column-gap: 0 !important;
  row-gap: 0 !important;
}

/* 分隔条（split=true） */
.q-space--split-bar > *:not(:last-child)::after {
  content: '';
  display: inline-block;
  width: 1px;
  height: 1em;
  margin-inline: var(--q-split-gap);
  background-color: var(--q-color-border);
  vertical-align: middle;
}

/* 分隔文本（split=string） */
.q-space--split-text > *:not(:last-child)::after {
  content: var(--q-split-content, '');
  display: inline-block;
  margin-inline: var(--q-split-gap);
  color: var(--q-color-text-secondary);
  vertical-align: middle;
}

/* 垂直模式：分隔改为横向堆叠 */
.q-space--vertical.q-space--split-bar > *:not(:last-child)::after,
.q-space--vertical.q-space--split-text > *:not(:last-child)::after {
  display: block;
  width: 100%;
  margin-inline: 0;
  margin-block: var(--q-split-gap);
  text-align: center;
}

.q-space--vertical.q-space--split-bar > *:not(:last-child)::after {
  height: 1px;
  background-color: var(--q-color-border);
}
</style>
