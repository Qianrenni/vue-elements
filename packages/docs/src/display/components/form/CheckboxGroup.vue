<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCheckboxGroup, useMessage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormCheckboxGroup',
});

const basicValue = ref<(string | number)[]>(['apple']);
const disabledValue = ref<(string | number)[]>(['apple']);
const mixedValue = ref<(string | number)[]>(['normal']);
const numberValue = ref<(string | number)[]>([1, 3]);

const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '西瓜', value: 'watermelon' },
];

const mixedOptions = [
  { label: '可选项', value: 'normal' },
  { label: '禁选项', value: 'blocked', disabled: true },
  { label: '另一项', value: 'extra' },
];

const numbers = [1, 2, 3, 4];

const onChange = (value: (string | number)[]) => {
  useMessage.info(`选中：${value.join('、') || '无'}`);
};

const code = `
\`\`\`html
<!-- 基础用法：数组双向绑定 + 默认选中 -->
<QCheckboxGroup v-model:value="basicValue" :options="fruits" />

<!-- 整体禁用 -->
<QCheckboxGroup v-model:value="disabledValue" :options="fruits" disabled />

<!-- 单项禁用 -->
<QCheckboxGroup v-model:value="mixedValue" :options="mixedOptions" />

<!-- 数字值 / 简写选项 -->
<QCheckboxGroup v-model:value="numberValue" :options="numbers" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4" style="max-width: 420px">
      <div class="container flex-wrap">
        <QCheckboxGroup
          v-model:value="basicValue"
          :options="fruits"
          @change="onChange"
        />
      </div>
      <div class="container flex-wrap">
        <QCheckboxGroup
          v-model:value="disabledValue"
          :options="fruits"
          disabled
        />
      </div>
      <div class="container flex-wrap">
        <QCheckboxGroup v-model:value="mixedValue" :options="mixedOptions" />
      </div>
      <div class="container flex-wrap">
        <QCheckboxGroup v-model:value="numberValue" :options="numbers" />
      </div>
    </div>
  </DemoBlock>
</template>
