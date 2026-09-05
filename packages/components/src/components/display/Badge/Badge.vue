<!--
 * @component QBadge
 * @description 徽章组件，用于在元素右上角展示徽标数字或小圆点
 -->
<script lang="ts" setup>
import { useBadge } from './composable';
import type { BadgeProps } from './type';

defineOptions({ name: 'QBadge' });

const props = withDefaults(defineProps<BadgeProps>(), {
  type: 'info',
  value: 1,
  max: 99,
  dot: false,
});

const { displayValue, typeClass, isDot } = useBadge(props);
</script>

<template>
  <span class="q-badge">
    <slot />
    <span
      v-if="isDot"
      class="q-badge__dot"
      :class="typeClass"
      aria-hidden="true"
    />
    <span v-else class="q-badge__count" :class="typeClass">
      {{ displayValue }}
    </span>
  </span>
</template>

<style scoped>
.q-badge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  line-height: 1;
}
.q-badge__count,
.q-badge__dot {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.q-badge__count {
  min-width: var(--q-space-6);
  height: var(--q-space-6);
  padding: 0 var(--q-space-2);
  border-radius: var(--q-radius-full);
  font-size: var(--q-font-size-xs);
  line-height: 1;
}
.q-badge__dot {
  width: var(--q-space-3);
  height: var(--q-space-3);
  border-radius: var(--q-radius-full);
}
/* — 类型色：数字徽章沿用语义色对（实心：信息/警示/危险；柔和：成功/品牌/灰） — */
.q-badge--info {
  color: var(--q-color-info);
  background-color: var(--q-color-info-bg);
}
.q-badge--warning {
  color: var(--q-color-warning);
  background-color: var(--q-color-warning-bg);
}
.q-badge--danger {
  color: var(--q-color-danger);
  background-color: var(--q-color-danger-bg);
}
.q-badge--success {
  color: var(--q-color-success);
  background-color: var(--q-color-success-bg);
}
.q-badge--primary {
  color: var(--q-color-white);
  background-color: var(--q-color-primary);
}
.q-badge--gray {
  color: var(--q-color-text-muted);
  background-color: var(--q-color-bg-secondary);
}
/* — 小圆点始终取饱和主色（柔和色阶在小尺寸下不可见，回退强色） — */
.q-badge__dot.q-badge--success {
  background-color: var(--q-color-success);
}
.q-badge__dot.q-badge--gray {
  background-color: var(--q-color-text-muted);
}
</style>
