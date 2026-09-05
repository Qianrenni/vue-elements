<!--
 * @component QTable
 * @description 通用数据表格：dataSource+columns、排序 sorter、筛选 filters、分页 pagination、展开 expandable（树形/行级）、行选择 rowSelection。对齐 Ant Design Table 常用能力。
 -->
<template>
  <div class="q-table" :class="rootClasses" @click="closeFilter">
    <div class="q-table-container">
      <table
        class="q-table-element"
        :class="[
          sizeClass,
          {
            'q-table-element--bordered': bordered,
            'q-table-element--loading': loading,
          },
        ]"
      >
        <thead v-if="showHeader">
          <tr class="q-table-row q-table-row--head">
            <th
              v-if="hasSelection"
              class="q-table-col-select q-table-col-head"
              :style="selectionColStyle"
            >
              <span v-if="selectionColumnTitle">{{
                selectionColumnTitle
              }}</span>
              <input
                v-else-if="selectionType === 'checkbox'"
                :aria-label="'全选'"
                :checked="isAllSelected"
                :disabled="loading || selectableCount === 0"
                :indeterminate.prop="isIndeterminate || undefined"
                class="q-table-check"
                type="checkbox"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-if="hasExpandCol"
              class="q-table-col-expand q-table-col-head"
            />
            <th
              v-for="info in columnsInfo"
              :key="info.key"
              class="q-table-col-head q-table-col-data"
              :class="alignClass(info.column.align)"
              :style="{ width: info.widthStyle || undefined }"
              scope="col"
            >
              <div class="q-table-th">
                <span class="q-table-th-title">{{ info.column.title }}</span>
                <span
                  v-if="info.sorterEnabled || info.filterEnabled"
                  class="q-table-th-tools"
                >
                  <span
                    v-if="info.sorterEnabled"
                    class="q-table-sort"
                    :class="sortClass(info.headerSortOrder)"
                    role="group"
                    :aria-label="`${info.column.title}排序`"
                  >
                    <button
                      :aria-label="`${info.column.title}升序`"
                      :aria-pressed="
                        info.headerSortOrder === 'ascend' ? 'true' : 'false'
                      "
                      class="q-table-caret q-table-caret--up"
                      title="升序"
                      type="button"
                      @click.stop="clickSortDirection(info.column, 'ascend')"
                      @keydown.enter.prevent="
                        clickSortDirection(info.column, 'ascend')
                      "
                      @keydown.space.prevent="
                        clickSortDirection(info.column, 'ascend')
                      "
                    />
                    <button
                      :aria-label="`${info.column.title}降序`"
                      :aria-pressed="
                        info.headerSortOrder === 'descend' ? 'true' : 'false'
                      "
                      class="q-table-caret q-table-caret--down"
                      title="降序"
                      type="button"
                      @click.stop="clickSortDirection(info.column, 'descend')"
                      @keydown.enter.prevent="
                        clickSortDirection(info.column, 'descend')
                      "
                      @keydown.space.prevent="
                        clickSortDirection(info.column, 'descend')
                      "
                    />
                  </span>
                  <button
                    v-if="info.filterEnabled"
                    :aria-expanded="
                      activeFilterKey === info.key ? 'true' : 'false'
                    "
                    :aria-label="`${info.column.title}筛选`"
                    class="q-table-filter"
                    :class="{
                      'q-table-filter--active': isFilterApplied(info.key),
                    }"
                    title="筛选"
                    type="button"
                    @click.stop="openFilter(info.key)"
                  />
                </span>
              </div>
              <div
                v-if="info.filterEnabled && activeFilterKey === info.key"
                class="q-table-filter-panel"
                role="dialog"
                :aria-label="`${info.column.title}筛选`"
                @click.stop
              >
                <div class="q-table-filter-head">
                  <span class="q-table-filter-title">筛选</span>
                  <button
                    v-if="isFilterApplied(info.key)"
                    class="q-table-filter-clear"
                    type="button"
                    @click="resetFilter(info.key)"
                  >
                    清除
                  </button>
                </div>
                <label
                  v-for="opt in info.column.filters"
                  :key="String(opt.value)"
                  class="q-table-filter-option"
                >
                  <input
                    v-if="info.filterMultiple"
                    :checked="isFilterOptionChecked(info.key, opt.value)"
                    class="q-table-check"
                    type="checkbox"
                    @change="
                      toggleFilterOption(info.key, opt.value, info.column)
                    "
                  />
                  <input
                    v-else
                    :checked="isFilterOptionChecked(info.key, opt.value)"
                    class="q-table-check"
                    type="radio"
                    name="q-table-filter-radio"
                    @change="
                      toggleFilterOption(info.key, opt.value, info.column)
                    "
                  />
                  <span class="q-table-filter-option-text">{{ opt.text }}</span>
                </label>
                <div v-if="info.filterMultiple" class="q-table-filter-foot">
                  <button
                    class="q-table-btn"
                    type="button"
                    @click="resetFilter(info.key)"
                  >
                    重置
                  </button>
                  <button
                    class="q-table-btn q-table-btn--primary"
                    type="button"
                    @click="confirmFilter(info.key)"
                  >
                    确定
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="!isEmpty">
          <template v-for="(row, rowIndex) in displayRows" :key="row.key">
            <tr
              class="q-table-row q-table-row--body"
              :class="{
                'q-table-row--selected': isRowSelected(row.key),
                'q-table-row--clickable':
                  expandRowByClick && isRowExpandable(row.record, rowIndex),
              }"
              :aria-selected="
                hasSelection && isRowSelected(row.key) ? 'true' : undefined
              "
              @click="onRowClick(row, rowIndex)"
            >
              <td
                v-if="hasSelection"
                class="q-table-col-select q-table-col-body"
                :style="selectionColStyle"
              >
                <input
                  :aria-label="`选择第 ${rowIndex + 1} 行`"
                  :checked="isRowSelected(row.key)"
                  :disabled="isRowSelectionDisabled(row.record, rowIndex)"
                  class="q-table-check"
                  :type="selectionType === 'radio' ? 'radio' : 'checkbox'"
                  @change="toggleSelectRow(row.record, rowIndex)"
                />
              </td>
              <td
                v-if="hasExpandCol"
                class="q-table-col-expand q-table-col-body"
                @click.stop
              >
                <button
                  v-if="row.hasChildren"
                  :aria-expanded="row.expanded ? 'true' : 'false'"
                  :aria-label="row.expanded ? '折叠' : '展开'"
                  class="q-table-expand"
                  :class="{ 'q-table-expand--open': row.expanded }"
                  type="button"
                  @click="toggleExpand(row.key)"
                />
                <button
                  v-else-if="
                    hasRowRenderExpansion &&
                    isRowExpandable(row.record, rowIndex)
                  "
                  :aria-expanded="row.expanded ? 'true' : 'false'"
                  :aria-label="row.expanded ? '折叠' : '展开'"
                  class="q-table-expand"
                  :class="{ 'q-table-expand--open': row.expanded }"
                  type="button"
                  @click="toggleExpand(row.key)"
                />
              </td>
              <td
                v-for="(info, colIndex) in columnsInfo"
                :key="info.key"
                class="q-table-col-data q-table-col-body"
                :class="[
                  alignClass(info.column.align),
                  { 'q-table-col-data--ellipsis': info.column.ellipsis },
                ]"
                :style="[
                  info.widthStyle ? { width: info.widthStyle } : undefined,
                  firstDataIndent(row, colIndex)
                    ? { paddingLeft: `${indentSize * row.depth}px` }
                    : undefined,
                ]"
              >
                <slot
                  :column="info.column"
                  :index="rowIndex"
                  :name="info.dataIndexText"
                  :record="row.record"
                  :value="getCellValue(row.record, info.dataIndex)"
                >
                  <slot
                    :column="info.column"
                    :index="rowIndex"
                    :record="row.record"
                    name="bodyCell"
                    :value="getCellValue(row.record, info.dataIndex)"
                  >
                    <span class="q-table-cell-text">
                      {{ cellText(row.record, info.dataIndex) }}
                    </span>
                  </slot>
                </slot>
              </td>
            </tr>
            <tr
              v-if="
                row.expanded &&
                !row.hasChildren &&
                hasRowRenderExpansion &&
                isRowExpandable(row.record, rowIndex)
              "
              class="q-table-row q-table-row--expanded"
            >
              <td :colspan="visibleColCount" class="q-table-expanded-cell">
                <slot
                  :index="rowIndex"
                  :record="row.record"
                  name="expandedRowRender"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="isEmpty" class="q-table-empty">
        <slot name="empty">
          <QEmpty description="暂无数据" />
        </slot>
      </div>

      <div
        v-if="loading"
        class="q-table-loading"
        role="status"
        aria-label="加载中"
      >
        <span class="q-table-spinner" />
      </div>
    </div>

    <div
      v-if="paginationEnabled && totalCount > 0"
      class="q-table-pagination"
      :class="{ 'q-table-pagination--alone': !showSizeChanger }"
    >
      <span v-if="showTotal" class="q-table-total">共 {{ totalCount }} 条</span>
      <label v-if="showSizeChanger" class="q-table-size">
        每页
        <select
          :aria-label="'每页条数'"
          :value="pageSize"
          class="q-table-size-select"
          @change="
            handlePageSizeChange(
              Number(($event.target as HTMLSelectElement).value),
            )
          "
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        条
      </label>
      <QPagination
        :current-page="currentPage"
        :max-visible-pages="maxVisiblePages"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { QPagination } from '@/components/basic/Pagination';
