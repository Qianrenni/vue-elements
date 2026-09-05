<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSplitter } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutSplitter' });

const size = ref(220);

const code = `
\`\`\`html
<QSplitter v-model:size="size" style="height: 300px">
  <template #first>
    <div class="pane list">列表</div>
  </template>
  <template #second>
    <div class="pane detail">详情</div>
  </template>
</QSplitter>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p class="tip">拖动分隔条或聚焦后用方向键（当前首栏 {{ size }}px）。</p>
    <QSplitter v-model:size="size" style="height: 300px">
      <template #first>
        <div class="pane list">左侧列表</div>
      </template>
      <template #second>
        <div class="pane detail">右侧详情内容</div>
      </template>
    </QSplitter>
  </DemoBlock>
</template>

<style scoped>
.tip {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.pane {
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.list {
  background: color-mix(in srgb, var(--q-color-primary) 10%, transparent);
  color: var(--q-color-primary);
}
.detail {
  background: var(--q-color-bg-secondary);
  color: var(--q-color-text-secondary);
}
</style>
