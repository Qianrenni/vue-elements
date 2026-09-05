<!--
 * @component QListy
 * @description 虚拟列表（对齐 antd Listy 虚拟列表能力，定高模式）：窗口化渲染大列表，恒定行高。
 -->
<script lang="ts" setup>
import { computed, ref } from 'vue';

import { computeListWindow } from './composable';
import type { QListyExpose, QListyProps } from './type';

defineOptions({ name: 'QListy' });

const props = withDefaults(defineProps<QListyProps>(), {
  items: () => [],
  itemHeight: 40,
  height: 400,
  overscan: 4,
  itemKey: undefined,
});

const scrollTop = ref(0);
const scrollRef = ref<HTMLElement | null>(null);

const windowInfo = computed(() =>
  computeListWindow(
    scrollTop.value,
    props.height,
    props.itemHeight,
    props.items.length,
    props.overscan,
  ),
);

const visibleItems = computed(() =>
  props.items.slice(windowInfo.value.start, windowInfo.value.end),
);

const trackStyle = computed(() => ({
  height: `${props.items.length * props.itemHeight}px`,
}));

const padTop = computed(() => `${windowInfo.value.offset}px`);

function onScroll() {
  if (scrollRef.value) scrollTop.value = scrollRef.value.scrollTop;
}

function scrollTo(index: number) {
  if (scrollRef.value) {
    scrollRef.value.scrollTop = Math.max(0, index) * props.itemHeight;
  }
}

defineExpose<QListyExpose>({ scrollTo });
</script>

<template>
  <div
    ref="scrollRef"
    class="q-listy"
    :style="{ height: `${height}px` }"
    @scroll.passive="onScroll"
  >
    <div class="q-listy__track" :style="trackStyle">
      <div
        class="q-listy__window"
        :style="{ transform: `translateY(${padTop})` }"
      >
        <div
          v-for="(item, index) in visibleItems"
          :key="
            itemKey
              ? itemKey(item, windowInfo.start + index)
              : windowInfo.start + index
          "
          class="q-listy__row"
          :style="{ height: `${itemHeight}px` }"
        >
          <slot :item="item" :index="windowInfo.start + index" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-listy {
  overflow-y: auto;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 6px);
}
.q-listy__track {
  position: relative;
}
.q-listy__window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.q-listy__row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--q-color-text);
}
.q-listy__row:nth-child(even) {
  background: var(--q-color-bg-secondary);
}
</style>
