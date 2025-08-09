<template>

</template>
<!--<template>-->
<!--  <div class="sql-query-builder">-->
<!--    &lt;!&ndash; 条件行：每行一个条件组，内部自动换行 &ndash;&gt;-->
<!--    <div class="condition-container">-->
<!--      <div v-for="(cond, index) in conditions" :key="index" class="condition">-->
<!--        &lt;!&ndash; 字段选择 &ndash;&gt;-->
<!--        <span class="field-label">-->
<!--          {{ fieldsMap.get(cond.field)?.label || cond.field || '字段' }}-->
<!--        </span>-->
<!--        &lt;!&ndash; 操作符 &ndash;&gt;-->
<!--        <el-select-->
<!--            v-model="cond.operator"-->
<!--            :disabled="!cond.field"-->
<!--            class="operator-select"-->
<!--            clearable-->
<!--            placeholder="条件"-->
<!--            size="small"-->
<!--            @change="onOperatorChange(cond)"-->
<!--        >-->
<!--          <el-option-->
<!--              v-for="op in getAvailableOperators(cond.type)"-->
<!--              :key="op.value"-->
<!--              :label="op.label"-->
<!--              :value="op.value"-->
<!--          />-->
<!--        </el-select>-->

<!--        &lt;!&ndash; 动态输入组件 &ndash;&gt;-->
<!--        <component :is="renderInput(cond)" :disabled="!cond.operator" class="value-input" size="small"/>-->
<!--        &lt;!&ndash; 删除按钮 &ndash;&gt;-->
<!--        <el-button-->
<!--            v-if="conditions.length > 1"-->
<!--            :icon="Close"-->
<!--            class="delete-btn"-->
<!--            size="small"-->
<!--            text-->
<!--            @click="removeCondition(index)"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->

<!--    &lt;!&ndash; 操作按钮组 &ndash;&gt;-->
<!--    <div class="sql-query-actions">-->
<!--      &lt;!&ndash; 全局字段选择下拉：选中即添加并移除 &ndash;&gt;-->
<!--      <el-select-->
<!--          v-model="selectedField"-->
<!--          :disabled="availableFields.length === 0"-->
<!--          :placeholder="`${availableFields.length > 0 ? '可添加字段作为查询条件' : '无可用字段'}`"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @change="addFieldFromSelect"-->
<!--      >-->
<!--        <el-option v-for="field in availableFields" :key="field.name" :label="field.label" :value="field.name"/>-->
<!--      </el-select>-->

<!--      <el-button :icon="Search" round size="small" type="primary" @click="submitQuery"> 查询</el-button>-->
<!--      <el-button :icon="Refresh" round size="small" @click="resetAll"> 重置</el-button>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {computed, reactive, ref} from 'vue';-->
<!--import {Close, Refresh, Search} from '@element-plus/icons-vue';-->
<!--import dayjs from 'dayjs';-->
<!--import {ElButton, ElOption, ElSelect} from 'element-plus';-->

<!--import {-->
<!--  type Condition,-->
<!--  SQL_FIELD_TYPES,-->
<!--  SQL_OPERATOR_TO_COMPONENT,-->
<!--  SQL_OPERATORS,-->
<!--  type SqlField,-->
<!--  type SqlRenderProps,-->
<!--  type SqlValue,-->
<!--} from '@/types';-->

<!--defineOptions({name: 'ConditionSelect'});-->

<!--const props = defineProps<{-->
<!--  fields: SqlField[];-->
<!--}>();-->
<!--const emit = defineEmits<{-->
<!--  (_e: 'submit', _conditions: Condition[]): void;-->
<!--}>();-->

<!--const fieldsMap = new Map(props.fields.map((field) => [field.name, field]));-->

<!--const filterDefault = () => {-->
<!--  return props.fields-->
<!--      .filter((field) => field.isDefault)-->
<!--      .map((field) => ({-->
<!--        field: field.name,-->
<!--        operator: field.type === 'datetime' ? 'between' : '',-->
<!--        value: field.type === 'datetime' ? getDayTime() : null,-->
<!--        type: field.type,-->
<!--      }));-->
<!--};-->

