<!--
 * @component QTab
 * @description 标签页组件，支持标签列表展示和切换，激活项可自定义 class 名称
 -->
<template>
  <div class="tablist container">
    <span
      v-for="(item, index) in list"
      :key="index"
      :class="{
        [activeClass]: index === activeCategory,
      }"
      class="tab-item padding-half-rem mouse-cursor radius-third-rem"
      @click="clickHandler(index)"
    >
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useTab } from './composable';
import type { TabProps } from './type';

defineOptions({ name: 'QTab' });

const props = withDefaults(defineProps<TabProps>(), {
  activeClass: 'active',
});

const emit = defineEmits<{
  (e: 'select', index: number): void;
}>();

const { activeCategory, clickHandler } = useTab(props, emit);
</script>

<style scoped>
.tab-item {
  font-weight: bold;
  position: relative;
  margin-right: var(--half-distance);
  transition: all 0.3s ease;
}

.tab-item:not(.active):hover {
  background-color: var(--gray-200);
  transform: translateY(-2px);
}

.tab-item.active {
  color: var(--primary-color);
  background-color: var(--color-white);
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  transition: transform 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .tab-item {
    flex: 0 0 auto;
  }
}
</style>
