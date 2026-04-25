<script lang="ts" setup>
import { QThemeToggle } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayThemeToggle' });

const code = `
\`\`\`html
<!-- 基础用法 -->
<QThemeToggle />

<!-- 自定义尺寸 -->
<QThemeToggle size="2rem" />
<QThemeToggle size="32" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container gap-8 items-center">
      <QThemeToggle />
      <QThemeToggle size="2rem" />
      <QThemeToggle size="48" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.items-center {
  align-items: center;
}
</style>
