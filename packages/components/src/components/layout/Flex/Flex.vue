<!--
 * @component QFlex
 * @description 弹性布局容器（对齐 antd Flex）：一行 CSS flex 封装，支持 vertical/wrap/justify/align/gap/flex/tag。
 -->
<script lang="ts" setup>
import { useQFlex } from './composable';
import type { QFlexProps } from './type';

defineOptions({ name: 'QFlex' });

const props = withDefaults(defineProps<QFlexProps>(), {
  vertical: false,
  wrap: false,
  justify: 'flex-start',
  align: 'flex-start',
  gap: 'middle',
  flex: undefined,
  tag: 'div',
});

const { tag, style } = useQFlex(props);
</script>

<template>
  <component :is="tag" class="q-flex" :style="style">
    <slot />
  </component>
</template>

<style scoped>
.q-flex {
  box-sizing: border-box;
}
</style>
