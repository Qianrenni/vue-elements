<!--
 * @component QTreeSelect
 * @description 树选择组件：数据驱动下拉树，支持展开/收起、单选，对齐 Ant Design TreeSelect 常用能力。
 -->
<template>
  <div
    ref="rootEl"
    class="q-tree-select"
    :class="{ 'q-tree-select--disabled': isDisabled }"
  >
    <!-- 触发器 -->
    <button
      type="button"
      class="q-tree-select-trigger"
      :disabled="isDisabled"
      aria-haspopup="listbox"
      :aria-expanded="open"
      @click="toggleOpen"
    >
      <span v-if="selectedItem" class="q-tree-select-value">
        {{ selectedItem.label }}
      </span>
      <span v-else class="q-tree-select-placeholder">{{
        props.placeholder
      }}</span>
      <span
        v-if="props.allowClear && selectedItem && !isDisabled"
        class="q-tree-select-clear"
        @click.stop="onClear"
      >
        <QIcon icon="Close" size="12" />
      </span>
      <span class="q-tree-select-arrow" aria-hidden="true">▾</span>
    </button>

    <!-- 下拉树 -->
    <div v-show="open" ref="dropdownRef" class="q-tree-select-dropdown">
      <ul v-if="visibleFlat.length" class="q-tree-select-list" role="listbox">
        <li
          v-for="node in visibleFlat"
          :key="node.value"
          :class="{
            'q-tree-select-node--selected': node.value === props.modelValue,
            'q-tree-select-node--disabled': node.disabled || !node.selectable,
          }"
          class="q-tree-select-node"
          role="option"
          :style="{ paddingLeft: `${12 + node.depth * 18}px` }"
          @click="onNodeClick(node)"
        >
          <span
            class="q-tree-select-suffix"
            aria-hidden="true"
            @click.stop="
              node.hasChildren ? toggleExpand(node.value) : undefined
            "
          >
            <span
              v-if="node.hasChildren"
              :class="{ expanded: isExpanded(node.value) }"
              class="q-tree-select-caret"
            >
              ▸
            </span>
          </span>
          <span class="q-tree-select-label">{{ node.label }}</span>
        </li>
      </ul>
      <div v-else class="q-tree-select-empty">暂无数据</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';

import { useTreeSelect } from './composable';
import type { FlatTreeItem } from './composable';
import type { TreeSelectEmits, TreeSelectProps } from './type';

defineOptions({ name: 'QTreeSelect' });

const props = withDefaults(defineProps<TreeSelectProps>(), {
  items: () => [],
  placeholder: '请选择',
  disabled: false,
  allowClear: true,
  expandAll: true,
  modelValue: undefined,
});

const emit = defineEmits<TreeSelectEmits>();

const {
  visibleFlat,
  isExpanded,
  toggleExpand,
  selectedItem,
  isDisabled,
  selectNode,
  clear,
} = useTreeSelect(props, emit);

/** 弹层开关 */
const open = ref(false);
/** 根元素（外点关闭判定） */
const rootRef = useTemplateRef<HTMLElement>('rootEl');
const dropdownRef = useTemplateRef<HTMLElement>('dropdownRef');

function toggleOpen() {
  if (isDisabled.value) return;
  open.value = !open.value;
}

/** 清空 */
function onClear() {
  clear();
}

/** 点击节点：可选中项选中并关闭 */
function onNodeClick(node: FlatTreeItem) {
  if (node.disabled || !node.selectable) return;
  selectNode(node.value);
  open.value = false;
}

/** 点击外部关闭 */
function onDocClick(e: MouseEvent) {
  const target = e.target as Node;
  if (rootRef.value?.contains(target) || dropdownRef.value?.contains(target))
    return;
  open.value = false;
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
.q-tree-select {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: var(--q-font-size-sm);
  color: var(--q-color-text);
}

.q-tree-select-trigger {
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

.q-tree-select-trigger:hover:not(:disabled),
.q-tree-select-trigger[aria-expanded='true'] {
  border-color: var(--q-color-primary);
}

.q-tree-select--disabled .q-tree-select-trigger {
  background: var(--q-color-bg-secondary);
  cursor: not-allowed;
  color: var(--q-color-text-tertiary);
}

.q-tree-select-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.q-tree-select-placeholder {
  flex: 1;
  color: var(--q-color-text-tertiary);
}

.q-tree-select-clear {
  display: inline-flex;
  flex: none;
  color: var(--q-color-text-muted);
  cursor: pointer;
}

.q-tree-select-arrow {
  flex: none;
  margin-left: var(--q-space-2);
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-xs);
}

/* — 下拉树 — */
.q-tree-select-dropdown {
  position: absolute;
  top: calc(100% + var(--q-space-1));
  left: 0;
  right: 0;
  z-index: var(--z-index-level-3);
  box-sizing: border-box;
  max-height: 260px;
  overflow: auto;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  box-shadow: var(--q-shadow-md);
}

.q-tree-select-list {
  margin: 0;
  padding: var(--q-space-1) 0;
  list-style: none;
}

.q-tree-select-node {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 30px;
  cursor: pointer;
  white-space: nowrap;
}

.q-tree-select-node:hover:not(.q-tree-select-node--disabled) {
  background: var(--q-color-primary-lighter);
}

.q-tree-select-node--selected {
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-semibold);
}

.q-tree-select-node--disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-tree-select-suffix {
  display: inline-flex;
  align-items: center;
  width: 16px;
  flex: none;
}

.q-tree-select-caret {
  display: inline-block;
  font-size: var(--q-font-size-xs);
  color: var(--q-color-text-muted);
  transition: transform var(--q-duration-fast, 150ms) ease;
}

.q-tree-select-caret.expanded {
  transform: rotate(90deg);
}

.q-tree-select-empty {
  padding: var(--q-space-4);
  text-align: center;
  color: var(--q-color-text-tertiary);
}
</style>
