<!--
 * @component QCol
 * @description 栅格列，配合 QRow 使用，对齐 Ant Design Col（24 栅格 / offset / flex）。
 -->
<template>
  <div :style="colStyle" class="q-col">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useCol } from './composable';
import type { ColProps } from './type';

defineOptions({ name: 'QCol' });

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
});

const { width, marginLeft, flexValue } = useCol(props);

const colStyle = computed(() => {
  const f = flexValue.value;
  if (f !== undefined) {
    return { flex: typeof f === 'number' ? `${f} ${f} auto` : f };
  }
  return {
    flex: `0 0 ${width.value}`,
    maxWidth: width.value,
    marginLeft: marginLeft.value,
  };
});
</script>

<style scoped>
.q-col {
  box-sizing: border-box;
  min-width: 0;
}
</style>
