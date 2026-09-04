<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QAnchor } from 'qyani-components';

defineOptions({ name: 'DisplayNavigationAnchor' });

const items = [
  { href: '#demo-anchor-1', title: '章节一' },
  {
    href: '#demo-anchor-2',
    title: '章节二',
    children: [{ href: '#demo-anchor-3', title: '子章节' }],
  },
];

const code = `
\`\`\`html
<QAnchor
  :items="[
    { href: '#demo-anchor-1', title: '章节一' },
    { href: '#demo-anchor-2', title: '章节二' },
  ]"
  @change="onAnchorChange"
/>
\`\`\`
`;

/** 激活项变化回调（演示） */
function onAnchorChange(href: string) {
  void href;
}
</script>

<template>
  <DemoBlock :code="code">
    <div class="anchor-demo">
      <QAnchor
        class="anchor-nav"
        :items="items"
        :offset-top="0"
        :update-hash="false"
        @change="onAnchorChange"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.anchor-demo {
  display: flex;
  gap: 24px;
}
.anchor-nav {
  width: 160px;
  flex: none;
}
</style>
