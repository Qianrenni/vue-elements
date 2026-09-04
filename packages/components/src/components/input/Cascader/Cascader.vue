<!--
 * @component QCascader
 * @description 级联选择组件：多列面板逐级下钻、changeOnSelect、搜索、懒加载，对齐 Ant Design Cascader。
 -->
<template>
  <div
    ref="rootEl"
    :class="[
      `q-cascader--${props.size}`,
      { 'q-cascader--disabled': isDisabled },
    ]"
    class="q-cascader"
  >
    <!-- 触发器 -->
    <button
      type="button"
      class="q-cascader-trigger"
      :disabled="isDisabled"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="toggleOpen"
    >
      <span v-if="hasValue" class="q-cascader-value">{{ displayText }}</span>
      <span v-else class="q-cascader-placeholder">{{ props.placeholder }}</span>
      <span
        v-if="props.allowClear && hasValue && !isDisabled"
        class="q-cascader-clear"
        @click.stop="onClear"
      >
        <QIcon icon="Close" size="12" />
      </span>
      <span class="q-cascader-arrow" aria-hidden="true">▾</span>
    </button>

    <!-- 弹层 -->
    <div v-show="open" class="q-cascader-dropdown">
      <!-- 搜索头 -->
      <div v-if="props.showSearch" class="q-cascader-search">
        <input
          v-model="searchText"
          :placeholder="props.searchPlaceholder"
          class="q-cascader-search-input"
          type="text"
        />
      </div>

      <!-- 搜索结果（单列） -->
      <div
        v-if="props.showSearch && searchText"
        class="q-cascader-search-list"
        role="listbox"
      >
        <div
          v-for="(item, i) in searchResults"
          :key="`${item.pathValues.join('-')}-${i}`"
          :class="{ 'q-cascader-search-item--disabled': item.node.disabled }"
          class="q-cascader-search-item"
          role="option"
          @click="onSearchPick(item)"
        >
          {{ item.labels.join(separator) }}
        </div>
        <div v-if="!searchResults.length" class="q-cascader-empty">
          无匹配项
        </div>
      </div>

      <!-- 多列面板 -->
      <div v-else class="q-cascader-cols">
        <div
          v-for="(col, level) in columns"
          :key="level"
          class="q-cascader-col"
        >
          <div
            v-for="node in col"
            :key="node.value"
            :class="{
              'q-cascader-option--active': isActiveValue(node.value, level),
              'q-cascader-option--disabled': node.disabled,
            }"
            class="q-cascader-option"
            @click="onOptionClick(node, level)"
          >
            <span class="q-cascader-option-label">{{ node.label }}</span>
            <span
              v-if="node.children?.length"
              class="q-cascader-option-caret"
              aria-hidden="true"
              >›</span
            >
            <span v-else-if="isLoading(node, level)" class="q-cascader-loading"
              >…</span
            >
          </div>
        </div>
        <div v-if="!treeData.length" class="q-cascader-empty">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { computed, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';

import { useCascader } from './composable';
import type { SearchMatch } from './composable';
import type { CascaderEmits, CascaderOption, CascaderProps } from './type';

defineOptions({ name: 'QCascader' });

const props = withDefaults(defineProps<CascaderProps>(), {
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  allowClear: true,
  separator: '/',
  changeOnSelect: false,
  showSearch: false,
  searchPlaceholder: '输入搜索',
  size: 'middle',
});

const emit = defineEmits<CascaderEmits>();

const {
  treeData,
  columns,
  searchText,
  searchResults,
  displayText,
  isDisabled,
  isActiveValue,
  isLoading,
  handleOptionClick,
  handleSearchPick,
  resetPathForOpen,
  clear,
} = useCascader(props, emit);

const separator = props.separator ?? '/';
const hasValue = computed(
  () => !!props.modelValue && props.modelValue.length > 0,
);

/** 展开状态 */
const open = ref(false);
const rootEl = useTemplateRef<HTMLElement>('rootEl');

function toggleOpen() {
  if (isDisabled.value) return;
  open.value = !open.value;
  if (open.value) {
    resetPathForOpen();
    searchText.value = '';
  }
}

function closeDropdown() {
  open.value = false;
}

async function onOptionClick(node: CascaderOption, level: number) {
  const action = await handleOptionClick(node, level);
  if (action === 'close') closeDropdown();
}

async function onSearchPick(item: SearchMatch) {
  const action = await handleSearchPick(item);
  if (action === 'close') closeDropdown();
}

function onClear() {
  clear();
}

/** 点击外部关闭 */
function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (rootEl.value?.contains(target)) return;
  closeDropdown();
}

