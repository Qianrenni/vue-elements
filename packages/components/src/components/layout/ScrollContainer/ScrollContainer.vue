<template>
  <div ref="scroll-container" class="scroll-container">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef } from 'vue';
import type { ScrollContainerProps, ScrollContainerEmits } from './type';
import { useScrollContainer } from './composable';

defineOptions({
  name: 'QScrollContainer',
});

const props = withDefaults(defineProps<ScrollContainerProps>(), {
  scrollX: false,
  scrollY: false,
  threshold: 20,
  emitInterval: 16,
  recoverable: false,
});

const emit = defineEmits<ScrollContainerEmits>();

const refScrollContainer = useTemplateRef<HTMLElement>('scroll-container');

const { scrollTo } = useScrollContainer(props, emit, refScrollContainer);

defineExpose({ scrollTo });
</script>

<style scoped></style>