import { QEmpty } from '@/components/display/Empty';
import { computed, type StyleValue, useSlots } from 'vue';

import { type TableDisplayRow, useQTable } from './composable';
import type {
  QTableColumn,
  QTableEmits,
  QTableProps,
  TableDataIndex,
} from './type';

defineOptions({ name: 'QTable' });

const props = withDefaults(defineProps<QTableProps<T>>(), {
  dataSource: () => [],
  columns: () => [],
  rowKey: undefined,
  loading: false,
  size: 'middle',
  bordered: false,
  showHeader: true,
  pagination: true,
  current: undefined,
  pageSize: undefined,
  rowSelection: undefined,
  selectedRowKeys: undefined,
  expandable: undefined,
  expandedRowKeys: undefined,
});

const emit = defineEmits<QTableEmits<T>>();

const slots = useSlots();

const {
  columnsInfo,
  visibleColCount,
  showHeader,
  hasSelection,
  selectionType,
  hasExpandCol,
  hasRowRenderExpansion,
  displayRows,
  isEmpty,
  activeFilterKey,
  clickSortDirection,
  openFilter,
  closeFilter,
  isFilterOptionChecked,
  toggleFilterOption,
  confirmFilter,
  resetFilter,
  paginationEnabled,
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  showSizeChanger,
  pageSizeOptions,
  showTotal,
  maxVisiblePages,
  handlePageChange,
  handlePageSizeChange,
  isRowSelected,
  isRowSelectionDisabled,
  toggleSelectRow,
  isAllSelected,
  isIndeterminate,
  toggleSelectAll,
  isRowExpandable,
  toggleExpand,
  onRowClick,
  expandRowByClick,
  indentSize,
  getCellValue,
  appliedFilters,
} = useQTable<T>(props, emit, {
  hasExpandedRowSlot: !!slots.expandedRowRender,
});

