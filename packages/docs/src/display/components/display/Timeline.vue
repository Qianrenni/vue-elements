<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTimeline } from 'qyani-components';

defineOptions({
  name: 'DisplayTimeline',
});

const basic = [
  { content: '创建仓库', color: 'green' },
  { content: '发布 v1.0', color: 'blue' },
  { content: '修复若干问题', color: 'red' },
];

const labeled = [
  { label: '2024-01', content: '第一件事', color: 'green' },
  { label: '2024-02', content: '第二件事', color: 'blue', dot: '★' },
  { label: '2024-03', content: '第三件事', color: 'gray' },
];

const code = `
\`\`\`html
<!-- 默认（轴线居左） -->
<QTimeline :items="basic" />

<!-- 居中交替 + 标签 -->
<QTimeline mode="alternate" :items="labeled" />

<!-- 倒序 + 幽灵待定 -->
<QTimeline :items="labeled" reverse pending="处理中…" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="tl-row">
      <QTimeline :items="basic" style="flex: 1; min-width: 200px" />
      <QTimeline
        mode="alternate"
        :items="labeled"
        style="flex: 1.6; min-width: 260px"
      />
      <div style="flex: 1; min-width: 200px">
        <QTimeline :items="labeled" pending="处理中…" />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.tl-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
</style>
