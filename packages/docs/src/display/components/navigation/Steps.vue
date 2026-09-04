<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSteps } from 'qyani-components';

defineOptions({
  name: 'DisplayNavigationSteps',
});

const items = [
  { title: '填写信息' },
  { title: '确认订单', description: '请核对订单内容' },
  { title: '完成' },
];

const code = `
\`\`\`html
<QSteps :current="1" :items="items" />

<QSteps
  :current="1"
  direction="vertical"
  :items="items"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8 demo-wrap">
      <QSteps :current="1" :items="items" />
      <QSteps :current="1" size="small" :items="items" />
      <QSteps :current="1" direction="vertical" :items="items" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}
</style>