const rootClasses = computed(() => ({
  'q-table--bordered': props.bordered,
  'q-table--loading': props.loading,
}));

const sizeClass = computed(() => `q-table-size--${props.size}`);

const selectionColumnTitle = computed(
  () => props.rowSelection?.columnTitle ?? '',
);

const selectionColStyle = computed<StyleValue>(() => {
  const width = props.rowSelection?.columnWidth ?? 32;
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  return { width: widthStyle, minWidth: widthStyle };
});

const selectableCount = computed(
  () =>
    displayRows.value.filter((row, i) => !isRowSelectionDisabled(row.record, i))
      .length,
);

const alignClass = (align: QTableColumn<T>['align']) =>
  align === 'center'
    ? 'q-table-align--center'
    : align === 'right'
      ? 'q-table-align--right'
      : 'q-table-align--left';

const sortClass = (order: string | null) =>
  order === 'ascend'
    ? 'q-table-sort--asc'
    : order === 'descend'
      ? 'q-table-sort--desc'
      : '';

/** 是否列有应用筛选 */
const isFilterApplied = (key: string): boolean =>
  (appliedFilters.value[key] ?? []).length > 0;

/** 读取单元格文本（供默认渲染） */
const cellText = (record: T, dataIndex: TableDataIndex | undefined): string => {
  const value = getCellValue(record, dataIndex);
  if (value === null || value === undefined) return '';
  return String(value);
};

