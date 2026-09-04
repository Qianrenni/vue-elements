<!--
 * @component QStatistic
 * @description 统计数值组件：标题 + 数值 + 前后缀，支持千分位/精度/滚动动画，对齐 Ant Design Statistic。
 -->
<template>
  <div class="q-statistic">
    <div v-if="hasTitle" class="q-statistic-title">{{ title }}</div>
    <div class="q-statistic-content">
      <span v-if="prefix" class="q-statistic-prefix">{{ prefix }}</span>
      <span class="q-statistic-value" :style="valueStyle">{{
        isLoading ? '—' : displayValue
      }}</span>
      <span v-if="suffix" class="q-statistic-suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onUnmounted } from 'vue';

import { useStatistic } from './composable';
import type { StatisticProps } from './type';

defineOptions({ name: 'QStatistic' });

const props = withDefaults(defineProps<StatisticProps>(), {
  title: undefined,
  value: undefined,
  precision: undefined,
  groupSeparator: ',',
  decimalSeparator: '.',
  prefix: undefined,
  suffix: undefined,
  valueStyle: undefined,
  countUp: false,
  countDuration: 2000,
  loading: false,
});

const { displayValue, isLoading, startCountUp, cancelCountUp } =
  useStatistic(props);

const hasTitle = computed(() => Boolean(props.title));

// 卸载时取消动画帧，避免泄漏
onUnmounted(cancelCountUp);

// 显式声明，便于外部通过 ref 手动重触发滚动
defineExpose({ startCountUp });
</script>

<style scoped>
.q-statistic {
  display: inline-flex;
  flex-direction: column;
  gap: var(--q-space-2);
}

.q-statistic-title {
  font-size: var(--q-font-size-sm);
  line-height: 1.5;
  color: var(--q-color-text-secondary);
}

.q-statistic-content {
  display: inline-flex;
  align-items: baseline;
  gap: var(--q-space-1);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}

.q-statistic-value {
  display: inline-block;
  font-size: var(--q-font-size-3xl);
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
  white-space: nowrap;
}

.q-statistic-prefix,
.q-statistic-suffix {
  font-size: var(--q-font-size-base);
  color: var(--q-color-text-secondary);
}
</style>
