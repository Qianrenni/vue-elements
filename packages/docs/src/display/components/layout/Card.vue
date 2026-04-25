<script lang="ts" setup>
import { QCard } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayLayoutCard',
});

const code = `
\`\`\`html
<QCard>
  <template #header>卡片标题</template>
  <p>卡片内容</p>
  <template #footer>卡片底部</template>
</QCard>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QCard>
        <template #header>
          <h3>卡片标题</h3>
        </template>
        <p>这是卡片的主要内容区域。</p>
        <template #footer>
          <button class="button-primary">操作按钮</button>
        </template>
      </QCard>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
</style>
