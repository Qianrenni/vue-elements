<script lang="ts" setup>
import { QFormColorPicker } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormColorPicker',
});

const colorValue = ref('#1890ff');

const code = `
\`\`\`html
<template>
  <QFormColorPicker 
    v-model="colorValue"
    label="选择颜色"
  />
</template>

<script setup>
import { ref } from 'vue';
const colorValue = ref('#1890ff');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-300">
      <QFormColorPicker v-model="colorValue" label="选择颜色" />
      <p>当前颜色: {{ colorValue }}</p>
      <div class="color-preview" :style="{ backgroundColor: colorValue }" />
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
.color-preview {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
