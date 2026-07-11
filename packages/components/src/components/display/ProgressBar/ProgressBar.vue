<!--
 * @component QProgressBar
 * @description 进度条组件，支持水平和垂直方向，可自定义颜色与百分比
 -->
<template>
  <div
    :class="{
      'container-column': props.direction === 'vertical',
    }"
    class="container-w100 container-h100 bg-gray-300"
  >
    <div
      :style="{
        width: props.direction === 'horizontal' ? props.percent : '100%',
        height: props.direction === 'vertical' ? props.percent : '100%',
        backgroundColor: props.color,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ProgressBarProps } from './type';

defineOptions({ name: 'QProgressBar' });

const props = withDefaults(defineProps<ProgressBarProps>(), {
  color: 'var(--primary-color)',
  direction: 'horizontal',
});
</script>

<style scoped></style>
