<!-- ========== 动态组件定义（内联） ========== -->
<script lang="ts" setup>
import {reactive} from 'vue';
import {Field, FIELD_TYPES, OPERATOR_TO_COMPONENT, OPERATORS} from '@';
// === 定义字段配置 ===
const LOG_FIELDS: Field[] = [
  {
    name: 'id',
    label: '日志ID',
    type: 'number'
  },
  {
    name: 'count',
    label: '数量',
    type: 'number'
  },
  {
    name: 'message',
    label: '消息内容',
    type: 'string'
  },
  {
    name: 'datetime',
    label: '创建时间',
    type: 'datetime'
  },
  {
    name: 'valid',
    label: '是否有效',
    type: 'boolean'
  }
]

type Condition = {
  field: string;
  operator: string;
  value: any;
  type: string;
}
// 查询条件
const conditions = reactive<Condition[]>([
  {field: '', operator: '', value: '', type: ''}
]);


// 获取可用操作符
const getAvailableOperators = (type: string) => {
  if (!type) return [];
  return FIELD_TYPES[type].operators.map(key => ({
    value: key,
    label: OPERATORS[key]?.label || key
  }));
};

// 字段变化
const onFieldChange = (condition: Condition) => {
  condition.operator = '';
  condition.value = '';
  for (const field of LOG_FIELDS) {
    if (field.name === condition.field) {
      condition.type = field.type;
      break;
    }
  }
};

// 操作符变化
const onOperatorChange = (condition: { field: string; operator: string; value: any }) => {
  const expects = OPERATORS[condition.operator]?.expects || 'single';
  if (expects === 'range') {
    condition.value = condition.field === 'datetime' ? [] : [null, null];
  } else if (expects === 'list') {
    condition.value = [];
  } else {
    condition.value = '';
  }
};

// 添加条件
const addCondition = () => {
  conditions.push({field: '', operator: '', value: '', type: ''});
};

// 提交查询
const submitQuery = () => {
  console.log('查询条件:', conditions.filter(c => c.field && c.operator && c.value));
};

// 渲染输入组件
const renderInput = (condition: Condition) => {
  const expects = OPERATORS[condition.operator]?.expects || 'single';
  const renderer = OPERATOR_TO_COMPONENT[expects];

  if (!renderer) return null;

  return renderer({
    type: condition.type,
    modelValue: condition.value,
    'onUpdate:modelValue': (val: any) => {
      condition.value = val;
    }
  });
};
</script>

<template>
  <div class="query-builder">
    <h3>动态查询构造器（TS 安全版）</h3>

    <div
        v-for="(cond, idx) in conditions"
        :key="idx"
        class="condition"
        style="display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0;"
    >
      <!-- 字段 -->
      <el-select
          v-model="cond.field"
          placeholder="请选择字段"
          style="min-width: 130px;"
          @change="onFieldChange(cond)"
      >
        <el-option
            v-for="(field, index) in LOG_FIELDS"
            :key="index"
            :label="field.label"
            :value="field.name"
        />
      </el-select>

      <!-- 操作符 -->
      <el-select
          v-model="cond.operator"
          placeholder="操作"
          style="min-width: 110px;"
          @change="onOperatorChange(cond)"
      >
        <el-option
            v-for="op in getAvailableOperators(cond.type)"
            :key="op.value"
            :label="op.label"
            :value="op.value"
        />
      </el-select>

      <!-- 动态输入 -->
      <component :is="renderInput(cond)"/>
    </div>

    <el-button size="small" @click="addCondition">+ 添加条件</el-button>
    <el-button size="small" style="margin-left: 10px;" type="primary" @click="submitQuery">
      查询
    </el-button>

    <pre style="margin-top: 20px;">{{ JSON.stringify(conditions, null, 2) }}</pre>
  </div>
</template>
<style lang="css" scoped>

</style>
