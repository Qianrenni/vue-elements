<script lang="ts" setup>
import { QLoading } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLoadingLoading' });

const code = `
\`\`\`html
<!-- 基础加载 -->
<QLoading type="breathing" />

<!-- 带文字的加载 -->
<QLoading type="spinner" text="加载中..." />

<!-- 骨架屏 -->
<QLoading type="skeleton" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <div class="container gap-8 items-center">
        <QLoading type="breathing" />
        <span>呼吸动画</span>
      </div>
      <div class="container gap-8 items-center">
        <QLoading type="spinner" text="加载中..." />
        <span>旋转加载</span>
      </div>
      <div class="container gap-8 items-center">
        <QLoading type="skeleton" />
        <span>骨架屏</span>
      </div>
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
