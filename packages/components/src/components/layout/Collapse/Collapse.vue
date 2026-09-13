<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useCollapse } from './composable';
import type { CollapseEmits, CollapseProps } from './type';

defineOptions({
  name: 'QCollapse',
});

const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmits>();

useCollapse(props, emit);
</script>

<style scoped></style>
