<!--
 * @component QEmpty
 * @description 空状态组件：无数据/无内容时展示占位插画与文案，对齐 Ant Design Empty。
 -->
<template>
  <div class="q-empty" :class="classList">
    <div class="q-empty-image" :style="imageStyle">
      <slot name="image">
        <!-- 默认插画：品牌浅底圆盘 + 文档 + 放大镜 -->
        <svg
          v-if="!simple"
          class="q-empty-svg q-empty-svg--default"
          viewBox="0 0 184 152"
          aria-hidden="true"
          focusable="false"
        >
          <ellipse
            cx="92"
            cy="138"
            rx="68"
            ry="8"
            fill="var(--q-color-gray-200)"
            opacity="0.7"
          />
          <circle
            cx="92"
            cy="72"
            r="58"
            fill="var(--q-color-primary-lighter)"
          />
          <rect
            x="58"
            y="42"
            width="56"
            height="66"
            rx="8"
            fill="var(--q-color-bg-card)"
            stroke="var(--q-color-border-light)"
            stroke-width="2"
          />
          <rect
            x="66"
            y="52"
            width="40"
            height="8"
            rx="4"
            fill="var(--q-color-gray-200)"
          />
          <rect
            x="66"
            y="66"
            width="40"
            height="6"
            rx="3"
            fill="var(--q-color-gray-300)"
          />
          <rect
            x="66"
            y="78"
            width="26"
            height="6"
            rx="3"
            fill="var(--q-color-gray-300)"
          />
          <rect
            x="66"
            y="90"
            width="34"
            height="6"
            rx="3"
            fill="var(--q-color-gray-300)"
          />
          <circle
            cx="128"
            cy="98"
            r="16"
            fill="var(--q-color-bg-card)"
            stroke="var(--q-color-primary)"
            stroke-width="4.5"
          />
          <line
            x1="139"
            y1="109"
            x2="151"
            y2="121"
            stroke="var(--q-color-primary)"
            stroke-width="6"
            stroke-linecap="round"
          />
        </svg>
        <!-- 简洁插画：细线放大镜 -->
        <svg
          v-else
          class="q-empty-svg q-empty-svg--simple"
          viewBox="0 0 64 41"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M2 13 Q5 10.5 8 13 T14 13"
            fill="none"
            stroke="var(--q-color-text-secondary)"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle
            cx="26"
            cy="20"
            r="11"
            fill="none"
            stroke="var(--q-color-text-secondary)"
            stroke-width="2.5"
          />
          <line
            x1="34"
            y1="28"
            x2="45"
            y2="39"
            stroke="var(--q-color-text-secondary)"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <path
            d="M48 9 Q51 6.5 54 9 T60 9"
            fill="none"
            stroke="var(--q-color-text-secondary)"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </slot>
    </div>
    <div v-if="hasDescription" class="q-empty-description">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="hasFooter" class="q-empty-footer">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { useEmpty } from './composable';
import type { EmptyProps } from './type';

defineOptions({ name: 'QEmpty' });

const props = withDefaults(defineProps<EmptyProps>(), {
  description: undefined,
  preset: 'default',
  imageStyle: undefined,
});

const slots = useSlots();

const { simple, description, hasFooter, hasDescription } = useEmpty(
  props,
  slots,
);

const classList = computed(() => ({ 'q-empty--simple': simple.value }));
</script>

<style scoped>
.q-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--q-space-3);
  padding: var(--q-space-8) var(--q-space-4);
  box-sizing: border-box;
  text-align: center;
}

.q-empty-image {
  display: flex;
  justify-content: center;
  margin-bottom: var(--q-space-2);
  line-height: 0;
}

.q-empty-svg {
  width: 160px;
  height: auto;
  overflow: visible;
}

.q-empty-svg--simple {
  width: 60px;
}

.q-empty-description {
  font-size: var(--q-font-size-sm);
  line-height: 1.5;
  color: var(--q-color-text-secondary);
}

.q-empty-footer {
  margin-top: var(--q-space-1);
}
</style>
