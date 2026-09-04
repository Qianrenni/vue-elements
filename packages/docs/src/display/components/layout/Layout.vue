<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QContent, QFooter, QHeader, QLayout, QSider } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutLayout' });

const code = `
\`\`\`html
<QLayout style="height: 360px">
  <QSider>Sider</QSider>
  <QLayout>
    <QHeader>Header</QHeader>
    <QContent>Content</QContent>
    <QFooter>Footer</QFooter>
  </QLayout>
</QLayout>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QLayout class="demo-layout">
      <QSider :width="180">Sider</QSider>
      <QLayout>
        <QHeader>Header</QHeader>
        <QContent>Content</QContent>
        <QFooter>Footer</QFooter>
      </QLayout>
    </QLayout>
  </DemoBlock>
</template>

<style scoped>
.demo-layout {
  height: 360px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  overflow: hidden;
}
</style>
