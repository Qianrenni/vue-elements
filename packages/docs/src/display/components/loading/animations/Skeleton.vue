<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSkeleton } from 'qyani-components';

defineOptions({ name: 'DisplayLoadingSkeleton' });

const code = `
\`\`\`html
<!-- 基础骨架屏 -->
<QSkeleton />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-400">
      <QSkeleton />
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-400 {
  width: 400px;
}
</style>
