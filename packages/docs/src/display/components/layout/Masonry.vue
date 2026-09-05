<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QMasonry } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutMasonry' });

const cards = Array.from({ length: 12 }, (_, i) => i + 1);

const code = `
\`\`\`html
<QMasonry :items="cards" :columns="4" :gap="12">
  <template #default="{ item }">
    <div class="card" :style="{ height: ... }">#{{ item }}</div>
  </template>
</QMasonry>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QMasonry :items="cards" :columns="4" :gap="12">
      <template #default="{ item }">
        <div
          class="card"
          :style="{ height: `${(Number(item) % 4) * 28 + 70}px` }"
        >
          #{{ item }}
        </div>
      </template>
    </QMasonry>
  </DemoBlock>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--q-radius-md, 8px);
  background: color-mix(in srgb, var(--q-color-primary) 12%, transparent);
  color: var(--q-color-primary);
  font-weight: 600;
  box-sizing: border-box;
}
</style>