/** 首列树形缩进 */
const firstDataIndent = (row: TableDisplayRow<T>, colIndex: number): boolean =>
  row.depth > 0 && colIndex === 0;
</script>

<style scoped>
.q-table {
  width: 100%;
  color: var(--q-color-text);
  font-size: var(--q-font-size-sm, 14px);
  box-sizing: border-box;
}

.q-table *,
.q-table *::before,
.q-table *::after {
  box-sizing: border-box;
}

/* ---------- 尺寸 ---------- */
.q-table-size--small {
  font-size: var(--q-font-size-xs, 12px);
}
.q-table-size--large {
  font-size: var(--q-font-size-base, 14px);
}
.q-table-size--small .q-table-col-head,
.q-table-size--small .q-table-col-body {
  padding: 4px 8px;
}
.q-table-size--middle .q-table-col-head,
.q-table-size--middle .q-table-col-body {
  padding: 8px 12px;
}
.q-table-size--large .q-table-col-head,
.q-table-size--large .q-table-col-body {
  padding: 12px 16px;
}

.q-table-container {
  position: relative;
  width: 100%;
}

.q-table-element {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: var(--q-color-bg-card);
  table-layout: auto;
}

/* ---------- 单元格基础 ---------- */
.q-table-col-head,
.q-table-col-body {
  border-bottom: 1px solid var(--q-color-gray-100, #f1f1f1);
  text-align: left;
  vertical-align: middle;
  transition: background-color 0.15s ease;
}

.q-table-col-head {
  background-color: var(--q-color-bg-secondary, #f5f5f5);
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
  white-space: nowrap;
  position: relative;
}

.q-table-align--center {
  text-align: center;
}
.q-table-align--right {
  text-align: right;
}
.q-table-col-data--ellipsis {
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.q-table-col-data--ellipsis .q-table-cell-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---------- 边框 ---------- */
.q-table-element--bordered {
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 6px);
}
.q-table-element--bordered .q-table-col-head,
.q-table-element--bordered .q-table-col-body {
  border-right: 1px solid var(--q-color-gray-100, #f1f1f1);
}
.q-table-element--bordered .q-table-col-head:last-child,
.q-table-element--bordered .q-table-col-body:last-child {
  border-right: none;
}

/* ---------- 行 ---------- */
.q-table-row--body:hover .q-table-col-body {
  background-color: var(--q-color-primary-lighter, #fbf6ee);
}
.q-table-row--selected .q-table-col-body {
  background-color: var(--q-color-primary-light, #f4eadd);
}
.q-table-row--clickable {
  cursor: pointer;
}
.q-table-row--expanded .q-table-expanded-cell {
  padding: var(--q-space-3, 12px);
  background-color: var(--q-color-bg);
  border-bottom: 1px solid var(--q-color-gray-100, #f1f1f1);
}

/* ---------- 选择 / 展开 列 ---------- */
.q-table-col-select,
.q-table-col-expand {
  width: 32px;
  text-align: center;
  white-space: nowrap;
}
.q-table-col-expand {
  width: 40px;
}
.q-table-size--small .q-table-col-expand {
  width: 32px;
}

.q-table-check {
  accent-color: var(--q-color-primary);
  cursor: pointer;
  vertical-align: middle;
  margin: 0;
}
.q-table-check:disabled {
  cursor: not-allowed;
}

/* 展开箭头 */
.q-table-expand {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--q-color-text-secondary);
  position: relative;
  border-radius: var(--q-radius-sm, 4px);
  transition:
    color 0.15s ease,
    transform 0.15s ease;
}
.q-table-expand::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 7px;
  width: 0;
  height: 0;
  border-left: 4px solid currentColor;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
}
.q-table-expand--open {
  color: var(--q-color-primary);
}
.q-table-expand--open::before {
  transform: rotate(90deg);
}
.q-table-expand:hover {
  color: var(--q-color-primary);
  background-color: var(--q-color-gray-100);
}

/* ---------- 表头内容 ---------- */
.q-table-th {
  display: flex;
  align-items: center;
  gap: var(--q-space-1, 4px);
}
.q-table-align--center .q-table-th {
  justify-content: center;
}
.q-table-align--right .q-table-th {
  justify-content: flex-end;
}
.q-table-th-title {
  flex: none;
}
.q-table-th-tools {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  flex: none;
}

/* 排序箭头组 */
.q-table-sort {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  color: var(--q-color-gray-400, #ced4da);
}
.q-table-caret {
  position: relative;
  width: 14px;
  height: 9px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: inherit;
}
.q-table-caret::before {
  content: '';
  position: absolute;
  left: 3px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}
.q-table-caret--up::before {
  top: 2px;
  border-bottom: 5px solid currentColor;
}
.q-table-caret--down::before {
  top: 3px;
  border-top: 5px solid currentColor;
}
.q-table-caret:hover {
  color: var(--q-color-text-secondary);
}
.q-table-sort--asc .q-table-caret--up,
.q-table-sort--desc .q-table-caret--down {
  color: var(--q-color-primary);
}

/* 筛选漏斗 */
.q-table-filter {
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--q-color-gray-400, #ced4da);
  position: relative;
  border-radius: 2px;
}
.q-table-filter::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid currentColor;
}
.q-table-filter::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 10px;
  width: 6px;
  height: 3px;
  background-color: currentColor;
  border-radius: 1px;
}
.q-table-filter:hover,
.q-table-filter--active {
  color: var(--q-color-primary);
}

/* ---------- 筛下列面板 ---------- */
.q-table-filter-panel {
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  z-index: 20;
  min-width: 128px;
  padding: var(--q-space-2, 8px);
  background-color: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 6px);
  box-shadow: var(--q-elevation-2, 0 4px 12px rgba(0, 0, 0, 0.12));
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.q-table-filter-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 6px;
  color: var(--q-color-text-secondary);
}
.q-table-filter-title {
  font-size: var(--q-font-size-xs, 12px);
  font-weight: var(--q-font-weight-semibold, 600);
}
.q-table-filter-clear {
  padding: 0;
  border: none;
  background: none;
  color: var(--q-color-primary);
  cursor: pointer;
  font-size: var(--q-font-size-xs, 12px);
}
.q-table-filter-option {
  display: flex;
  align-items: center;
  gap: var(--q-space-2, 8px);
  padding: 4px 4px;
  border-radius: var(--q-radius-sm, 4px);
  cursor: pointer;
  white-space: nowrap;
}
.q-table-filter-option:hover {
  background-color: var(--q-color-primary-lighter, #fbf6ee);
}
.q-table-filter-option-text {
  color: var(--q-color-text);
}
.q-table-filter-foot {
  display: flex;
  justify-content: flex-end;
  gap: var(--q-space-2, 8px);
  padding-top: 6px;
  margin-top: 4px;
  border-top: 1px solid var(--q-color-gray-100, #f1f1f1);
}
.q-table-btn {
  padding: 2px 10px;
  border: 1px solid var(--q-color-border-light);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm, 4px);
  cursor: pointer;
  font-size: var(--q-font-size-xs, 12px);
}
.q-table-btn:hover {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}
.q-table-btn--primary {
  border-color: var(--q-color-primary);
  background-color: var(--q-color-primary);
  color: var(--q-color-white, #fff);
}
.q-table-btn--primary:hover {
  background-color: var(--q-color-primary-hover);
  color: var(--q-color-white, #fff);
}

/* ---------- 空态 / 加载 ---------- */
.q-table-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--q-space-8, 32px);
  border-bottom: 1px solid var(--q-color-gray-100, #f1f1f1);
  background-color: var(--q-color-bg-card);
}
.q-table-loading {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
}
.q-table-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid var(--q-color-gray-200, #e9ecef);
  border-top-color: var(--q-color-primary);
  border-radius: 50%;
  animation: q-table-spin 0.7s linear infinite;
}
@keyframes q-table-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---------- 分页栏 ---------- */
.q-table-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--q-space-4, 16px);
  padding-top: var(--q-space-3, 12px);
  flex-wrap: wrap;
}
.q-table-pagination--alone {
  justify-content: center;
}
.q-table-total {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm, 14px);
}
.q-table-size {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-1, 4px);
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm, 14px);
}
.q-table-size-select {
  padding: 2px 4px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-sm, 4px);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  cursor: pointer;
  font-size: var(--q-font-size-sm, 14px);
}
</style>
