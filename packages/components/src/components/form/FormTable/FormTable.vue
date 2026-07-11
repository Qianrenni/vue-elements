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
                class="empty-select inverse"
                :class="[
                  {
                    selected: isAllSelected,
                  },
                ]"
                @click="onToggleAllSelection()"
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
                :size="ICON_SIZE[size]"
                :style="{
                  transform: `${columns[index].order ? 'rotateY(180deg)' : 'rotateY(0deg)'}
                  rotateZ(90deg) translateX(-50%)`,
                }"
                icon="Switch"
                class="sort-icon"
                @click="sortChange(index)"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            :class="[
              {
                'row-selected': selectable && row.isSelected,
                'row-disabled': disabled,
              },
            ]"
          >
            <td v-if="selectable">
              <div
                class="empty-select"
                :class="[
                  {
                    selected: row.isSelected,
                  },
                ]"
                @click="onSelectRow(row)"
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
                :value="row[col.value]"
              >
                <span>
                  {{ row[col.value] }}
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

<script lang="ts" setup>
import type { FormTableProps, FormTableEmits } from './type';
import { ICON_SIZE } from './type';
import { useFormTable } from './composable';
import { QPagination } from '@/components/basic/Pagination';
import { QIcon } from '@/components/basic/Icon';

defineOptions({
  name: 'QFormTable',
});

const props = withDefaults(defineProps<FormTableProps>(), {
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

const emit = defineEmits<FormTableEmits>();

const {
  localData,
  currentPage,
  totalPages,
  paginatedData,
  isAllSelected,
  sortChange,
  handlePageChange,
  onSelectRow,
  onToggleAllSelection,
} = useFormTable(props, emit);
</script>

<style lang="css" scoped></style>
