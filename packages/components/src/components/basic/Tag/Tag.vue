<!--
 * @component QTag
 * @description 标签组件，用于展示文本标签，支持自定义文字颜色和背景色
 -->
<template>
  <span
    class="tag"
    :style="{ color: props.color, background: props.background }"
  >
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
import { TagProps } from './type';

defineOptions({ name: 'QTag' });

const props = withDefaults(defineProps<TagProps>(), {
  color: 'white',
  background: 'var(--tag-primary-color)',
});
</script>

<style lang="css" scoped></style>
