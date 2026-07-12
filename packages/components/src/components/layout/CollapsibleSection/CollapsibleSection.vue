<template>
  <div class="collapsible-section">
    <!-- 向上箭头 -->
    <div
      v-if="isShowArrow && direction === 'up'"
      class="toggle-button-up"
      @click="toggle"
    />

    <div
      :style="{
        justifyContent: direction === 'left' ? 'flex-start' : 'flex-end',
      }"
      class="content-container"
    >
      <!-- 左侧箭头 -->
      <div
        v-if="isShowArrow && direction === 'left'"
        :style="{
          height: isExpanded ? 'auto' : '40px',
        }"
        class="toggle-button-left"
        @click="toggle"
      />

      <!-- 可折叠内容 -->
      <transition :name="transitionName">
        <div v-show="isExpanded" class="content">
          <slot />
        </div>
      </transition>

      <!-- 右侧箭头 -->
      <div
        v-if="isShowArrow && direction === 'right'"
        :style="{
          height: isExpanded ? 'auto' : '40px',
        }"
        class="toggle-button-right"
        @click="toggle"
      />
    </div>

    <!-- 向下箭头 -->
    <div
      v-if="isShowArrow && direction === 'down'"
      class="toggle-button-down"
      @click="toggle"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CollapsibleSectionProps } from './type';
import { useCollapsibleSection } from './composable';

defineOptions({
  name: 'QCollapsibleSection',
});

const props = withDefaults(defineProps<CollapsibleSectionProps>(), {
  isShowArrow: true,
  initialExpanded: true,
  direction: 'down',
});

const { isExpanded, toggle, close, open, transitionName } =
  useCollapsibleSection(props);

defineExpose({ toggle, close, open });
</script>

<style scoped>
.collapsible-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.content {
  overflow: hidden;
  flex: 1;
  display: flex;
}

/* 向上展开 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
  transform-origin: bottom;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 向下展开 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* 向左展开 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
  transform-origin: right;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-to,
.slide-left-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* 向右展开 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
  transform-origin: left;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* 箭头按钮样式 */
.toggle-button-up {
  width: 100%;
  height: 20px;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.toggle-button-down {
  width: 100%;
  height: 20px;
  border-top: 1px solid #ccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.toggle-button-left {
  width: 20px;
  height: auto;
  border-right: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.toggle-button-right {
  width: 20px;
  height: auto;
  border-left: 1px solid #ccc;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .toggle-button-down {
    height: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .toggle-button-up {
    height: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .toggle-button-left {
    width: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .toggle-button-right {
    width: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}

@media screen and (max-width: 768px) {
  .toggle-button-left,
  .toggle-button-right {
    display: none;
  }
}
</style>
