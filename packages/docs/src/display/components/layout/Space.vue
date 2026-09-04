<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSpace } from 'qyani-components';

defineOptions({
  name: 'DisplayLayoutSpace',
});

const code = `
\`\`\`html
<QSpace>
  <span class="box">1</span>
  <span class="box">2</span>
  <span class="box">3</span>
</QSpace>

<QSpace direction="vertical" size="large">
  <span class="box wide">纵向 A</span>
  <span class="box wide">纵向 B</span>
</QSpace>

<QSpace size="small" wrap>
  <span class="box">S</span>
  <span class="box">M</span>
  <span class="box">L</span>
</QSpace>

<QSpace split="/">
  <span>目录</span>
  <span>详情</span>
  <span>关于</span>
</QSpace>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8 demo-wrap">
      <div class="container-column gap-3">
        <span class="label">水平 · middle（默认 16px）</span>
        <QSpace>
          <span class="box">1</span>
          <span class="box">2</span>
          <span class="box">3</span>
        </QSpace>
      </div>

      <div class="container-column gap-3">
        <span class="label">垂直 · large（24px）</span>
        <QSpace direction="vertical" size="large">
          <span class="box wide">纵向 A</span>
          <span class="box wide">纵向 B</span>
        </QSpace>
      </div>

      <div class="container-column gap-3">
        <span class="label">水平 · small（8px）· wrap</span>
        <QSpace size="small" wrap class="wrap-demo">
          <span v-for="i in 10" :key="i" class="box">{{ i }}</span>
        </QSpace>
      </div>

      <div class="container-column gap-3">
        <span class="label">split（分隔文本与分隔条）</span>
        <QSpace split="/">
          <span class="text">目录</span>
          <span class="text">详情</span>
          <span class="text">关于</span>
        </QSpace>
        <QSpace split>
          <span class="text">A</span>
          <span class="text">B</span>
          <span class="text">C</span>
        </QSpace>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}

.label {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
}

.box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: var(--q-color-primary);
  color: var(--q-color-white);
  border-radius: var(--q-radius-md);
  font-weight: 600;
}

.wide {
  width: 8rem;
}

.wrap-demo {
  max-width: 260px;
}

.text {
  color: var(--q-color-text);
}
</style>
