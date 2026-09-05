<!--
 * @component QMasonry
 * @description 瀑布流（对齐 antd Masonry 常用能力）：按列数 CSS 多列填充等高/不等高卡片。
 -->
<script lang="ts" setup>
import { computed } from 'vue';

import { masonryContainerStyle, masonryItemStyle } from './composable';
import type { QMasonryProps } from './type';

defineOptions({ name: 'QMasonry' });

const props = withDefaults(defineProps<QMasonryProps>(), {
  items: () => [],
  columns: 4,
  gap: 16,
  itemKey: undefined,
});

const containerStyle = computed(() =>
  masonryContainerStyle(props.columns, props.gap),
);
const itemStyle = computed(() => masonryItemStyle(props.gap));
</script>

<template>
  <div class="q-masonry" :style="containerStyle">
    <div
      v-for="(item, index) in items"
      :key="itemKey ? itemKey(item, index) : index"
      class="q-masonry__item"
      :style="itemStyle"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<style scoped>
.q-masonry {
  width: 100%;
}
.q-masonry__item {
  box-sizing: border-box;
}
</style>
