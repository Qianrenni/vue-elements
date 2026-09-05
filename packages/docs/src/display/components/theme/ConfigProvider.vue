<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QConfigProvider } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayThemeConfigProvider' });

const brand = ref<'brown' | 'blue' | 'purple'>('brown');

// 覆盖整套「主色」语义变量：文字/描边用 --q-color-primary，实心按钮用 --q-color-button-*
const palette: Record<string, Record<string, string>> = {
  brown: {
    '--q-color-primary': '#8c5a2b',
    '--q-color-button-bg': '#8c5a2b',
    '--q-color-button-hover': '#7a4e24',
    '--q-color-button-active': '#6e451f',
  },
  blue: {
    '--q-color-primary': '#3b82f6',
    '--q-color-button-bg': '#3b82f6',
    '--q-color-button-hover': '#2f6fe0',
    '--q-color-button-active': '#2a63c6',
  },
  purple: {
    '--q-color-primary': '#722ed1',
    '--q-color-button-bg': '#722ed1',
    '--q-color-button-hover': '#5f22b8',
    '--q-color-button-active': '#521d9e',
  },
};

const code = `
\`\`\`html
<QConfigProvider
  :css-vars="{
    '--q-color-primary': '#3b82f6',
    '--q-color-button-bg': '#3b82f6',
    '--q-color-button-hover': '#2f6fe0',
  }"
>
  <QButton type="primary">蓝色主题</QButton>
</QConfigProvider>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QButton size="small" @click="brand = 'brown'">书香褐</QButton>
      <QButton size="small" @click="brand = 'blue'">科技蓝</QButton>
      <QButton size="small" @click="brand = 'purple'">紫罗兰</QButton>
    </div>
    <QConfigProvider :css-vars="palette[brand]">
      <div class="panel">
        <QButton type="primary">主按钮</QButton>
        <QButton>默认按钮</QButton>
        <span class="chip" />
        <p class="hint">
          当前 CSS 变量：<code>{{ JSON.stringify(palette[brand]) }}</code>
        </p>
      </div>
    </QConfigProvider>
    <QConfigProvider direction="rtl">
      <div class="panel">
        <QButton type="primary">RTL 方向</QButton>
        <span class="hint">该区块 dir="rtl"，文字从右向左。</span>
      </div>
    </QConfigProvider>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.panel {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
}
.hint {
  margin: 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.hint code {
  font-family: monospace;
}
.chip {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--q-color-primary);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--q-color-primary) 30%, transparent);
}
</style>
