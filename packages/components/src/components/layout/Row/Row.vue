<!--
 * @component QRow
 * @description 栅格行容器，配合 QCol 实现 24 栅格布局，对齐 Ant Design Row。
 -->
<template>
  <div :class="classList" :style="inlineStyle" class="q-row">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useRow } from './composable';
import type { RowProps } from './type';

defineOptions({ name: 'QRow' });

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
  wrap: true,
});

const { classList, inlineStyle } = useRow(props);
</script>

<style scoped>
.q-row {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.q-row--no-wrap {
  flex-wrap: nowrap;
}

/* 主轴对齐 */
.q-row--justify-start {
  justify-content: flex-start;
}

.q-row--justify-end {
  justify-content: flex-end;
}

.q-row--justify-center {
  justify-content: center;
}

.q-row--justify-space-between {
  justify-content: space-between;
}

.q-row--justify-space-around {
  justify-content: space-around;
}

.q-row--justify-space-evenly {
  justify-content: space-evenly;
}

/* 交叉轴对齐 */
.q-row--align-top {
  align-items: flex-start;
}

.q-row--align-middle {
  align-items: center;
}

.q-row--align-bottom {
  align-items: flex-end;
}

.q-row--align-stretch {
  align-items: stretch;
}
</style>
