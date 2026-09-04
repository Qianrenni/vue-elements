<!--
 * @component QRate
 * @description 评分组件，支持整星/半星、可清除、自定义字符，对齐 Ant Design Rate。
 -->
<template>
  <span
    :class="{ 'q-rate--disabled': isDisabled }"
    class="q-rate"
    role="radiogroup"
    @mouseleave="onLeave"
  >
    <span
      v-for="i in count"
      :key="i"
      class="q-rate-star"
      role="radio"
      :aria-checked="i - 1 < displayValue"
      :style="starStyle(i - 1)"
      @click="onPick(i - 1, false)"
    >
      <span
        v-if="allowHalf"
        class="q-rate-half q-rate-half--left"
        @click.stop="onPick(i - 1, true)"
        @mouseenter="onHover(i - 1, true)"
      />
      <span class="q-rate-inner">
        <slot name="character" :index="i - 1">
          {{ character }}
        </slot>
      </span>
      <span
        v-if="allowHalf"
        class="q-rate-half q-rate-half--right"
        @click.stop="onPick(i - 1, false)"
        @mouseenter="onHover(i - 1, false)"
      />
    </span>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { isFull, isHalf, useRate } from './composable';
import type { RateEmits, RateProps } from './type';

defineOptions({ name: 'QRate' });

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  disabled: false,
  character: '★',
});

const emit = defineEmits<RateEmits>();

const { displayValue, isDisabled, onHover, onLeave, onPick } = useRate(
  props,
  emit,
);

const count = computed(() => props.count ?? 5);
const allowHalf = computed(() => props.allowHalf === true);

/** 单星样式：满/半星变色 */
function starStyle(index: number) {
  const full = isFull(displayValue.value, index);
  const half = isHalf(displayValue.value, index, allowHalf.value);
  return {
    color:
      full || half ? 'var(--q-rate-color, #f5b041)' : 'var(--q-color-gray-300)',
  };
}
</script>

<style scoped>
.q-rate {
  display: inline-flex;
  gap: var(--q-space-1);
  font-size: var(--q-font-size-lg);
  line-height: 1;
}

.q-rate-star {
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: transform var(--q-duration-fast, 150ms) ease;
  cursor: pointer;
}

.q-rate-star:hover {
  transform: scale(1.15);
}

.q-rate-inner {
  display: inline-block;
  transition: color var(--q-duration-fast, 150ms) ease;
}

/* 可点击的半区分层 */
.q-rate-half {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 1;
  cursor: pointer;
}
.q-rate-half--left {
  left: 0;
}
.q-rate-half--right {
  right: 0;
}

.q-rate--disabled {
  cursor: not-allowed;
}
.q-rate--disabled .q-rate-star,
.q-rate--disabled .q-rate-half {
  cursor: not-allowed;
}
.q-rate--disabled .q-rate-star:hover {
  transform: none;
}
</style>
