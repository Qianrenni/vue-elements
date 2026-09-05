<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QTour } from 'qyani-components';
import type { QTourStep } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayDisplayTour' });

const open = ref(false);
const steps: QTourStep[] = [
  {
    target: '#tour-btn',
    title: '操作按钮',
    description: '这是本示例的触发按钮。',
  },
  { target: '#tour-a', title: '区域 A', description: '这里是主要内容区 A。' },
  {
    target: '#tour-b',
    title: '区域 B',
    description: '这里是附加信息区 B。',
    placement: 'top',
  },
];

const code = `
\`\`\`html
<QTour v-model:open="open" :steps="steps" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="tour-page">
      <QButton type="primary" id="tour-btn" @click="open = true">
        开始引导
      </QButton>
      <div class="tour-grid">
        <div id="tour-a" class="tour-block">内容区 A</div>
        <div id="tour-b" class="tour-block tour-block--muted">内容区 B</div>
      </div>
    </div>
    <QTour v-model:open="open" :steps="steps" />
  </DemoBlock>
</template>

<style scoped>
.tour-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tour-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.tour-block {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--q-radius-md, 8px);
  background: color-mix(in srgb, var(--q-color-primary) 12%, transparent);
  color: var(--q-color-primary);
}
.tour-block--muted {
  background: var(--q-color-bg-secondary);
  color: var(--q-color-text-secondary);
}
</style>
