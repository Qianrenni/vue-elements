<!-- components/form/FormTable.vue -->
<template>
  <div
      class="form-table-container"
      role="none"
  >
    <!-- 标签 -->
    <label
        v-if="label"
        :id="id"
        :class="{
        'mouse-cursor-disable': disabled,
        'text-12rem': size === 'large',
        'text-08rem': size === 'small'
      }"
        :for="name"
        class="label"
    >
      {{ label }}:
    </label>

    <!-- 表格容器 -->
    <div
        :class="[
        'input-table-container',
        'container',
        { 'mouse-cursor-disable': disabled }
      ]"
        :style="{ opacity: disabled ? 0.6 : 1 }"
    >
      <table
          :class="[
              {
                'table-small': size === 'small',
                'table-large': size === 'large',
                'text-08rem':size === 'small',
                'text-12rem':size === 'large'
              }
          ]"
          class="form-table">
        <thead>
        <tr>
          <th
              v-if="selectable"
              style="
              width: 50px;
              text-align: center"
          >
            <input
                v-if="selectionMode === 'multiple'"
                :checked="isAllSelected"
                :disabled="disabled"
                class="mouse-cursor"
                type="checkbox"
                @change="onToggleAllSelection"
            />
          </th>
          <th
              v-for=" (col,index) in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
          >
            {{ col.label }}
            <icon
                v-if="sortable"
                :size="ICON_SIZE[size]"
                :style="{
                  transform: `${sortColumnOrder[index]==='asc'?'rotateY(180deg)':'rotateY(0deg)'}
                  rotateZ(90deg) translateX(-50%)`
                }"
                icon="Switch"
                style="
                transform-origin: center center;
                position: absolute;
                right: 0.1rem;
                top: 50%;
                "
                @click="sortByColumn(col.value,index)"
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
                  'row-selected': isSelected(row),
                  'row-disabled': disabled
                }
            ]"
            @click="onRowClick(row, $event)"
        >
          <td
              v-if="selectable"
              style="text-align: center"
          >
            <input
                v-if="selectionMode === 'single'"
                :checked="isSelected(row)"
                :disabled="disabled"
                class="mouse-cursor"
                type="radio"
                @change="onSelectRow(row)"
            />
            <input
                v-else-if="selectionMode === 'multiple'"
                :checked="isSelected(row)"
                :disabled="disabled"
                class="mouse-cursor"
                type="checkbox"
                @change="onToggleRowSelection(row)"
            />
          </td>
          <td
              v-for="col in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
              class="text-one-line"
          >
            <!-- 支持插槽自定义渲染 -->
            <slot :column="col" :name="col.value" :row="row" :value="row[col.value]">
              <span>
              {{ row[col.value] }}
              </span>
            </slot>

          </td>
        </tr>
        </tbody>
      </table>

      <!-- 无数据提示 -->
      <div v-if="!localData.length" class="table-empty">
        暂无数据
      </div>
    </div>
    <!-- 在表格后添加这段代码 -->
    <div v-if="pagination" class="form-table-pagination">
      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";
import {computed, ref, watch} from "vue";
import Icon from "@/components/basic/Icon.vue";
import Pagination from "@/components/basic/Pagination.vue";

// 列定义
interface TableColumn {
  value: string;
  label: string;
  width?: string;
}

// 支持的 selection 模式
type SelectionMode = "single" | "multiple" | null;
type Row = {
  tdId: number;
  [key: string]: any;
}
type FormTableModelValueRowType = Record<string, any>;
type FormTableModelValueType = FormTableModelValueRowType[];
type SortOrder = "asc" | "desc" | null;
const ICON_SIZE = {
  small: '14',
  middle: '18',
  large: '22'
}

// Props 定义
interface FormTableProps extends FormComponentProps<FormTableModelValueType> {
  /**
   * 表格数据
   */
  data: Record<string, any>[];
  /**
   * 列配置
   */
  columns: TableColumn[];
  /**
   * 是否可选择行
   */
  selectable?: boolean;
  /**
   * 选择模式：单选 / 多选 / 不可选
   */
  selectionMode?: SelectionMode;

  /**
   * 是否可排序
   */
  sortable?: boolean;

  /**
   * 是否启用分页
   */
  pagination?: boolean;

  /**
   * 每页显示的行数
   */
  pageSize?: number;

  /**
   * 可选的每页行数选项
   */
  pageSizeOptions?: number[];
}

// 默认值
const props = withDefaults(defineProps<FormTableProps>(), {
  required: false,
  direction: "horizontal",
  disabled: false,
  readonly: false,
  size: "middle",
  selectable: false,
  selectionMode: 'multiple',
  sortable: true,
  pagination: true,
  pageSize: 10,
  pageSizeOptions: () => [5, 10, 20, 50, 100],
});

// 记录每列倒序还是顺序
const sortColumnOrder: SortOrder[] = props.columns.map(() => null);

// 定义 emits
const emit = defineEmits<FormComponentEmits<(Record<string, any>)[]>>();

// 使用通用表单事件
const {handleInput, handleChange} = useFormEvents<(Record<string, any>)[]>(emit);

