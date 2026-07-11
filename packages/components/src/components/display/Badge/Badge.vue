<!--
 * @component QBadge
 * @description 徽章组件，用于在元素右上角展示徽标数字或小圆点
 -->
<script lang="ts" setup>
import { BadgeProps } from './type';

defineOptions({ name: 'QBadge' });

withDefaults(defineProps<BadgeProps>(), {
  type: 'info',
  value: 1,
  max: 99,
  dot: false,
});
</script>

<template>
  <div class="container" style="position: relative">
    <slot />
    <span v-if="dot" class="dot" />
    <span v-else :class="`text-${type}`" class="dot padding-fourth-rem">
      {{
        (typeof value === 'number' && value > max) ||
        (typeof value === 'string' && parseInt(value) > max)
          ? `99+`
          : value
      }}
    </span>
  </div>
</template>

<style scoped></style>
