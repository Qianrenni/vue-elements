<!--
 * @component QTimeline
 * @description 时间轴组件：垂直时间线展示事件，支持左右/交替/标签/自定义圆点/幽灵待定，对齐 Ant Design Timeline。
 -->
<template>
  <ul class="q-timeline" :class="classList">
    <li
      v-for="(entry, index) in displayItems"
      :key="index"
      class="q-timeline-item"
      :class="{
        'q-timeline-item--left': entry.side === 'left',
        'q-timeline-item--right': entry.side === 'right',
        'q-timeline-item--pending': entry.pending,
      }"
    >
      <!-- alternate 模式下用于平衡左右半宽，使轴线居中 -->
      <div class="q-timeline-spacer" aria-hidden="true" />

      <div v-if="entry.item.label" class="q-timeline-label">
        <slot name="label" :item="entry.item" :index="index">
          {{ entry.item.label }}
        </slot>
      </div>

      <div class="q-timeline-rail" aria-hidden="true">
        <span
          class="q-timeline-dot"
          :class="{ 'q-timeline-dot--custom': entry.item.dot }"
          :style="dotStyle(entry)"
        >
          <slot name="dot" :item="entry.item" :index="index">
            {{ entry.item.dot }}
          </slot>
        </span>
      </div>

      <div class="q-timeline-content">
        <slot name="content" :item="entry.item" :index="index">
          {{ entry.item.content }}
        </slot>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { resolveDotColor, useTimeline } from './composable';
import type { TimelineDisplayItem } from './composable';
import type { TimelineProps } from './type';

defineOptions({ name: 'QTimeline' });

const props = withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
  mode: 'left',
  reverse: false,
  pending: undefined,
});

const { displayItems, classList } = useTimeline(props);

/** 圆点内联样式：默认/自定义圆点背景差异 */
function dotStyle(entry: TimelineDisplayItem) {
  if (entry.pending) return {};
  if (entry.item.dot) {
    return {
      backgroundColor: 'var(--q-color-primary-lighter)',
      color: 'var(--q-color-primary)',
    };
  }
  return { backgroundColor: resolveDotColor(entry.item.color) };
}
</script>

<style scoped>
.q-timeline {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

/* 每个条目是一行：spacer(label) rail content */
.q-timeline-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  min-height: 40px;
  box-sizing: border-box;
}

/* 内容在左（mode=right 或 alternate 奇/偶项）：镜像布局 */
.q-timeline-item--left {
  flex-direction: row-reverse;
}

/* 平衡半宽：仅 alternate 模式启用，让轴线居中 */
.q-timeline-spacer {
  display: none;
  flex: 1 1 0;
  min-width: 0;
}
.q-timeline--alternate .q-timeline-spacer {
  display: block;
}

/* — 轴线 — */
.q-timeline-rail {
  position: relative;
  flex: 0 0 var(--q-timeline-rail-w, 28px);
  box-sizing: border-box;
}

/* 轴线本身 */
.q-timeline-rail::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background-color: var(--q-color-border-light);
}

/* 圆点居中 */
.q-timeline-dot {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  font-size: 0;
  line-height: 1;
}

/* 自定义圆点（字符/emoji/图标） */
.q-timeline-dot--custom {
  width: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 var(--q-space-1);
  font-size: var(--q-font-size-xs);
}

/* 幽灵待定条目 */
.q-timeline-item--pending .q-timeline-dot {
  width: 12px;
  height: 12px;
  border: 2px solid var(--q-color-gray-300);
  background: transparent !important;
}
.q-timeline-item--pending .q-timeline-rail::before {
  background-color: var(--q-color-border-light);
  opacity: 0.5;
}

/* — 标签 / 内容 — */
.q-timeline-label {
  flex: none;
  align-self: flex-start;
  padding: 0 var(--q-space-3);
  font-size: var(--q-font-size-sm);
  line-height: 1.6;
  color: var(--q-color-text-secondary);
  text-align: right;
  min-width: 72px;
  box-sizing: border-box;
}
.q-timeline-item--left .q-timeline-label {
  text-align: left;
}

.q-timeline-content {
  flex: 1 1 0;
  min-width: 0;
  align-self: flex-start;
  padding: 0 var(--q-space-2) var(--q-space-6);
  font-size: var(--q-font-size-sm);
  line-height: 1.6;
  color: var(--q-color-text);
  box-sizing: border-box;
}

/* 最后一条内容不留底部空隙 */
.q-timeline-item:last-child .q-timeline-content {
  padding-bottom: 0;
}
.q-timeline-item--pending .q-timeline-content {
  color: var(--q-color-text-muted);
}
</style>
