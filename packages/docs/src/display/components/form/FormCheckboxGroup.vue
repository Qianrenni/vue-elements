<script lang="ts" setup>
import { QFormCheckboxGroup } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormCheckboxGroup',
});

const checkedValues = ref<string[]>([]);
const checkedValuesVertical = ref<string[]>([]);

const options = [
  { label: '选项一', value: 'value1' },
  { label: '选项二', value: 'value2' },
  { label: '选项三', value: 'value3' },
  { label: '选项四', value: 'value4' },
];

const code = `
\`\`\`html
<template>
  <!-- 水平排列 -->
  <QFormCheckboxGroup 
    v-model="checkedValues"
    :options="options"
    label="爱好"
  />

  <!-- 垂直排列 -->
  <QFormCheckboxGroup 
    v-model="checkedValues"
    :options="options"
    direction="vertical"
  />
</template>

<script setup>
import { ref } from 'vue';
const checkedValues = ref([]);
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
      <QFormCheckboxGroup
        v-model="checkedValues"
        :options="options"
        label="水平排列"
      />
      <p>已选中: {{ checkedValues }}</p>

      <QFormCheckboxGroup
        v-model="checkedValuesVertical"
        :options="options"
        direction="vertical"
        label="垂直排列"
      />
      <p>已选中: {{ checkedValuesVertical }}</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
</style>
