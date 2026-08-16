<!--
 * @component QFormTable
 * @description 表格表单组件，支持行选择（单选/多选/全选）、分页、列排序
 -->
<template>
  <div class="form-table-container" role="none">
    <label
      v-if="label"
      :id="id"
      :class="{
        'mouse-cursor-disable': disabled,
        'text-12rem': size === 'large',
        'text-08rem': size === 'small',
      }"
      :for="name"
    >
      {{ label }}:
    </label>

    <div
      class="scroll-container input-table-container"
      :class="[{ 'mouse-cursor-disable': disabled }]"
      :style="{ opacity: disabled ? 0.6 : 1 }"
    >
      <table
        :class="[
          {
            'table-small': size === 'small',
            'table-large': size === 'large',
            'text-08rem': size === 'small',
            'text-12rem': size === 'large',
          },
        ]"
        class="form-table"
      >
        <thead>
          <tr>
            <th v-if="selectable">
              <div
                :aria-checked="isAllSelected"
                :aria-label="'全选'"
                :class="[
                  {
                    selected: isAllSelected,
                  },
                ]"
                :tabindex="disabled ? -1 : 0"
                class="empty-select inverse"
                role="checkbox"
                @click="onToggleAllSelection()"
                @keydown.enter.prevent="onToggleAllSelection()"
                @keydown.space.prevent="onToggleAllSelection()"
              />
            </th>
            <th
              v-for="(col, index) in columns"
              :key="col.value"
              :style="{
                width: col.width || 'auto',
                paddingRight:
                  'order' in columns[index] ? `${ICON_SIZE[size]}px` : 'auto',
              }"
              class="form-table-header-item"
            >
              <span>{{ col.label }}</span>
              <QIcon
                v-if="'order' in columns[index]"
                :aria-label="`排序：${columns[index].order ? '降序' : '升序'}`"
                :size="ICON_SIZE[size]"
                :style="{
                  transform: `${columns[index].order ? 'rotateY(180deg)' : 'rotateY(0deg)'}
                  rotateZ(90deg) translateX(-50%)`,
                }"
                :tabindex="disabled ? -1 : 0"
                :title="columns[index].order ? '降序' : '升序'"
                class="sort-icon"
                icon="Switch"
                role="button"
                @click="sortChange(index)"
                @keydown.enter.prevent="sortChange(index)"
                @keydown.space.prevent="sortChange(index)"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="[
              {
                'row-selected': selectable && row.isSelected,
                'row-disabled': disabled,
              },
            ]"
          >
            <td v-if="selectable">
              <div
                :aria-checked="row.isSelected"
                :aria-label="`选择第 ${index + 1} 行`"
                :class="[
                  {
                    selected: row.isSelected,
                  },
                ]"
                :tabindex="disabled ? -1 : 0"
                class="empty-select"
                role="checkbox"
                @click="onSelectRow(row)"
                @keydown.enter.prevent="onSelectRow(row)"
                @keydown.space.prevent="onSelectRow(row)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
            >
              <slot
                :column="col"
                :name="col.value"
                :row="row"
                :value="getCellValue(row, col.value)"
              >
                <span>
                  {{ getCellValue(row, col.value) }}
                </span>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!localData.length" class="table-empty">暂无数据</div>
    </div>

    <div v-if="pagination" class="form-table-pagination">
      <QPagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :max-visible-pages="maxVisiblePages"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
import { QIcon } from '@/components/basic/Icon';
import { QPagination } from '@/components/basic/Pagination';

import { useFormTable } from './composable';
import type { FormTableEmits, FormTableProps } from './type';
import { ICON_SIZE } from './type';

defineOptions({
  name: 'QFormTable',
});

const props = withDefaults(defineProps<FormTableProps<T>>(), {
  required: false,
  direction: 'horizontal',
  disabled: false,
  readonly: false,
  size: 'middle',
  selectable: false,
  selectionMode: 'multiple',
  pagination: true,
  pageSize: 10,
  maxVisiblePages: 5,
});

const emit = defineEmits<FormTableEmits<T>>();

/**
 * 获取单元格值
 * @description 将类型断言收拢到 script 中，避免在模板里书写带尖括号的类型断言
 * @param row 当前行数据
 * @param key 列字段名
 * @returns 单元格值
 */
const getCellValue = (row: T, key: string): unknown =>
  (row as Record<string, unknown>)[key];

const {
  localData,
  currentPage,
  totalPages,
  paginatedData,
  isAllSelected,
  sortChange,
  getRowKey,
  handlePageChange,
  onSelectRow,
  onToggleAllSelection,
} = useFormTable<T>(props, emit);
</script>

<style lang="css" scoped></style>
