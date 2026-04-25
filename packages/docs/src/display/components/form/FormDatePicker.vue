<script lang="ts" setup>
import { QFormDatePicker } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormDatePicker',
});

const dateValue = ref('');
const timeValue = ref('');
const datetimeValue = ref('');

const code = `
\`\`\`html
<template>
  <!-- 日期选择 -->
  <QFormDatePicker 
    v-model="dateValue"
    type="date"
    label="选择日期"
  />

  <!-- 时间选择 -->
  <QFormDatePicker 
    v-model="timeValue"
    type="time"
    label="选择时间"
  />

  <!-- 日期时间选择 -->
  <QFormDatePicker 
    v-model="datetimeValue"
    type="datetime-local"
    label="选择日期时间"
  />
</template>

<script setup>
import { ref } from 'vue';
const dateValue = ref('');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-300">
      <QFormDatePicker v-model="dateValue" type="date" label="选择日期" />
      <QFormDatePicker v-model="timeValue" type="time" label="选择时间" />
      <QFormDatePicker
        v-model="datetimeValue"
        type="datetime-local"
        label="选择日期时间"
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
