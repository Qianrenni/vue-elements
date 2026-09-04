<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton } from 'qyani-components';

defineOptions({
  name: 'DisplayBasicButton',
});

const code = `
\`\`\`html
<QButton type="primary">主按钮</QButton>
<QButton>默认按钮</QButton>
<QButton type="dashed">虚线按钮</QButton>
<QButton type="text">文本按钮</QButton>
<QButton type="link">链接按钮</QButton>

<QButton type="primary" :level="1">level1</QButton>
<QButton type="primary" :level="2">level2</QButton>
<QButton type="primary">level3（默认）</QButton>
<QButton type="primary" :level="4">level4</QButton>
<QButton type="primary" :level="5">level5</QButton>
<QButton type="primary" :level="6">level6</QButton>

<QButton type="primary" danger>危险主按钮</QButton>
<QButton danger>危险默认</QButton>
<QButton type="text" danger>危险文本</QButton>

<QButton type="primary" ghost>幽灵按钮</QButton>
<QButton type="primary" loading>加载中</QButton>
<QButton block type="primary">块级按钮</QButton>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 demo-wrap">
      <div class="container-row gap-4 flex-wrap">
        <QButton type="primary">主按钮</QButton>
        <QButton>默认按钮</QButton>
        <QButton type="dashed">虚线按钮</QButton>
        <QButton type="text">文本按钮</QButton>
        <QButton type="link">链接按钮</QButton>
      </div>

      <div class="container-row gap-4 flex-wrap align-center">
        <QButton type="primary" :level="1">level1</QButton>
        <QButton type="primary" :level="2">level2</QButton>
        <QButton type="primary">level3（默认）</QButton>
        <QButton type="primary" :level="4">level4</QButton>
        <QButton type="primary" :level="5">level5</QButton>
        <QButton type="primary" :level="6">level6</QButton>
      </div>

      <div class="container-row gap-4 flex-wrap">
        <QButton type="primary" danger>危险主按钮</QButton>
        <QButton danger>危险默认</QButton>
        <QButton type="dashed" danger>危险虚线</QButton>
        <QButton type="text" danger>危险文本</QButton>
        <QButton type="link" danger>危险链接</QButton>
      </div>

      <div class="container-row gap-4 flex-wrap align-center">
        <QButton type="primary" ghost>幽灵按钮</QButton>
        <QButton type="primary" loading>加载中</QButton>
        <QButton disabled>禁用</QButton>
        <QButton type="primary">
          <template #icon><span aria-hidden="true">★</span></template>
          带图标
        </QButton>
      </div>

      <div class="container-column gap-4">
        <QButton block type="primary">块级按钮</QButton>
        <QButton block href="https://example.com" target="_blank">
          链接按钮（整行）
        </QButton>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
