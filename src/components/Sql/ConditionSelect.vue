<template>
  <div class="sql-query-builder">
    <!-- 条件行：每行一个条件组，内部自动换行 -->
    <div class="condition-container">
      <div
          v-for="(cond, index) in conditions"
          :key="index"
          class="condition"
      >
        <!-- 字段选择 -->
        <span class="field-label">
          {{ fieldsMap.get(cond.field)?.label || cond.field || '字段' }}
        </span>
        <!-- 操作符 -->
        <el-select
            v-model="cond.operator"
            :disabled="!cond.field"
            class="operator-select"
            clearable
            placeholder="条件"
            size="small"
            @change="onOperatorChange(cond)"
        >
          <el-option
              v-for="op in getAvailableOperators(cond.type)"
              :key="op.value"
              :label="op.label"
              :value="op.value"
          />
        </el-select>

        <!-- 动态输入组件 -->
        <component
            :is="renderInput(cond)"
            :disabled="!cond.operator"
            class="value-input"
            size="small"
        />
        <!-- 删除按钮 -->
        <el-button
            v-if="conditions.length > 1"
            :icon="Close"
            class="delete-btn"
            size="small"
            text
            @click="removeCondition(index)"
        />
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="sql-query-actions">
      <!-- 全局字段选择下拉：选中即添加并移除 -->
      <el-select
          v-model="selectedField"
          :disabled="availableFields.length === 0"
          :placeholder="`${availableFields.length>0 ? '可添加字段作为查询条件' : '无可用字段'}`"
          clearable
          size="small"
          @change="addFieldFromSelect"
      >
        <el-option
            v-for="field in availableFields"
            :key="field.name"
            :label="field.label"
            :value="field.name"
        />
      </el-select>

      <el-button
          :icon="Search"
          round
          size="small"
          type="primary"
          @click="submitQuery"
      >
        查询
      </el-button>
      <el-button
          :icon="Refresh"
          round
          size="small"
          @click="resetAll"
      >
        重置
      </el-button>
    </div>
    <div>
      <pre>{{ JSON.stringify(conditions, null, 4) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  SQL_FIELD_TYPES,
  SQL_OPERATOR_TO_COMPONENT,
  SQL_OPERATORS,
  SqlField,
  SqlOperator,
  SqlRenderProps,
  SqlValue,
} from "@/types";
import {computed, reactive, ref} from "vue";
import {ElButton, ElOption, ElSelect} from "element-plus";
import {Plus, Search, Refresh, Close} from "@element-plus/icons-vue";

type Condition = {
  field: string;
  operator: SqlOperator | '';
  value: SqlValue;
  type: string;
};

defineOptions({name: 'ConditionSelect'});

const props = defineProps<{
  fields: SqlField[]
}>();

const fieldsMap = new Map(props.fields.map(field => [field.name, field]));
const createDefaultCondition = (): Condition => ({
  field: '',
  operator: '',
  value: null,
  type: ''
});

const conditions = reactive<Condition[]>(
    props.fields
        .filter(field => field.isDefault)
        .map(field => ({
          field: field.name,
          operator: '' as SqlOperator | '',
          value: null,
          type: field.type
        }))
);

// 当前选中的字段（用于下拉）
const selectedField = ref<string | null>(null);

const usedFields = computed(() => {
  return conditions
      .map(c => c.field)
      .filter(field => field); // 排除空值
});
// 可用字段（未被使用的）
const availableFields = computed(() => {
  return props.fields.filter(field => !usedFields.value.includes(field.name));
});
// 通过下拉添加字段
const addFieldFromSelect = (fieldName: string) => {
  if (!fieldName) return;
  const field = fieldsMap.get(fieldName);
  if (!field) return;

  conditions.push({
    field: field.name,
    operator: '',
    value: null,
    type: field.type
  } as Condition);

  selectedField.value = null; // 重置下拉
};
const getAvailableOperators = (type: string) => {
  if (!type) return [];
  return SQL_FIELD_TYPES[type].operators.map(key => ({
    value: key,
    label: SQL_OPERATORS[key]?.label || key
  }));
};
const onOperatorChange = (condition: Condition) => {
  const expects = SQL_OPERATORS[condition.operator]?.expects || 'single';
  if (expects === 'range') {
    condition.value = condition.field === 'datetime' ? [] : [null, null];
  } else if (expects === 'list') {
    condition.value = [];
  } else {
    condition.value = null;
  }
};

// 重置所有条件
const resetAll = () => {
  // conditions.splice(0, conditions.length);
  // 可选：恢复默认字段
  conditions.splice(0, conditions.length);
  props.fields
      .filter(field => field.isDefault)
      .map(field => ({
        field: field.name,
        operator: '' as SqlOperator | '',
        value: null,
        type: field.type
      }))
      .forEach(c => {
        conditions.push(c);
      })
};
const removeCondition = (index: number) => {
  conditions.splice(index, 1);
};
const submitQuery = () => {
  console.log('查询条件:', conditions.filter(c => c.field && c.operator && c.value));
};

const renderInput = (condition: Condition) => {
  const expects = SQL_OPERATORS[condition.operator]?.expects;
  const renderer = SQL_OPERATOR_TO_COMPONENT[expects];

  if (!renderer) return null;

  return renderer({
    type: condition.type,
    modelValue: condition.value,
    'onUpdate:modelValue': (val: SqlValue) => {
      condition.value = fieldsMap.get(condition.field)?.formatter?.(val) || val;
    }
  } as SqlRenderProps);
};
</script>

<style scoped>
/* 主容器：整体布局 */
.sql-query-builder {
  flex: 1;
  padding: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.field-label {
  padding: 0 12px;
  color: #909399;
  user-select: none;
  font-size: 13px;
}

/* 条件容器：包裹所有条件行，支持换行 */
.sql-query-builder .condition-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

/* 每个条件组：字段 + 操作符 + 值 */
.condition-container .condition {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  transition: border-color 0.2s ease,
  background-color 0.2s ease,
  box-shadow 0.2s ease;
}

/* 悬停效果：提升交互感 */
.condition-container .condition:hover {
  border-color: #999;
  background-color: #f5f5f5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.condition-container .condition .el-select {
  min-width: 110px;
  width: min-content;
}

.condition-container .condition .value-input {
  min-width: 150px;
  width: min-content;
}

/* 操作按钮组 */
.sql-query-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

</style>