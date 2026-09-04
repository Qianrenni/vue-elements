<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QContent, QHeader, QLayout } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutContent' });

const code = `
\`\`\`html
<QLayout style="height: 240px">
  <QHeader>Header</QHeader>
  <QContent>主体内容</QContent>
</QLayout>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QLayout class="demo-layout">
      <QHeader>Header</QHeader>
      <QContent>自适应主体内容区域，占满剩余空间。</QContent>
    </QLayout>
  </DemoBlock>
</template>

<style scoped>
.demo-layout {
  height: 240px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  overflow: hidden;
}
</style>
