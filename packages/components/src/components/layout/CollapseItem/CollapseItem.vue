<template>
  <div :class="{ 'mouse-cursor-disable': disabled }" class="collapse-item">
    <div
      :aria-expanded="isActive"
      :class="{ 'is-active': isActive }"
      :tabindex="0"
      class="collapse-item__header bg-hover-secondary"
      role="button"
      @click="handleClick"
      @keydown.enter.prevent="handleClick"
      @keydown.space.prevent="handleClick"
    >
      <span class="collapse-item__title">{{ title || name }}</span>
      <i :class="{ 'is-active': isActive }" class="collapse-item__arrow" />
    </div>
    <div
      :class="{ 'is-active': isActive }"
      class="collapse-item__content-wrapper"
    >
      <div class="collapse-item__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCollapseItem } from './composable';
import { CollapseItemProps } from './type';

defineOptions({
  name: 'QCollapseItem',
});

const props = defineProps<CollapseItemProps>();

const { isActive, handleClick } = useCollapseItem(props);
</script>

<style scoped>
.collapse-item {
  border-bottom: 1px solid var(--q-color-primary);
}

.collapse-item:last-child {
  border-bottom: none;
}

.collapse-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.8rem;
  background-color: var(--q-color-bg-card);
  cursor: pointer;
  transition: all 0.3s ease;
}

.collapse-item__header.is-active {
  background-color: var(--q-color-primary);
  color: var(--q-color-white);
}

.collapse-item__title {
  font-weight: 500;
}

.collapse-item__arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid var(--q-color-text);
  transition: transform 0.3s ease;
  transform: rotateZ(90deg);
}

.collapse-item__arrow.is-active {
  transform: rotate(0deg);
  border-top-color: white;
}

.collapse-item__content-wrapper {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

.collapse-item__content-wrapper.is-active {
  height: min-content;
}
</style>
