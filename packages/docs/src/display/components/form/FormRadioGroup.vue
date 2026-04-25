<script lang="ts" setup>
import { QFormRadioGroup } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormRadioGroup',
});

const radioValue = ref('');
const radioValueVertical = ref('');

const options = [
  { label: '选项一', value: 'value1' },
  { label: '选项二', value: 'value2' },
  { label: '选项三', value: 'value3' },
];

const code = `
\`\`\`html
<template>
  <!-- 水平排列 -->
  <QFormRadioGroup 
    v-model="radioValue"
    :options="options"
    label="选择一项"
  />

  <!-- 垂直排列 -->
  <QFormRadioGroup 
    v-model="radioValue"
    :options="options"
    direction="vertical"
  />
</template>

<script setup>
import { ref } from 'vue';
const radioValue = ref('');
const options = [
  { label: '选项一', value: 'value1' },
  { label: '选项二', value: 'value2' },
];
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <QFormRadioGroup
        v-model="radioValue"
        :options="options"
        label="水平排列"
      />
      <p>已选中: {{ radioValue || '无' }}</p>

      <QFormRadioGroup
        v-model="radioValueVertical"
        :options="options"
        direction="vertical"
        label="垂直排列"
      />
      <p>已选中: {{ radioValueVertical || '无' }}</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
</style>
