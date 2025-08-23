<script lang="ts" setup>
import {provide, ref, watch} from 'vue'

defineOptions({
  name: 'Collapse'
})

interface Props {
  modelValue?: string | string[]
  accordion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  accordion: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

// 内部状态
const activeNames = ref<string[]>(Array.isArray(props.modelValue) ? [...props.modelValue] : [props.modelValue])

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  activeNames.value = Array.isArray(newVal) ? [...newVal] : [newVal]
})

// 提供给子组件的方法
const handleItemClick = (name: string) => {
  if (props.accordion) {
    // 手风琴模式
    if (activeNames.value.includes(name)) {
      activeNames.value = []
    } else {
      activeNames.value = [name]
    }
  } else {
    // 普通模式
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
  }

  // 触发更新事件
  const value = props.accordion ? (activeNames.value.length > 0 ? activeNames.value[0] : '') : activeNames.value
  emit('update:modelValue', value)
}

// 提供给子组件的状态和方法
provide('collapse', {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="collapse">
    <slot/>
  </div>
</template>

<style scoped>
.collapse {
  border: 1px solid var(--border-color);
  overflow: hidden;
}
</style>