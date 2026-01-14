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
      class=" scroll-container input-table-container"
      :class="[
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
        class="form-table"
      >
        <thead>
          <tr>
            <th
              v-if="selectable"
            >
              <div
                class=" empty-select inverse"
                :class="[
                  {
                    'selected': isAllSelected
                  }
                ]"
                @click="onToggleAllSelection()"
              />
            </th>
            <th
              v-for=" (col,index) in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' ,paddingRight:'order' in props.columns[index]?`${ICON_SIZE[size]}px`:'auto'}"
              class="form-table-header-item"
            >
              <span>{{ col.label }}</span>
              <icon
                v-if="'order' in props.columns[index]"
                :size="ICON_SIZE[size]"
                :style="{
                  transform: `${props.columns[index].order?'rotateY(180deg)':'rotateY(0deg)'}
                  rotateZ(90deg) translateX(-50%)`
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
                'row-selected': props.selectable && row.isSelected,
                'row-disabled': disabled
              }
            ]"
          >
            <td
              v-if="selectable"
            >
              <div
                class=" empty-select"
                :class="[
                  {
                    'selected': row.isSelected
                  }
                ]"
                @click="onSelectRow(row)"
              />
            </td>
            <td
              v-for="col in columns"
              :key="col.value"
              :style="{ width: col.width || 'auto' }"
            >
              <!-- 支持插槽自定义渲染 -->
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

      <!-- 无数据提示 -->
      <div
        v-if="!localData.length"
        class="table-empty"
      >
        暂无数据
      </div>
    </div>
    <!-- 在表格后添加这段代码 -->
    <div
      v-if="pagination"
      class="form-table-pagination"
    >
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :max-visible-pages="maxVisiblePages"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  FormComponentEmits, 
  FormComponentProps,
  FormTableModelValueType, 
  Row, 
  TableColumn,
  SelectionMode
} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";
import {computed, reactive, ref, watch} from "vue";
import Icon from "@/components/basic/Icon.vue";
import Pagination from "@/components/basic/Pagination.vue";
const ICON_SIZE = {
  small: '14',
  middle: '18',
  large: '22'
}

// Props 定义
export interface FormTableProps extends FormComponentProps<FormTableModelValueType> {
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
   * 是否启用分页
   */
  pagination?: boolean;

  /**
   * 每页显示的行数
   */
  pageSize?: number;
  /**
   * 显示的页码数量
   */
  maxVisiblePages?: number;
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
  pagination: true,
  pageSize: 10,
  maxVisiblePages: 5
});
interface FormTableEmits extends FormComponentEmits<(Record<string, any>)[]> {
  // 添加自定义事件
  (e:'page-change',value:number): void;
  (e:'update:columns',value:TableColumn[]): void;
}
// 定义 emits
const emit = defineEmits<FormTableEmits>();

// 使用通用表单事件
const {handleInput, handleChange} = useFormEvents<(Record<string, any>)[]>(emit);

// 本地选中值（v-model）
const localValue = ref<Omit<Row, 'isSelected'>[]>([]);

// 本地数据（避免直接修改 props）
const localData = reactive<Row[]>([]);

// 分页相关状态
const currentPage = ref(1);
const internalPageSize = ref(props.pageSize);

// 同步传入的 modelValue 和 data
watch(
    () =>  props.data,
    () => {
      localData.splice(0, localData.length);
      localData.push(...props.data.map((item) => ({ ...item, isSelected: false } satisfies Row)));
    },
    {immediate: true}
);

// 处理排序变化
const sortChange = (columnIndex: number) => { 
  const temp = [...props.columns]
  temp[columnIndex].order = !temp[columnIndex].order;
  emit('update:columns', temp);
};
// 监听pageSize变化
watch(() => props.pageSize, (newVal) => {
  internalPageSize.value = newVal;
}, {immediate: true});

// 计算总页数
const totalPages = computed(() => {
  if (!props.pagination || localData.length === 0) return 1;
  return Math.ceil(localData.length / internalPageSize.value);
});
// 处理页码变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
  emit('page-change', page);
};
// 计算分页后的数据
const paginatedData = computed(() => {
  if (!props.pagination) return localData;

  const startIndex = (currentPage.value - 1) * internalPageSize.value;
  const endIndex = Math.min(startIndex + internalPageSize.value, localData.length);

  return localData.slice(startIndex, endIndex);
});

// 全选状态
const isAllSelected = computed(() => {
  return localData.length > 0 && localData.every((row) => row.isSelected);
});

// 单选选择
const onSelectRow = (row: Row) => {
  if (props.disabled) return;
  if(props.selectionMode === 'multiple'){
    onToggleRowSelection(row);
    return;
  }
  const isSelected = row.isSelected;
  for(let i = 0,len=localData.length; i < len; i++){
    localData[i].isSelected = false;
  }
  row.isSelected = !isSelected;
  localValue.value = row.isSelected ? [row] : [];
  handleInput(localValue.value);
  handleChange(localValue.value);
};

// 多选切换
const onToggleRowSelection = (row: Row) => {
  if (row.isSelected) {
    row.isSelected = false;
    const index = localValue.value.indexOf(row);
    if(index > -1){
      localValue.value.splice(index, 1);
    }

  } else {
    row.isSelected = true;
    localValue.value.push(row);
  }
  handleInput(localValue.value);
  handleChange(localValue.value);
};

// 全选/取消全选
const onToggleAllSelection = () => {
  if (props.disabled) return;
  localValue.value = [];
  if(!isAllSelected.value){
    for(let i = 0,len=localData.length; i < len; i++){
      localData[i].isSelected = true;
      localValue.value.push(localData[i]);
    }
  }else{
    for(let i = 0,len=localData.length; i < len; i++){
      localData[i].isSelected = false;
    }
  }
  handleInput(localValue.value);
  handleChange(localValue.value);
};
</script>

<style lang="css" scoped>

</style>