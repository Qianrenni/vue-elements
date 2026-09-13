<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QBreathing } from 'qyani-components';

defineOptions({ name: 'DisplayLoadingBreathing' });

const code = `
\`\`\`html
<!-- 基础呼吸动画 -->
<QBreathing />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-center">
      <QBreathing />
    </div>
  </DemoBlock>
</template>

<style scoped>
.container-center {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>