<!--const getDayTime = () => [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')];-->

<!--const conditions = reactive<Condition[]>(filterDefault() as Condition[]);-->

<!--// 当前选中的字段（用于下拉）-->
<!--const selectedField = ref<string>('');-->

<!--const usedFields = computed(() => {-->
<!--  return conditions.map((c) => c.field).filter((field) => field); // 排除空值-->
<!--});-->
<!--// 可用字段（未被使用的）-->
<!--const availableFields = computed(() => {-->
<!--  return props.fields.filter((field) => !usedFields.value.includes(field.name));-->
<!--});-->
<!--// 通过下拉添加字段-->
<!--const addFieldFromSelect = (fieldName: string) => {-->
<!--  if (!fieldName) return;-->
<!--  const field = fieldsMap.get(fieldName);-->
<!--  if (!field) return;-->

<!--  conditions.push({-->
<!--    field: field.name,-->
<!--    operator: '',-->
<!--    value: null,-->
<!--    type: field.type,-->
<!--  } as Condition);-->

<!--  selectedField.value = ''; // 重置下拉-->
<!--};-->

<!--const getAvailableOperators = (type: keyof typeof SQL_FIELD_TYPES) => {-->
<!--  if (!type) return [];-->
<!--  return SQL_FIELD_TYPES[type].operators.map((key) => ({-->
<!--    value: key,-->
<!--    label: SQL_OPERATORS[key]?.label || key,-->
<!--  }));-->
<!--};-->
<!--const onOperatorChange = (condition: Condition) => {-->
<!--  const expects = SQL_OPERATORS[condition.operator as keyof typeof SQL_OPERATORS]?.expects || 'single';-->
<!--  if (expects === 'range') {-->
<!--    condition.value = [null, null];-->
<!--  } else if (expects === 'list') {-->
<!--    condition.value = [];-->
<!--  } else {-->
<!--    condition.value = null;-->
<!--  }-->
<!--};-->

<!--// 重置所有条件-->
<!--const resetAll = () => {-->
<!--  // conditions.splice(0, conditions.length);-->
<!--  // 可选：恢复默认字段-->
<!--  conditions.splice(0, conditions.length);-->
<!--  conditions.push(...(filterDefault() as Condition[]));-->
<!--};-->
<!--const removeCondition = (index: number) => {-->
<!--  conditions.splice(index, 1);-->
<!--};-->
<!--const formatValue = (c: Condition) => {-->
<!--  const formatter = fieldsMap.get(c.field)?.formatter;-->
<!--  if (!formatter) return c.value;-->

<!--  return Array.isArray(c.value) ? c.value.map((v) => formatter(v)) : formatter(c.value);-->
<!--};-->
<!--const submitQuery = () => {-->
<!--  const cleanedConditions = conditions-->
<!--      .filter((c) => {-->
<!--        // 基本字段检查-->
<!--        if (!c.field || !c.operator) return false;-->

<!--        const {value, operator} = c;-->

<!--        // 如果值是 null/undefined/空字符串，直接丢弃-->
<!--        if (value === null || value === '') return false;-->

<!--        // 如果是字符串，检查是否为空白字符串-->
<!--        if (typeof value === 'string' && value.trim() === '') return false;-->

<!--        // 如果是数组，清理 null/undefined/空字符串，并根据操作符判断是否仍有有效值-->
<!--        if (Array.isArray(value)) {-->
<!--          const cleaned = value.filter((v) => {-->
<!--            if (v === null) return false;-->
<!--            return !(typeof v === 'string' && v.trim() === '');-->
<!--          });-->

<!--          // 对于 'between'，需要至少两个值-->
<!--          if (operator === 'between') {-->
<!--            return cleaned.length >= 2;-->
<!--          }-->
<!--        }-->
<!--        // 普通值（number, boolean, string）已通过上面检查-->
<!--        return true;-->
<!--      })-->
<!--      // 可选：进一步转换值类型（如 string → number）-->
<!--      .map((c) => {-->
<!--        return {-->
<!--          ...c,-->
<!--          value: formatValue(c),-->
<!--        };-->
<!--      });-->
<!--  console.log(cleanedConditions);-->
<!--  // 提交最终条件-->
<!--  emit('submit', cleanedConditions as Condition[]);-->
<!--};-->

<!--const renderInput = (condition: Condition) => {-->
<!--  if (!condition.operator) return null;-->
<!--  const expects = SQL_OPERATORS[condition.operator]?.expects;-->
<!--  const renderer = SQL_OPERATOR_TO_COMPONENT[expects];-->

<!--  if (!renderer) return null;-->

<!--  return renderer({-->
<!--    type: condition.type,-->
<!--    modelValue: condition.value,-->
<!--    'onUpdate:modelValue': (val: SqlValue) => {-->
<!--      condition.value = val;-->
<!--    },-->
<!--  } as SqlRenderProps);-->
<!--};-->
<!--defineExpose({-->
<!--  resetAll,-->
<!--  submitQuery,-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 主容器：整体布局 */-->
<!--.sql-query-builder {-->
<!--  flex: 1;-->
<!--  padding: 12px;-->
<!--  border: 1px solid #e8e8e8;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);-->
<!--}-->

<!--.field-label {-->
<!--  padding: 0 12px;-->
<!--  color: #333;-->
<!--  user-select: none;-->
<!--  font-size: 13px;-->
<!--}-->

<!--/* 条件容器：包裹所有条件行，支持换行 */-->
<!--.sql-query-builder .condition-container {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  gap: 12px;-->
<!--  margin-bottom: 16px;-->
<!--}-->

<!--/* 每个条件组：字段 + 操作符 + 值 */-->
<!--.condition-container .condition {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  border: 1px solid #e0e0e0;-->
<!--  border-radius: 6px;-->
<!--  transition: border-color 0.2s ease,-->
<!--  background-color 0.2s ease,-->
<!--  box-shadow 0.2s ease;-->
<!--}-->

<!--/* 悬停效果：提升交互感 */-->
<!--.condition-container .condition:hover {-->
<!--  border-color: #999;-->
<!--  background-color: #f5f5f5;-->
<!--  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.condition-container .condition .el-select {-->
<!--  min-width: 100px;-->
<!--  width: min-content;-->
<!--}-->

<!--.condition-container .condition .value-input {-->
<!--  width: max-content;-->
<!--}-->

<!--/* 操作按钮组 */-->
<!--.sql-query-actions {-->
<!--  display: flex;-->
<!--  gap: 10px;-->
<!--  flex-wrap: nowrap;-->
<!--}-->

<!--.sql-query-actions .el-select {-->
<!--  max-width: 300px;-->
<!--}-->
<!--</style>-->
