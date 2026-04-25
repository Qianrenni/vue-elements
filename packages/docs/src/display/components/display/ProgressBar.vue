<script lang="ts" setup>
import { QProgressBar } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayProgressBar',
});

const code = `
\`\`\`html
<!-- 水平进度条 -->
<QProgressBar percent="30%" />
<QProgressBar percent="60%" color="#52c41a" />
<QProgressBar percent="90%" color="#ff4d4f" />

<!-- 垂直进度条 -->
<QProgressBar percent="50%" direction="vertical" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <div class="container-column gap-4 w-100">
        <QProgressBar percent="30%" />
        <QProgressBar percent="60%" color="#52c41a" />
        <QProgressBar percent="90%" color="#ff4d4f" />
      </div>
      <div class="container gap-8 h-200">
        <QProgressBar percent="30%" direction="vertical" />
        <QProgressBar percent="60%" direction="vertical" color="#52c41a" />
        <QProgressBar percent="90%" direction="vertical" color="#ff4d4f" />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.gap-8 {
  gap: 2rem;
}
.w-100 {
  width: 100%;
}
.h-200 {
  height: 200px;
}
</style>
