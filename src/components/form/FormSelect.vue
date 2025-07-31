<!-- components/form/FormSelectMultiple.vue -->
<template>
  <div :class="wrapperClass" class="form-select-multiple-wrapper">
    <!-- 标签 -->
    <label v-if="label" :for="id" class="form-select-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- 可点击区域 -->
    <div
        :id="id"
        :class="{ 'is-focused': isOpen, 'has-error': error }"
        class="form-select-multiple-trigger"
        @click="toggleDropdown"
    >
      <!-- 已选标签 -->
      <div v-if="selectedLabels.length === 0" class="form-select-placeholder">
        {{ placeholder }}
      </div>
      <div v-else class="form-select-tags">
        <span
            v-for="opt in selectedOptions"
            :key="opt.value"
            class="form-select-tag"
        >
          {{ opt.label }}
          <button
              class="form-select-tag-remove"
              type="button"
              @click.stop="removeOption(opt.value)"
          >
            ×
          </button>
        </span>
      </div>

      <!-- 下拉箭头 -->
      <div :class="{ open: isOpen }" class="form-select-arrow"></div>
    </div>

    <!-- 下拉菜单 -->
    <ul
        v-show="isOpen"
        class="form-select-dropdown"
        @click.stop
    >
      <!-- 搜索框（可选） -->
      <li v-if="searchable" class="form-select-search-li">
        <input
            v-model="searchKeyword"
            class="form-select-search"
            placeholder="搜索..."
            type="text"
            @click.stop
        />
      </li>

      <!-- 选项列表 -->
      <li
          v-for="opt in filteredOptions"
          :key="opt.value"
          :class="{ selected: isSelected(opt.value) }"
          class="form-select-option"
          @click="toggleOption(opt.value)"
      >
        {{ opt.label }}
      </li>
      <li v-if="filteredOptions.length === 0" class="form-select-empty">
        无匹配选项
      </li>
    </ul>

    <!-- 背景点击遮罩 -->
    <div v-if="isOpen" class="form-select-backdrop" @click="closeDropdown"></div>

    <!-- 错误提示 -->
    <p v-if="error" class="form-select-error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import {Options} from '@/types'

// 生成唯一 ID
const id = `form-select-multi-${Math.random().toString(36).substr(2, 9)}`

// Props
const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  name: String,
  label: String,
  placeholder: {
    type: String,
    default: '请选择...'
  },
  options: {
    type: Array as PropType<Options[]>,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  wrapperClass: {
    type: String,
    default: ''
  },
  searchable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>()

// 状态
const isOpen = ref(false)
const searchKeyword = ref('')

// 打开/关闭下拉
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
const openDropdown = () => {
  isOpen.value = true
}
const closeDropdown = () => {
  isOpen.value = false
  searchKeyword.value = '' // 可选：关闭时清空搜索
}

// 过滤选项
const filteredOptions = computed(() => {
  if (!searchKeyword.value) return props.options
  const kw = searchKeyword.value.toLowerCase()
  return props.options.filter(opt =>
      opt.label.toLowerCase().includes(kw) ||
      opt.value.toLowerCase().includes(kw)
  )
})

// 获取当前选中的选项对象
const selectedOptions = computed(() =>
    props.options.filter(opt => props.modelValue.includes(opt.value))
)

// 获取选中的标签文字（用于占位符）
const selectedLabels = computed(() => props.modelValue)

// 是否已选中
const isSelected = (value: string) => props.modelValue.includes(value)

// 切换选项
const toggleOption = (value: string) => {
  const newValue = isSelected(value)
      ? props.modelValue.filter(v => v !== value)
      : [...props.modelValue, value]
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 移除某个选项
const removeOption = (value: string) => {
  const newValue = props.modelValue.filter(v => v !== value)
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// 点击外部关闭
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const wrapper = document.getElementById(id)
  if (wrapper && !wrapper.contains(target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 监听 modelValue 变化（外部控制）
watch(
    () => props.modelValue,
    (newVal) => {
      // 可在这里做额外逻辑
    }
)
</script>

<style scoped>
.form-select-multiple-wrapper {
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  user-select: none;
}

.form-select-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 触发区域 */
.form-select-multiple-trigger {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  min-height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  align-items: center;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-select-multiple-trigger.is-focused {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-select-multiple-trigger.has-error {
  border-color: #dc3545;
}

.form-select-multiple-trigger.has-error.is-focused {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
}

.form-select-placeholder {
  color: #999;
  font-size: 14px;
  padding: 2px 0;
}

.form-select-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
}

.form-select-tag {
  display: inline-flex;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 13px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form-select-tag-remove {
  margin-left: 6px;
  color: white;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  opacity: 0.8;
}

.form-select-tag-remove:hover {
  opacity: 1;
}

/* 下拉箭头 */
.form-select-arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
  transform: rotate(45deg);
  transition: transform 0.2s;
  margin-left: auto;
}

.form-select-arrow.open {
  transform: rotate(-135deg);
}

/* 下拉菜单 */
.form-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 6px;
}

.form-select-option {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.1s;
}

.form-select-option:hover {
  background-color: #f5f5f5;
}

.form-select-option.selected {
  background-color: #e3f2fd;
  color: #007bff;
  font-weight: 500;
}

.form-select-search-li {
  padding: 8px 12px 4px;
}

.form-select-search {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
}

.form-select-empty {
  padding: 12px;
  color: #999;
  font-size: 13px;
  text-align: center;
}

/* 遮罩层 */
.form-select-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
</style>
