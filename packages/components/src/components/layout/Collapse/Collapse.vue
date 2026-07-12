<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { CollapseProps, CollapseEmits } from './type';
import { useCollapse } from './composable';

defineOptions({
  name: 'QCollapse',
});

const props = defineProps<CollapseProps>();
const emit = defineEmits<CollapseEmits>();

useCollapse(props, emit);
</script>

<style scoped></style>