// 本地选中值（v-model）
const localValue = ref<Row[]>([]);

// 本地数据（避免直接修改 props）
const localData = ref<Row[]>([]);

// 分页相关状态
const currentPage = ref(1);
const internalPageSize = ref(props.pageSize);

// 同步传入的 modelValue 和 data
watch(
    () => [props.modelValue, props.data],
    () => {
      localValue.value = props.modelValue?.map((item, index) => ({tdId: index, ...item})) || [];
      localData.value = props.data?.map((item, index) => ({tdId: index, ...item})) || [];
      // 重置分页
      if (props.pagination) {
        currentPage.value = 1;
      }
    },
    {immediate: true}
);

// 监听pageSize变化
watch(() => props.pageSize, (newVal) => {
  internalPageSize.value = newVal;
}, {immediate: true});

// 计算总页数
const totalPages = computed(() => {
  if (!props.pagination || localData.value.length === 0) return 1;
  return Math.ceil(localData.value.length / internalPageSize.value);
});
// 处理页码变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
// 计算分页后的数据
const paginatedData = computed(() => {
  if (!props.pagination) return localData.value;

  const startIndex = (currentPage.value - 1) * internalPageSize.value;
  const endIndex = Math.min(startIndex + internalPageSize.value, localData.value.length);

  return localData.value.slice(startIndex, endIndex);
});

// 剔除tdId
function rowWithoutTdId(row: Row): Record<string, any>;
function rowWithoutTdId(rows: Row[]): Record<string, any>[];
function rowWithoutTdId(rowOrRows: Row | Row[]) {
  if (Array.isArray(rowOrRows)) {
    return rowOrRows.map(row => {
      const {tdId, ...rowWithoutTdId} = row;
      return rowWithoutTdId;
    });
  } else {
    const {tdId, ...rowWithoutTdId} = rowOrRows;
    return rowWithoutTdId;
  }
}

/**
 *
 * @param key 列
 * @param index 列索引
 */
const sortByColumn = (key: string, index: number) => {
  if (index === -1) return;
  sortColumnOrder[index] = sortColumnOrder[index] === 'asc' ? 'desc' : 'asc';
  localData.value = [...localData.value].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (sortColumnOrder[index] === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

}
// 是否已选中某行
const isSelected = (row: Row) => {
  return localValue.value.some((item) => item === row || item.tdId === row.tdId);
};

// 全选状态
const isAllSelected = computed(() => {
  return localData.value.length > 0 && localData.value.every((row) => isSelected(row));
});

// 行点击（支持单选）
const onRowClick = (row: Row, event: MouseEvent) => {
  if (props.disabled) return;

  // 防止 checkbox 点击触发行选择
  if ((event.target as HTMLElement).tagName === "INPUT") return;

  if (props.selectionMode === "single") {
    onSelectRow(row);
  } else if (props.selectionMode === "multiple") {
    onToggleRowSelection(row);
  }
};

// 单选选择
const onSelectRow = (row: Row) => {
  if (props.disabled) return;
  localValue.value = [row];
  const newValue = rowWithoutTdId([row]);
  handleInput(newValue);
  handleChange(newValue);
};

// 多选切换
const onToggleRowSelection = (row: Row) => {
  if (props.disabled) return;
  const index = localValue.value.findIndex((item: Row) => item.tdId === row.tdId);
  const newValue = [...localValue.value];
  if (index === -1) {
    newValue.push(row);
  } else {
    newValue.splice(index, 1);
  }
  localValue.value = newValue;
  const modelValue: FormTableModelValueType = rowWithoutTdId(newValue);
  handleInput(modelValue);
  handleChange(modelValue);
};

// 全选/取消全选
const onToggleAllSelection = (e: Event) => {
  if (props.disabled) return;
  const target = e.target as HTMLInputElement;
  const newValue = target.checked ? [...localData.value] : [];
  localValue.value = newValue;
  const modelValue: FormTableModelValueType = rowWithoutTdId(newValue);
  handleInput(modelValue);
  handleChange(modelValue);
};
</script>

<style lang="css" scoped>
.form-table-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid #ddd;
}

.form-table-container .label {
  font-weight: 700;
  transform: scale(1.2);
  margin: 0.2rem 0;
}

.input-table-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.form-table th,
.form-table td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.form-table th {
  background-color: var(--primary-color);
  color: #fff;
  border-right: 1px solid #fff;
  border-bottom: none;
  font-weight: 600;
  position: sticky;

  top: 0;
  z-index: 1;
}

.form-table th:last-child {
  border-right: none;
}

/* 尺寸适配 */

.table-small th,
.table-small td {
  padding: 0.25rem 0.5rem;
}

.table-large th,
.table-large td {
  padding: 0.75rem 1rem;
}

/* 选中行样式 */
.row-selected {
  background-color: rgba(91, 104, 216, 0.05);
}

.row-disabled {
  color: #999;
}

/* 无数据提示 */
.table-empty {
  text-align: center;
  padding: 20px;
  color: #999;
  font-style: italic;
}

.form-table-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>