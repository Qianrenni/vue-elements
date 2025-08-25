<script lang="ts" setup>
import {computed, inject, Ref, ref} from 'vue'

defineOptions({
  name: 'CollapseItem'
})

interface Props {
  name: string
  title?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  disabled: false
})

// 从父组件获取状态和方法
const collapse: { activeNames: Ref<string[]>, handleItemClick: (name: string) => void } = inject('collapse', {
  activeNames: ref([]),
  handleItemClick: () => {
  }
})

// 判断当前项是否激活
const isActive = computed(() => {
  return collapse ? collapse.activeNames.value.includes(props.name) : false
})

// 处理点击事件
const handleClick = () => {
  if (props.disabled) return
  collapse && collapse.handleItemClick(props.name)
}
</script>

<template>
  <div :class="{ 'is-disabled': disabled }" class="collapse-item">
    <div
        :class="{ 'is-active': isActive }"
        class="collapse-item__header"
        @click="handleClick"
    >
      <span class="collapse-item__title">{{ title || name }}</span>
      <i :class="{ 'is-active': isActive }" class="collapse-item__arrow"></i>
    </div>
    <div :class="{ 'is-active': isActive }" class="collapse-item__content-wrapper">
      <div class="collapse-item__content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collapse-item {
  border-bottom: 1px solid var(--border-color);
}

.collapse-item:last-child {
  border-bottom: none;
}

.collapse-item.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.collapse-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.8rem;
  background-color: var(--card-bg);
  cursor: pointer;
  transition: all 0.3s ease;
}

.collapse-item__header:hover {
  background-color: var(--secondary-background-color);
}

.collapse-item__header.is-active {
  background-color: var(--primary-color);
  color: white;
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
  border-top: 5px solid var(--text-color);
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

.collapse-item__content {
  padding: 0.8rem;
}
</style>