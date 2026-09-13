<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QRadioGroup, useMessage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormRadioGroup',
});

const basicValue = ref<string | number>('apple');
const buttonValue = ref<string | number>('apple');
const solidValue = ref<string | number>('banana');
const disabledValue = ref<string | number>('apple');
const sizeValue = ref<string | number>('apple');

const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true },
];

const numbers = [1, 2, 3];

const onChange = (value: string | number) => {
  useMessage.info(`选中：${value}`);
};

const code = `
\`\`\`html
<!-- 基础用法：圆点单选 -->
<QRadioGroup v-model:value="basicValue" :options="fruits" />

<!-- 按钮组（描边） -->
<QRadioGroup
  v-model:value="buttonValue"
  :options="fruits"
  option-type="button"
  button-style="outline"
/>

<!-- 按钮组（实心） -->
<QRadioGroup
  v-model:value="solidValue"
  :options="fruits"
  option-type="button"
  button-style="solid"
/>

<!-- 尺寸 -->
<QRadioGroup v-model:value="sizeValue" :options="numbers" option-type="button" size="small" />

<!-- 整体禁用 -->
<QRadioGroup v-model:value="disabledValue" :options="fruits" disabled />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4" style="max-width: 420px">
      <div class="container flex-wrap">
        <QRadioGroup
          v-model:value="basicValue"
          :options="fruits"
          @change="onChange"
        />
      </div>
      <div class="container flex-wrap">
        <QRadioGroup
          v-model:value="buttonValue"
          :options="fruits"
          option-type="button"
          button-style="outline"
        />
      </div>
      <div class="container flex-wrap">
        <QRadioGroup
          v-model:value="solidValue"
          :options="fruits"
          option-type="button"
          button-style="solid"
        />
      </div>
      <div class="container flex-wrap">
        <QRadioGroup
          v-model:value="sizeValue"
          :options="numbers"
          option-type="button"
          size="small"
        />
        <QRadioGroup
          v-model:value="sizeValue"
          :options="numbers"
          option-type="button"
          size="middle"
        />
        <QRadioGroup
          v-model:value="sizeValue"
          :options="numbers"
          option-type="button"
          size="large"
        />
      </div>
      <div class="container flex-wrap">
        <QRadioGroup v-model:value="disabledValue" :options="fruits" disabled />
      </div>
    </div>
  </DemoBlock>
</template>
