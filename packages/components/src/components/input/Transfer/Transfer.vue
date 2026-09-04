<!--
 * @component QTransfer
 * @description 穿梭框组件：左右面板勾选/全选/搜索、双击或按钮移动、单向模式，对齐 Ant Design Transfer。
 -->
<template>
  <div
    :class="[
      `q-transfer--${props.size}`,
      { 'q-transfer--disabled': isDisabled },
    ]"
    class="q-transfer"
  >
    <!-- 左面板 -->
    <section class="q-transfer-panel">
      <header class="q-transfer-header">
        <span class="q-transfer-title">{{ titles[0] }}</span>
        <input
          v-if="props.showSelectAll"
          type="checkbox"
          class="q-transfer-all"
          :checked="isLeftAll"
          :disabled="isDisabled"
          :indeterminate.prop="isLeftIndeterminate"
          aria-label="全选左侧"
          @click.prevent.stop="onToggleAll('left')"
        />
      </header>

      <div v-if="props.showSearch" class="q-transfer-search">
        <input
          v-model="leftSearch"
          :placeholder="searchPlaceholder[0]"
          class="q-transfer-search-input"
          type="text"
        />
      </div>

      <ul class="q-transfer-list">
        <li
          v-for="item in filteredLeft"
          :key="item.key"
          :class="{
            'q-transfer-item--checked': isChecked('left', item.key),
            'q-transfer-item--disabled': item.disabled,
          }"
          class="q-transfer-item"
          @click="onToggleItem('left', item)"
          @dblclick.prevent="onMoveOne('left', item)"
        >
          <input
            type="checkbox"
            class="q-transfer-item-check"
            :checked="isChecked('left', item.key)"
            :disabled="item.disabled || isDisabled"
            @click.prevent.stop="onToggleItem('left', item)"
          />
          <div class="q-transfer-item-body">
            <div class="q-transfer-item-title">{{ item.title }}</div>
            <p v-if="item.description" class="q-transfer-item-desc">
              {{ item.description }}
            </p>
          </div>
        </li>
        <li v-if="!filteredLeft.length" class="q-transfer-empty">暂无数据</li>
      </ul>
    </section>

    <!-- 操作列 -->
    <div class="q-transfer-operation">
      <button
        type="button"
        class="q-transfer-btn q-transfer-btn--right"
        :disabled="!canMoveRight"
        aria-label="向右移动"
        @click="moveRight()"
      >
        {{ operationText[0] }}
      </button>
      <button
        type="button"
        class="q-transfer-btn q-transfer-btn--left"
        :disabled="!canMoveLeft"
        aria-label="向左移动"
        @click="moveLeft()"
      >
        {{ operationText[1] }}
      </button>
    </div>

    <!-- 右面板 -->
    <section class="q-transfer-panel">
      <header class="q-transfer-header">
        <span class="q-transfer-title">{{ titles[1] }}</span>
        <input
          v-if="props.showSelectAll"
          type="checkbox"
          class="q-transfer-all"
          :checked="isRightAll"
          :disabled="isDisabled"
          :indeterminate.prop="isRightIndeterminate"
          aria-label="全选右侧"
          @click.prevent.stop="onToggleAll('right')"
        />
      </header>

      <div v-if="props.showSearch" class="q-transfer-search">
        <input
          v-model="rightSearch"
          :placeholder="searchPlaceholder[1]"
          class="q-transfer-search-input"
          type="text"
        />
      </div>

      <ul class="q-transfer-list">
        <li
          v-for="item in filteredRight"
          :key="item.key"
          :class="{
            'q-transfer-item--checked': isChecked('right', item.key),
            'q-transfer-item--disabled': item.disabled,
          }"
          class="q-transfer-item"
          @click="onToggleItem('right', item)"
          @dblclick.prevent="onMoveOne('right', item)"
        >
          <input
            type="checkbox"
            class="q-transfer-item-check"
            :checked="isChecked('right', item.key)"
            :disabled="item.disabled || isDisabled"
            @click.prevent.stop="onToggleItem('right', item)"
          />
          <div class="q-transfer-item-body">
            <div class="q-transfer-item-title">{{ item.title }}</div>
            <p v-if="item.description" class="q-transfer-item-desc">
              {{ item.description }}
            </p>
          </div>
        </li>
        <li v-if="!filteredRight.length" class="q-transfer-empty">暂无数据</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useTransfer } from './composable';
import type { TransferItem } from './type';
import type { TransferDirection, TransferEmits, TransferProps } from './type';

