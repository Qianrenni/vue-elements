<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTreeSelect } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputTreeSelect' });

const items = [
  {
    value: 'parent1',
    label: '产品',
    children: [
      { value: 'child1-1', label: '按钮 Button' },
      {
        value: 'child1-2',
        label: '表单 Form',
        children: [
          { value: 'grand1', label: '数字输入 QInputNumber' },
          { value: 'grand2', label: '评分 QRate' },
        ],
      },
    ],
  },
  { value: 'leaf', label: '工具函数' },
];

const value = ref<string | number | null>(null);

const code = `
\`\`\`html
<QTreeSelect
  v-model="value"
  :items="items"
  placeholder="请选择分类"
  @change="onChange"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-320">
      <QTreeSelect v-model="value" :items="items" placeholder="请选择分类" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-320 {
  width: 320px;
  max-width: 100%;
}
</style>
