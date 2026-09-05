<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QBorderBeam } from 'qyani-components';

defineOptions({ name: 'DisplayDisplayBorderBeam' });

const code = `
\`\`\`html
<QBorderBeam style="border-radius: 16px">
  <div class="card">渐变卡片</div>
</QBorderBeam>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="grid">
      <QBorderBeam style="border-radius: 16px" class="beam">
        <div class="card">
          <b>默认光束</b>
          <p>主题色环绕卡片边框，持续移动。</p>
        </div>
      </QBorderBeam>

      <QBorderBeam
        color="#36cfc9"
        :duration="4"
        :size="180"
        style="border-radius: 16px"
        class="beam"
      >
        <div class="card">
          <b>快速 · 青色</b>
          <p>更长弧段 + 4s 一圈。</p>
        </div>
      </QBorderBeam>

      <QBorderBeam
        color="#722ed1"
        :count="2"
        style="border-radius: 16px"
        class="beam"
      >
        <div class="card">
          <b>双光束</b>
          <p>count=2 沿边框均匀分布。</p>
        </div>
      </QBorderBeam>

      <QBorderBeam hover style="border-radius: 16px" class="beam">
        <div class="card">
          <b>悬停显示</b>
          <p>鼠标移入卡片时出现光束。</p>
        </div>
      </QBorderBeam>
    </div>
  </DemoBlock>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.card {
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 16px;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
}
.card b {
  color: var(--q-color-text);
}
.card p {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--q-color-text-secondary);
  line-height: 1.6;
}
</style>
