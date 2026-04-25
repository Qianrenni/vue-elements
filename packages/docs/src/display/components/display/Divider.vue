<script lang="ts" setup>
import { QDivider } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayDivider',
});

const code = `
\`\`\`html
<div>上方内容</div>
<QDivider />
<div>下方内容</div>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <p>这是上方的内容</p>
      <QDivider />
      <p>这是下方的内容</p>
      <QDivider />
      <p>分割线可以用于分隔不同的内容区域</p>
    </div>
  </DemoBlock>
</template>

<style scoped></style>
