<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QContent, QFooter, QLayout } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutFooter' });

const code = `
\`\`\`html
<QLayout style="height: 200px">
  <QContent>主体</QContent>
  <QFooter>© 2026 QYANI</QFooter>
</QLayout>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QLayout class="demo-layout">
      <QContent>主体</QContent>
      <QFooter>© 2026 QYANI Components</QFooter>
    </QLayout>
  </DemoBlock>
</template>

<style scoped>
.demo-layout {
  height: 200px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  overflow: hidden;
}
</style>
