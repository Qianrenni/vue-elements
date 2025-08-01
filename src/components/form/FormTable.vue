<!-- components/form/FormTable.vue -->
<template>
  <div
      :class="[
      'form-table-container',
      {
        'container-column': direction === 'vertical',
        'gap-half': direction === 'vertical',
        'container-align-start': direction === 'vertical',
        'container-align-center': direction !== 'vertical'
      }
    ]"
      role="none"
  >
    <!-- 标签 -->
    <label
        v-if="label"
        :id="id"
        :class="{
        'mouse-cursor-disable': disabled,
        'text-12rem': size === 'large',
        'text-05rem': size === 'small'
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
                'table-large': size === 'large'
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
                type="checkbox"
                @change="onToggleAllSelection"
            />
          </th>
          <th
              v-for="col in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
          >
            {{ col.label }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(row, index) in localData"
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
                type="radio"
                @change="onSelectRow(row)"
            />
            <input
                v-else-if="selectionMode === 'multiple'"
                :checked="isSelected(row)"
                :disabled="disabled"
                type="checkbox"
                @change="onToggleRowSelection(row)"
            />
          </td>
          <td
              v-for="col in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
          >
            <!-- 支持插槽自定义渲染 -->
            <span>
              {{ row[col.value] }}
            </span>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 无数据提示 -->
      <div v-if="!localData.length" class="table-empty">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";
import {computed, ref, watch} from "vue";

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
});

// 定义 emits
const emit = defineEmits<FormComponentEmits<(Record<string, any>)[]>>();

// 使用通用表单事件
const {handleInput, handleChange, handleFocus, handleBlur} = useFormEvents<(Record<string, any>)[]>(emit);

// 本地选中值（v-model）
const localValue = ref<Row[]>([]);

// 本地数据（避免直接修改 props）
const localData = ref<Row[]>([]);

// 同步传入的 modelValue 和 data
watch(
    () => [props.modelValue, props.data],
    () => {
      localValue.value = props.modelValue?.map((item, index) => ({tdId: index, ...item})) || [];
      localData.value = props.data?.map((item, index) => ({tdId: index, ...item})) || [];
    },
    {immediate: true}
);

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
  const event = new Event('change', {bubbles: true})
  handleInput(event, () => newValue);
  handleChange(event, () => newValue);
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
  const event = new Event('change', {bubbles: true});
  const modelValue: FormTableModelValueType = rowWithoutTdId(newValue);
  handleInput(event, () => modelValue);
  handleChange(event, () => modelValue);
};

// 全选/取消全选
const onToggleAllSelection = (e: Event) => {
  if (props.disabled) return;
  const target = e.target as HTMLInputElement;
  const newValue = target.checked ? [...localData.value] : [];
  localValue.value = newValue;
  const event = new Event('change', {bubbles: true});
  const modelValue: FormTableModelValueType = rowWithoutTdId(newValue);
  handleInput(event, () => modelValue);
  handleChange(event, () => modelValue);
};

// 聚焦和失焦（可用于校验）
const onFocus = (e: FocusEvent) => {
  handleFocus(e);
};

const onBlur = (e: FocusEvent) => {
  handleBlur(e);
};
</script>

<style lang="css" scoped>
.form-table-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-table-container {
  flex: 1;
  min-width: 0;
  position: relative;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
}

.form-table th,
.form-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-table th {
  background-color: #f8f8f8;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
}

/* 尺寸适配 */
.text-05rem {
  font-size: 0.75rem;
}

.text-12rem {
  font-size: 1rem;
}

.table-small {
  font-size: 0.75rem;
}

.table-small th,
.table-small td {
  padding: 4px 8px;
}

.table-large {
  font-size: 1.125rem;
}

.table-large th,
.table-large td {
  padding: 12px 16px;
}

/* 选中行样式 */
.row-selected {
  background-color: #e6f7ff;
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

/* 禁用光标 */
.mouse-cursor-disable {
  cursor: not-allowed;
}

/* Flex 工具类（假设你在全局定义了这些类） */
.container {
  display: flex;
  align-items: center;
}

.container-column {
  flex-direction: column;
}

.container-align-center {
  align-items: center;
}

.container-align-start {
  align-items: flex-start;
}

.gap-half {
  gap: 0.5rem;
}
</style>