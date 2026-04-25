<script lang="ts" setup>
import { QFormSelect } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormSelect',
});

const selectValue = ref('');
const searchableValue = ref('');

const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' },
  { label: '选项四', value: 'option4' },
];

const code = `
\`\`\`html
<template>
  <!-- 基础下拉选择 -->
  <QFormSelect 
    v-model="selectValue"
    :options="options"
    label="请选择"
  />

  <!-- 可搜索的下拉选择 -->
  <QFormSelect 
    v-model="searchableValue"
    :options="options"
    searchable
    label="可搜索"
  />
</template>

<script setup>
import { ref } from 'vue';
const selectValue = ref('');
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
];
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-300">
      <QFormSelect
        v-model="selectValue"
        :options="options"
        label="基础选择"
        placeholder="请选择选项"
      />
      <QFormSelect
        v-model="searchableValue"
        :options="options"
        searchable
        label="可搜索"
        placeholder="搜索并选择"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-300 {
  width: 300px;
}
</style>
