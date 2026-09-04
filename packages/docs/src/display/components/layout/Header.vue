<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QHeader } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutHeader' });

const code = `
\`\`\`html
<QHeader>
  <span style="font-weight: 600">Logo</span>
</QHeader>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QHeader>
      <span style="font-weight: 600">Logo / 标题</span>
      <span style="margin-left: auto">右侧操作</span>
    </QHeader>
  </DemoBlock>
</template>
