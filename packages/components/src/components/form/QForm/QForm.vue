<!--
 * @component QForm
 * @description 表单容器 + 校验（对齐 antd Form 基础能力）：model + rules，与子 QFormItem 联动；支持 validate/validateField/clearValidate/resetFields，提交校验 finish / finish-failed。
 -->
<script lang="ts" setup>
import { provide, reactive, ref } from 'vue';

import { validateRules } from './composable';
import { Q_FORM_KEY } from './formContext';
import type { QFormContext } from './formContext';
import type { QFormEmits, QFormExpose, QFormProps } from './type';

defineOptions({ name: 'QForm' });

const props = withDefaults(defineProps<QFormProps>(), {
  model: () => ({}),
  rules: () => ({}),
  labelWidth: '100px',
  layout: 'horizontal',
  labelAlign: 'left',
  validateTrigger: 'blur',
});

const emit = defineEmits<QFormEmits>();

const modelRef = ref<Record<string, unknown>>(props.model);
const errors = reactive<Record<string, string>>({});
const registered = new Set<string>();
const baseline: Record<string, unknown> = { ...props.model };

async function validateField(name: string): Promise<boolean> {
  const rules = props.rules[name];
  if (!rules || rules.length === 0) {
    delete errors[name];
    return true;
  }
  const value = modelRef.value[name];
  const message = await validateRules(rules, value, modelRef.value, name);
  if (message !== null) {
    errors[name] = message;
    return false;
  }
  delete errors[name];
  return true;
}

async function validate(): Promise<boolean> {
  const names = new Set([...registered, ...Object.keys(props.rules)]);
  let ok = true;
  for (const name of names) {
    const fieldOk = await validateField(name);
    if (!fieldOk) ok = false;
  }
  return ok;
}

function clearValidate(name?: string) {
  if (name) delete errors[name];
  else Object.keys(errors).forEach((k) => delete errors[k]);
}

function resetFields() {
  Object.keys(baseline).forEach((k) => {
    modelRef.value[k] = baseline[k];
  });
  clearValidate();
}

function getFieldValue(name: string): unknown {
  return modelRef.value[name];
}

const context: QFormContext = {
  modelRef,
  errors,
  layout: props.layout,
  labelWidth: props.labelWidth,
  labelAlign: props.labelAlign,
  validateTrigger: props.validateTrigger,
  getRules: (name) => props.rules[name],
  validateField,
  clearField: (name) => {
    delete errors[name];
  },
  registerField: (name) => {
    registered.add(name);
  },
  unregisterField: (name) => {
    registered.delete(name);
    delete errors[name];
  },
};

provide(Q_FORM_KEY, context);

async function onSubmit() {
  const values = { ...modelRef.value };
  if (await validate()) {
    emit('finish', values);
  } else {
    emit('finish-failed', values, { ...errors });
  }
}

const expose: QFormExpose = {
  validate,
  validateField,
  clearValidate,
  resetFields,
  getFieldValue,
  errors,
};
defineExpose(expose);
</script>

<template>
  <form
    :class="['q-form', `q-form--${layout}`, `q-form--label-${labelAlign}`]"
    novalidate
    @submit.prevent="onSubmit"
  >
    <slot />
  </form>
</template>

<style scoped>
.q-form {
  max-width: 100%;
}
</style>
