<script lang="ts" setup>
import {nextTick, onBeforeUnmount, onMounted, useTemplateRef} from "vue";
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
  emitInterval: 300
})
const emit = defineEmits<{
  (e: 'ended'): void
}>()
const refScrollContainer = useTemplateRef<HTMLElement>('scroll-container');
let height = 0
let width = 0
const emitEnded = useThrottle(() => emit('ended'), props.emitInterval);
const addScrolHandler = () => {
  const scroll = {
    x: refScrollContainer.value?.scrollLeft ?? 0,
    y: refScrollContainer.value?.scrollTop ?? 0
  }
  if (props.scollY && refScrollContainer.value && scroll.y + height >= (refScrollContainer.value.scrollHeight - props.threshold)) {
    emitEnded();
  }
  if (props.scollX && refScrollContainer.value && scroll.x + width >= (refScrollContainer.value.scrollWidth - props.threshold)) {
    emitEnded();
  }
}
onMounted(() => {
  nextTick(
      () => {
        height = refScrollContainer.value?.offsetHeight ?? 0
        width = refScrollContainer.value?.offsetWidth ?? 0
        if (props.scollX || props.scollY) {
          refScrollContainer.value?.addEventListener('scroll', addScrolHandler);
        }

      }
  )

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