<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import {
  QForm,
  QFormButton,
  type QFormExpose,
  QFormItem,
} from 'qyani-components';
import { reactive, ref } from 'vue';

defineOptions({
  name: 'DisplayFormQForm',
});

const model = reactive({ name: '', age: 20, email: '' });
const rules = {
  name: [
    { required: true, message: '请输入姓名' },
    { min: 2, message: '姓名至少 2 个字符' },
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { min: 18, max: 60, message: '年龄需在 18-60 之间' },
  ],
  email: [
    {
      validator: (_v: unknown, m: Record<string, unknown>) =>
        typeof m.email === 'string' && m.email.includes('@')
          ? true
          : '邮箱需包含 @',
    },
  ],
};

const formRef = ref<QFormExpose | null>(null);
const result = ref('');
const onFinish = (values: Record<string, unknown>) => {
  result.value = `提交成功: ${JSON.stringify(values)}`;
};
const onFail = (
  _values: Record<string, unknown>,
  errors: Record<string, string>,
) => {
  result.value = `校验失败: ${JSON.stringify(errors)}`;
};
const doReset = () => {
  result.value = '';
  formRef.value?.resetFields();
};

const code = `
\`\`\`html
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { QForm, QFormItem, QFormButton, type QFormExpose } from 'qyani-components';

const model = reactive({ name: '', age: 20, email: '' });
const rules = {
  name: [{ required: true, message: '请输入姓名' }, { min: 2, message: '姓名至少 2 个字符' }],
  age: [{ required: true, message: '请输入年龄' }, { min: 18, max: 60, message: '年龄需在 18-60 之间' }],
  email: [{ validator: (_v, m) => (m.email.includes('@') ? true : '邮箱需包含 @') }],
};
const formRef = ref<QFormExpose | null>(null);
<\/script>

<template>
  <QForm ref="formRef" :model="model" :rules="rules" label-width="80px"
    @finish="(v) => alert('提交成功' + JSON.stringify(v))"
    @finish-failed="(_v, e) => alert('校验失败' + JSON.stringify(e))">
    <QFormItem name="name" label="姓名">
      <input v-model="model.name" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <QFormItem name="age" label="年龄">
      <input type="number" v-model.number="model.age" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <QFormItem name="email" label="邮箱">
      <input v-model="model.email" style="border: 1px solid #ccc; padding: 4px 8px" />
    </QFormItem>
    <div style="display: flex; gap: 8px">
      <QFormButton type="submit">提交</QFormButton>
      <QFormButton type="reset" @click="() => {}">重置</QFormButton>
    </div>
  </QForm>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column" style="max-width: 480px">
      <QForm
        ref="formRef"
        :model="model"
        :rules="rules"
        label-width="80px"
        @finish="onFinish"
        @finish-failed="onFail"
      >
        <QFormItem name="name" label="姓名">
          <input
            v-model="model.name"
            style="border: 1px solid #ccc; padding: 4px 8px; width: 100%"
          />
        </QFormItem>
        <QFormItem name="age" label="年龄">
          <input
            v-model.number="model.age"
            type="number"
            style="border: 1px solid #ccc; padding: 4px 8px; width: 100%"
          />
        </QFormItem>
        <QFormItem name="email" label="邮箱">
          <input
            v-model="model.email"
            style="border: 1px solid #ccc; padding: 4px 8px; width: 100%"
          />
        </QFormItem>
        <div style="display: flex; gap: 8px">
          <QFormButton type="submit">提交</QFormButton>
          <QFormButton @click="doReset">重置</QFormButton>
        </div>
      </QForm>
      <p v-if="result" style="margin: 8px 0 0; font-size: 13px">{{ result }}</p>
    </div>
  </DemoBlock>
</template>
