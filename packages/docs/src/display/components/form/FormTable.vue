<script lang="ts" setup>
import { QFormTable } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormTable',
});

const tableData = ref([
  { id: 1, name: '张三', age: 25, city: '北京' },
  { id: 2, name: '李四', age: 30, city: '上海' },
  { id: 3, name: '王五', age: 28, city: '广州' },
  { id: 4, name: '赵六', age: 35, city: '深圳' },
]);

const columns = [
  { label: 'ID', value: 'id' },
  { label: '姓名', value: 'name' },
  { label: '年龄', value: 'age' },
  { label: '城市', value: 'city' },
];

const code = `
\`\`\`html
<template>
  <QFormTable 
    :data="tableData"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';
const tableData = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
]);
const columns = [
  { label: 'ID', value: 'id' },
  { label: '姓名', value: 'name' },
];
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-100">
      <QFormTable :data="tableData" :columns="columns" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
