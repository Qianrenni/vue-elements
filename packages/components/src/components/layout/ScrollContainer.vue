<script lang="ts" setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import { useThrottle, useWindowResize } from '@/utils';

defineOptions({
  name: 'ScrollContainer',
});
const props = withDefaults(
  defineProps<{
    scrollX?: boolean;
    scrollY?: boolean;
    threshold?: number;
    emitInterval?: number;
    recoverable?: boolean;
    name?: string;
  }>(),
  {
    scrollX: false,
    scrollY: false,
    threshold: 20,
    emitInterval: 16,
    recoverable: false,
  },
);
const emit = defineEmits<{
  (e: 'ended'): void;
  (e: 'scroll', scroll: { x: number; y: number }): void;
}>();
const refScrollContainer = useTemplateRef<HTMLElement>('scroll-container');
let height = 0;
let width = 0;
let lastY = -1;
let lastX = -1;
const addScrolHandler = useThrottle(() => {
  const scroll = {
    x: refScrollContainer.value?.scrollLeft ?? 0,
    y: refScrollContainer.value?.scrollTop ?? 0,
  };
  if (
    props.scrollY &&
    refScrollContainer.value &&
    scroll.y > lastY &&
    scroll.y + height >= refScrollContainer.value.scrollHeight - props.threshold
  ) {
    emit('ended');
  }
  if (
    props.scrollX &&
    refScrollContainer.value &&
    scroll.x > lastX &&
    scroll.x + width >= refScrollContainer.value.scrollWidth - props.threshold
  ) {
    emit('ended');
  }
  emit('scroll', scroll);
  lastY = scroll.y;
  lastX = scroll.x;
  if (props.name && props.recoverable) {
    sessionStorage.setItem(
      props.name,
      JSON.stringify({
        left: lastX,
        top: lastY,
      }),
    );
  }
}, props.emitInterval);

const resizeHandler = () => {
  if (refScrollContainer.value) {
    height = refScrollContainer.value?.offsetHeight ?? 0;
    width = refScrollContainer.value?.offsetWidth ?? 0;
  }
};
onMounted(() => {
  if (refScrollContainer.value) {
    height = refScrollContainer.value?.offsetHeight ?? 0;
    width = refScrollContainer.value?.offsetWidth ?? 0;
    if (props.scrollX || props.scrollY) {
      refScrollContainer.value?.addEventListener('scroll', addScrolHandler);
    }
    useWindowResize.addHandler(resizeHandler);
    if (props.name && props.recoverable) {
      const item = sessionStorage.getItem(props.name);
      if (item != null) {
        refScrollContainer.value.scrollTo({
          ...JSON.parse(item),
        });
      }
    }
  } else {
    console.error('scroll-container ref is null');
  }
});
onBeforeUnmount(() => {
  refScrollContainer.value?.removeEventListener('scroll', addScrolHandler);
  useWindowResize.removeHandler(resizeHandler);
});
defineExpose({
  scrollTo(options: {
    left?: number;
    top?: number;
    behavior?: 'smooth' | 'auto' | 'instant';
  }) {
    refScrollContainer.value?.scrollTo(options);
  },
});
</script>

<template>
  <div ref="scroll-container" class="scroll-container">
    <slot />
  </div>
</template>

<style scoped></style>
