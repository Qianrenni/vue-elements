<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCollapsibleSection } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutCollapsibleSection' });

const code = `
\`\`\`html
<!-- 向下展开（默认） -->
<QCollapsibleSection direction="down" :initial-expanded="true">
  <div>可折叠内容</div>
</QCollapsibleSection>

<!-- 向上展开 -->
<QCollapsibleSection direction="up" :initial-expanded="false">
  <div>可折叠内容</div>
</QCollapsibleSection>

<!-- 隐藏箭头 -->
<QCollapsibleSection :initial-expanded="true" :is-show-arrow="false">
  <div>可折叠内容</div>
</QCollapsibleSection>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8 w-400">
      <QCollapsibleSection direction="down" :initial-expanded="true">
        <div class="collapsible-content">向下展开的内容区域</div>
      </QCollapsibleSection>

      <QCollapsibleSection direction="up" :initial-expanded="false">
        <div class="collapsible-content">向上展开的内容区域</div>
      </QCollapsibleSection>

      <QCollapsibleSection direction="left" :initial-expanded="true">
        <div class="collapsible-content">向左展开的内容区域</div>
      </QCollapsibleSection>

      <QCollapsibleSection direction="right" :initial-expanded="false">
        <div class="collapsible-content">向右展开的内容区域</div>
      </QCollapsibleSection>

      <QCollapsibleSection :initial-expanded="true" :is-show-arrow="false">
        <div class="collapsible-content">隐藏箭头的可折叠区域</div>
      </QCollapsibleSection>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.w-400 {
  width: 400px;
}
.collapsible-content {
  width: 100%;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: 6px;
  background: #fafafa;
}
</style>
