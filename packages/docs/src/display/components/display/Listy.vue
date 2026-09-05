<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QListy } from 'qyani-components';

defineOptions({ name: 'DisplayDisplayListy' });

const items = Array.from({ length: 2000 }, (_, i) => `第 ${i} 行 · 虚拟列表`);

const code = `
\`\`\`html
<QListy :items="items" :item-height="40" :height="360">
  <template #default="{ item }">{{ item }}</template>
</QListy>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QListy :items="items" :item-height="40" :height="360" style="width: 100%">
      <template #default="{ item, index }">
        <span>{{ index }}. {{ item }}</span>
      </template>
    </QListy>
    <p class="tip">共 {{ items.length }} 条，仅渲染可视窗口行。</p>
  </DemoBlock>
</template>

<style scoped>
.tip {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
