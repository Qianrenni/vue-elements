<template>
  <div class="collapsible-section">
    <!-- 向上箭头 -->
    <div
        v-if="isShowArrow && direction === 'up'"
        class="toggle-button-up"
        @click="toggle"
    ></div>

    <div
        class="content-container"
        :style="{ justifyContent: direction === 'left' ? 'flex-start' : 'flex-end' }"
    >
      <!-- 左侧箭头 -->
      <div
          v-if="isShowArrow && direction === 'left'"
          class="toggle-button-left"
          :style="{
          height:
            isShowArrow && direction === 'left' && isExpanded
              ? 'auto'
              : '40px',
        }"
          @click="toggle"
      ></div>

      <!-- 可折叠内容 -->
      <transition :name="transitionName">
        <div v-show="isExpanded" class="content">
          <slot></slot>
        </div>
      </transition>

      <!-- 右侧箭头 -->
      <div
          v-if="isShowArrow && direction === 'right'"
          class="toggle-button-right"
          :style="{
          height:
            isShowArrow && direction === 'right' && isExpanded
              ? 'auto'
              : '40px',
        }"
          @click="toggle"
      ></div>
    </div>

    <!-- 向下箭头 -->
    <div
        v-if="isShowArrow && direction === 'down'"
        class="toggle-button-down"
        @click="toggle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
defineOptions({
  name: 'CollapsibleSection'
})
// 定义 props
const props = defineProps({
  isShowArrow: {
    type: Boolean,
    default: true,
  },
  initialExpanded: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String as () => 'up' | 'down' | 'left' | 'right',
    default: 'down',
    validator: (value: string) =>
        ['up', 'down', 'left', 'right'].includes(value),
  },
})

// 控制展开/收起状态
const isExpanded = ref(props.initialExpanded)

// 暴露方法给父组件调用
function toggle() {
  isExpanded.value = !isExpanded.value
}
function close() {
  isExpanded.value = false
}
function open() {
  isExpanded.value = true
}

defineExpose({ toggle, close, open })

// 根据方向计算过渡动画名称
const transitionName = computed(() => {
  const map = {
    up: 'slide-up',
    down: 'slide-down',
    left: 'slide-left',
    right: 'slide-right',
  }
  return map[props.direction]
})
</script>
<style scoped>
.collapsible-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-container{
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
  .toggle-button-down{
    height: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .toggle-button-up{
    height: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .toggle-button-left{
    width: 10px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .toggle-button-right{
    width: 10px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

}
@media  screen and (max-width: 768px) {
  .toggle-button-left,.toggle-button-right{
    display: none;
  }

}
</style>