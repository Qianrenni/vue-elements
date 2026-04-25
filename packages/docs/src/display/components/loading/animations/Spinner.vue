<script lang="ts" setup>
import { QSpinner } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLoadingSpinner' });

const code = `
\`\`\`html
<!-- 基础旋转加载 -->
<QSpinner />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-center">
      <QSpinner />
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
