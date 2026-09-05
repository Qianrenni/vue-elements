<!--
 * @component QDescriptions
 * @description 描述列表：详情页只读字段组合展示，支持 bordered / column / horizontal·vertical / size / span，对齐 Ant Design Descriptions 常用能力。
 -->
<template>
  <div
    class="q-descriptions"
    :class="[
      sizeClass,
      {
        'q-descriptions--bordered': bordered,
        'q-descriptions--vertical': vertical,
      },
    ]"
  >
    <div v-if="hasHeader" class="q-descriptions-header">
      <div class="q-descriptions-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="q-descriptions-extra">
        <slot name="extra" />
      </div>
    </div>

    <div
      class="q-descriptions-grid"
      :style="{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }"
    >
      <div
        v-for="entry in displayItems"
        :key="entry.key"
        class="q-descriptions-item"
        :style="{ gridColumn: `span ${entry.span}` }"
      >
        <div v-if="!vertical" class="q-descriptions-label" :style="labelStyle">
          <slot :index="0" :name="`${entry.key}-label`" :item="entry.item">
            {{ entry.item.label ?? '' }}
          </slot>
          <span v-if="colon && !bordered" class="q-descriptions-colon">:</span>
        </div>
        <div
          class="q-descriptions-content"
          :class="{ 'q-descriptions-content--block': vertical }"
          :style="contentStyle"
        >
          <slot :index="0" :item="entry.item" :name="entry.key">
            {{ entry.item.content ?? '' }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { useQDescriptions } from './composable';
import type { QDescriptionsProps } from './type';

defineOptions({ name: 'QDescriptions' });

const props = withDefaults(defineProps<QDescriptionsProps>(), {
  title: '',
  items: () => [],
  column: 3,
  layout: 'horizontal',
  size: 'middle',
  bordered: false,
  colon: true,
  labelStyle: undefined,
  contentStyle: undefined,
});

const slots = useSlots();

const { displayItems, column, sizeClass, vertical } = useQDescriptions(props);

/** 是否有标题 / 操作区 */
const hasHeader = computed(
  () => !!props.title || !!slots.title || !!slots.extra,
);
</script>

<style scoped>
.q-descriptions {
  width: 100%;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
}

/* 尺寸 */
.q-descriptions-size--small {
  font-size: var(--q-font-size-xs, 12px);
}
.q-descriptions-size--large {
  font-size: var(--q-font-size-base, 14px);
}

/* 头部 */
.q-descriptions-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--q-space-4, 16px);
  margin-bottom: var(--q-space-4, 16px);
}
.q-descriptions-title {
  font-size: var(--q-font-size-base, 14px);
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
}
.q-descriptions-extra {
  font-size: var(--q-font-size-sm, 14px);
  color: var(--q-color-text-secondary);
}

/* 内容网格 */
.q-descriptions-grid {
  display: grid;
  gap: 0;
}

/* 尺寸内边距 */
.q-descriptions-size--small .q-descriptions-item {
  padding: 6px 8px;
  min-height: 24px;
}
.q-descriptions-size--middle .q-descriptions-item {
  padding: 10px 12px;
  min-height: 28px;
}
.q-descriptions-size--large .q-descriptions-item {
  padding: 14px 16px;
  min-height: 32px;
}

/* 项 */
.q-descriptions-item {
  display: flex;
  gap: var(--q-space-2, 8px);
  align-items: baseline;
  min-width: 0;
}
.q-descriptions--vertical .q-descriptions-item {
  flex-direction: column;
  gap: var(--q-space-1, 4px);
}
.q-descriptions-label {
  flex: none;
  color: var(--q-color-text-secondary);
  font-weight: var(--q-font-weight-normal, 400);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.q-descriptions-colon {
  margin: 0 2px;
}
.q-descriptions-content {
  flex: 1;
  min-width: 0;
  color: var(--q-color-text);
  overflow-wrap: break-word;
}
.q-descriptions-content--block {
  flex: initial;
}

/* 边框态 */
.q-descriptions--bordered {
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 6px);
  overflow: hidden;
}
.q-descriptions--bordered .q-descriptions-grid {
  border-left: 1px solid var(--q-color-border-light);
  border-top: 1px solid var(--q-color-border-light);
}
.q-descriptions--bordered .q-descriptions-item {
  border-right: 1px solid var(--q-color-border-light);
  border-bottom: 1px solid var(--q-color-border-light);
}
.q-descriptions--bordered .q-descriptions-label {
  color: var(--q-color-text-secondary);
}
.q-descriptions--bordered.q-descriptions--vertical .q-descriptions-label {
  color: var(--q-color-text-secondary);
}
</style>