defineOptions({ name: 'QTransfer' });

const props = withDefaults(defineProps<TransferProps>(), {
  dataSource: () => [],
  modelValue: () => [],
  titles: () => ['', ''] as [string, string],
  operations: () => ['', ''] as [string, string],
  disabled: false,
  showSearch: false,
  searchPlaceholder: () => ['搜索', '搜索'] as [string, string],
  oneWay: false,
  showSelectAll: true,
  size: 'middle',
});

const emit = defineEmits<TransferEmits>();

const {
  filteredLeft,
  filteredRight,
  leftSearch,
  rightSearch,
  isDisabled,
  isLeftAll,
  isLeftIndeterminate,
  isRightAll,
  isRightIndeterminate,
  canMoveRight,
  canMoveLeft,
  isChecked,
  toggleItem,
  toggleAll,
  moveRight,
  moveLeft,
} = useTransfer(props, emit);

/** 操作按钮文案（空串用图标） */
const operationText = computed<[string, string]>(() => [
  props.operations?.[0] || '›',
  props.operations?.[1] || '‹',
]);

function onToggleItem(side: TransferDirection, item: TransferItem) {
  toggleItem(side, item.key);
}

function onToggleAll(side: TransferDirection) {
  toggleAll(side);
}

/** 双击移动到另一侧 */
function onMoveOne(side: TransferDirection, item: TransferItem) {
  if (item.disabled || isDisabled.value) return;
  if (side === 'left') moveRight([item.key]);
  else moveLeft([item.key]);
}
</script>

<style scoped>
.q-transfer {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  width: 100%;
  color: var(--q-color-text);
}

.q-transfer-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
}

.q-transfer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 36px;
  padding: 0 var(--q-space-3);
  background: var(--q-color-bg-secondary);
  border-bottom: 1px solid var(--q-color-border-light);
}

.q-transfer-title {
  font-weight: var(--q-font-weight-semibold);
  font-size: var(--q-font-size-sm);
}

.q-transfer-all {
  cursor: pointer;
  accent-color: var(--q-color-primary);
}

.q-transfer-all:disabled {
  cursor: not-allowed;
}

.q-transfer-search {
  padding: var(--q-space-2);
  border-bottom: 1px solid var(--q-color-border-light);
}

.q-transfer-search-input {
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

.q-transfer-search-input:focus {
  border-color: var(--q-color-primary);
}

.q-transfer-list {
  flex: 1;
  margin: 0;
  padding: var(--q-space-1);
  list-style: none;
  overflow-y: auto;
  min-height: 0;
}

.q-transfer-item {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 var(--q-space-2);
  border-radius: var(--q-radius-sm);
  cursor: pointer;
}

.q-transfer--small .q-transfer-item {
  height: 28px;
}

.q-transfer--middle .q-transfer-item {
  height: 32px;
}

.q-transfer--large .q-transfer-item {
  height: 40px;
}

.q-transfer-item:hover:not(.q-transfer-item--disabled) {
  background: var(--q-color-primary-lighter);
}

.q-transfer-item--checked {
  background: var(--q-color-primary-lighter);
}

.q-transfer-item--disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

.q-transfer-item-check {
  flex: none;
  margin: 0 var(--q-space-2) 0 0;
  cursor: pointer;
  accent-color: var(--q-color-primary);
}

.q-transfer-item--disabled .q-transfer-item-check,
.q-transfer-item-check:disabled {
  cursor: not-allowed;
}

.q-transfer-item-body {
  flex: 1;
  min-width: 0;
}

.q-transfer-item-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--q-font-size-sm);
}

.q-transfer-item-desc {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--q-color-text-tertiary);
  font-size: var(--q-font-size-xs);
}

.q-transfer-empty {
  padding: var(--q-space-4);
  text-align: center;
  color: var(--q-color-text-tertiary);
  font-size: var(--q-font-size-xs);
}

/* — 操作列 — */
.q-transfer-operation {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--q-space-3);
  padding: 0 var(--q-space-3);
}

.q-transfer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  padding: 0;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-full);
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
  line-height: 1;
  cursor: pointer;
  transition: var(--q-transition-color), var(--q-transition-border);
}

.q-transfer-btn:hover:not(:disabled) {
  color: var(--q-color-primary);
  border-color: var(--q-color-primary);
}

.q-transfer-btn:disabled {
  color: var(--q-color-text-tertiary);
  cursor: not-allowed;
}

/* — 禁用整体 — */
.q-transfer--disabled .q-transfer-item {
  cursor: not-allowed;
}
</style>
