<script lang="ts" setup>
import {onBeforeUnmount, onMounted, useTemplateRef} from "vue";
import {useThrottle} from "@/utils";

defineOptions({
  name: 'ScrollContainer'
})
const props = withDefaults(defineProps<{
  scollX?: boolean
  scollY?: boolean
  threshold?: number
  emitInterval?: number
}>(), {
  scollX: false,
  scollY: false,
  threshold: 20,
  emitInterval: 16
})
const emit = defineEmits<{
  (e: 'ended'): void,
  (e: 'scroll', scroll: { x: number, y: number }): void
}>()
const refScrollContainer = useTemplateRef<HTMLElement>('scroll-container');
let height = 0
let width = 0
let lastY = -1;
let lastX = -1;
const addScrolHandler = useThrottle(() => {
  const scroll = {
    x: refScrollContainer.value?.scrollLeft ?? 0,
    y: refScrollContainer.value?.scrollTop ?? 0
  }
  if (props.scollY
      && refScrollContainer.value
      && scroll.y > lastY
      && scroll.y + height >= (refScrollContainer.value.scrollHeight - props.threshold)
  ) {
    emit('ended')
  }
  if (props.scollX
      && refScrollContainer.value
      && scroll.x > lastX
      && scroll.x + width >= (refScrollContainer.value.scrollWidth - props.threshold)) {
    emit('ended')
  }
  emit('scroll', scroll)
  lastY = scroll.y
  lastX = scroll.x
});
onMounted(() => {
  if (refScrollContainer.value) {
    height = refScrollContainer.value?.offsetHeight ?? 0
    width = refScrollContainer.value?.offsetWidth ?? 0
    if (props.scollX || props.scollY) {
      refScrollContainer.value?.addEventListener('scroll', addScrolHandler);
    }
  } else {
    console.error('scroll-container ref is null')
  }

});
onBeforeUnmount(() => {
  refScrollContainer.value?.removeEventListener('scroll', addScrolHandler);
})
</script>

<template>
  <div
      ref="scroll-container"
      :class="[
          {
            'scroll-x': scollX,
            'scroll-y': scollY
          }
      ]"
      class="scroll-container"
  >
    <slot/>
  </div>
</template>

<style scoped>

</style>