watch(open, (v) => {
  if (v) document.addEventListener('click', onDocClick);
  else document.removeEventListener('click', onDocClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick);
});
</script>

<style scoped>
.q-cascader {
  position: relative;
  display: inline-block;
  width: 100%;
  color: var(--q-color-text);
}

.q-cascader-trigger {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 var(--q-space-3);
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: var(--q-transition-border);
}

.q-cascader--small .q-cascader-trigger {
  height: 24px;
  font-size: var(--q-font-size-xs);
}

.q-cascader--middle .q-cascader-trigger {
  height: 32px;
  font-size: var(--q-font-size-sm);
}

.q-cascader--large .q-cascader-trigger {
  height: 40px;
  font-size: var(--q-font-size-base);
}

.q-cascader-trigger:hover:not(:disabled),
.q-cascader-trigger[aria-expanded='true'] {
  border-color: var(--q-color-primary);
}

.q-cascader--disabled .q-cascader-trigger {
  background: var(--q-color-bg-secondary);
  cursor: not-allowed;
  color: var(--q-color-text-tertiary);
}

.q-cascader-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.q-cascader-placeholder {
  flex: 1;
  color: var(--q-color-text-tertiary);
}

.q-cascader-clear {
  display: inline-flex;
  flex: none;
  color: var(--q-color-text-muted);
  cursor: pointer;
}

.q-cascader-arrow {
  flex: none;
  margin-left: var(--q-space-2);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-xs);
}

/* — 弹层 — */
.q-cascader-dropdown {
  position: absolute;
  top: calc(100% + var(--q-space-1));
  left: 0;
  z-index: var(--z-index-level-3);
  box-sizing: border-box;
  min-width: 200px;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  box-shadow: var(--q-shadow-md);
}

.q-cascader-search {
  padding: var(--q-space-2);
  border-bottom: 1px solid var(--q-color-border-light);
}

.q-cascader-search-input {
  box-sizing: border-box;
  width: 100%;
  height: 26px;
  padding: 0 var(--q-space-2);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm);
  outline: none;
  background: var(--q-color-bg-secondary);
  color: var(--q-color-text);
  font: inherit;
  font-size: var(--q-font-size-xs);
}

.q-cascader-search-input:focus {
  border-color: var(--q-color-primary);
}

/* — 多列 — */
.q-cascader-cols {
  display: flex;
  max-height: 220px;
  overflow-x: auto;
}

.q-cascader-col {
  flex: none;
  min-width: 128px;
  max-height: 220px;
  padding: var(--q-space-1) 0;
  overflow-y: auto;
}

.q-cascader-col + .q-cascader-col {
  border-left: 1px solid var(--q-color-border-light);
}

.q-cascader-option {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
  padding: 0 var(--q-space-3);
  cursor: pointer;
  white-space: nowrap;
}

.q-cascader-option:hover:not(.q-cascader-option--disabled) {
  background: var(--q-color-primary-lighter);
}

.q-cascader-option--active {
  background: var(--q-color-primary-lighter);
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-semibold);
}

.q-cascader-option--disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-cascader-option-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-cascader-option-caret {
  flex: none;
  margin-left: var(--q-space-2);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-sm);
}

.q-cascader-loading {
  flex: none;
  margin-left: var(--q-space-2);
  color: var(--q-color-text-tertiary);
  font-size: var(--q-font-size-xs);
}

/* — 搜索单列 — */
.q-cascader-search-list {
  max-height: 220px;
  overflow-y: auto;
  padding: var(--q-space-1) 0;
}

.q-cascader-search-item {
  box-sizing: border-box;
  height: 30px;
  padding: 0 var(--q-space-3);
  line-height: 30px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.q-cascader-search-item:hover:not(.q-cascader-search-item--disabled) {
  background: var(--q-color-primary-lighter);
}

.q-cascader-search-item--disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-cascader-empty {
  padding: var(--q-space-4);
  text-align: center;
  color: var(--q-color-text-tertiary);
}
</style>
