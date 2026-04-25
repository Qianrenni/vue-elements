<script lang="ts" setup>
import { QSkeleton } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

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
