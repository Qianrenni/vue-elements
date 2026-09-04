<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QDropdown } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayNavigationDropdown' });

const open = ref(false);

const items = [
  { key: 'view', label: '查看详情' },
  { key: 'copy', label: '复制链接' },
  { key: 'divider', label: '', divider: true },
  { key: 'delete', label: '删除', danger: true },
];

function onSelect(item: { key: string; label: string }) {
  void item;
}

const code = `
\`\`\`html
<QDropdown :items="items" trigger="click" @select="onSelect">
  <QButton>更多操作</QButton>
</QDropdown>

<QDropdown v-model:open="open" :items="items">
  <QButton>悬停展开</QButton>
</QDropdown>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-row gap-6">
      <QDropdown :items="items" trigger="click" @select="onSelect">
        <QButton>更多操作</QButton>
      </QDropdown>
      <QDropdown v-model:open="open" :items="items">
        <QButton type="default">悬停展开</QButton>
      </QDropdown>
    </div>
  </DemoBlock>
</template>
