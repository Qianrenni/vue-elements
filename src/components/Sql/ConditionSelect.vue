<template>
  <div class="sql-query-builder">
    <!-- 条件行：每行一个条件组，内部自动换行 -->
    <div class="condition-container">
      <div
          v-for="(cond, idx) in conditions"
          :key="idx"
          class="condition"
      >
        <!-- 字段选择 -->
        <el-select
            v-model="cond.field"
            class="field-select"
            clearable
            placeholder="选择字段"
            @change="onFieldChange(cond)"
        >
          <el-option
              v-for="field in props.fields"
              :key="field.name"
              :label="field.label"
              :value="field.name"
          />
        </el-select>

        <!-- 操作符 -->
        <el-select
            v-model="cond.operator"
            :disabled="!cond.field"
            class="operator-select"
            clearable
            placeholder="操作"
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
        />
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="sql-query-actions">
      <el-button
          :icon="Plus"
          round
          size="small"
          @click="addCondition"
      >
        添加条件
      </el-button>
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
          @click="conditions.splice(0, conditions.length, createDefaultCondition())"
      >
        重置
      </el-button>
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
} from "@/types";
import {reactive} from "vue";
import {ElButton, ElOption, ElSelect} from "element-plus";
import {Plus, Search, Refresh} from "@element-plus/icons-vue";

type Condition = {
  field: string;
  operator: SqlOperator | '';
  value: number | string | number[] | string[];
  type: string;
};

defineOptions({name: 'ConditionSelect'});

const props = defineProps<{
  fields: SqlField[]
}>();

const createDefaultCondition = (): Condition => ({
  field: '',
  operator: '',
  value: '',
  type: ''
});

const conditions = reactive<Condition[]>([
  createDefaultCondition()
]);

const getAvailableOperators = (type: string) => {
  if (!type) return [];
  return SQL_FIELD_TYPES[type].operators.map(key => ({
    value: key,
    label: SQL_OPERATORS[key]?.label || key
  }));
};

const onFieldChange = (condition: Condition) => {
  condition.operator = '';
  condition.value = '';
  for (const field of props.fields) {
    if (field.name === condition.field) {
      condition.type = field.type;
      break;
    }
  }
};

const onOperatorChange = (condition: Condition) => {
  const expects = SQL_OPERATORS[condition.operator]?.expects || 'single';
  if (expects === 'range') {
    condition.value = condition.field === 'datetime' ? [] : [null, null];
  } else if (expects === 'list') {
    condition.value = [];
  } else {
    condition.value = '';
  }
};

const addCondition = () => {
  conditions.push(createDefaultCondition());
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
    'onUpdate:modelValue': (val: any) => {
      condition.value = val;
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
  flex: 1;
  min-width: 120px;
  width: min-content;
}

/* 操作按钮组 */
.sql-query-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

</style>