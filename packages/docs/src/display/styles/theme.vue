<script lang="ts" setup>
/**
 * 主题 (Theme) 示例
 * 展示暗色主题覆盖的语义变量；切换右上角 QThemeToggle 后颜色实时联动。
 */
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'StylesTheme' });

const cssVar = (name: string): string =>
  getComputedStyle(document.body).getPropertyValue(name).trim();

const semantic = [
  '--q-color-primary',
  '--q-color-primary-hover',
  '--q-color-text',
  '--q-color-text-description',
  '--q-color-text-muted',
  '--q-color-bg',
  '--q-color-bg-secondary',
  '--q-color-bg-card',
  '--q-color-border',
  '--q-color-link',
  '--q-color-tag',
].map((name) => ({ name, value: cssVar(name) }));

const code = `
\`\`\`html
<!-- 方式一：body 类名 -->
<body class="dark-mode">…</body>

<!-- 方式二：data-theme 属性 -->
<html data-theme="dark">…</html>

<!-- 配合组件 -->
<QThemeToggle />
\`\`\`
`;
</script>

<template>
  <div class="container-column gap-6">
    <DemoBlock title="暗色主题覆盖的语义变量" :code="code">
      <div class="container-column gap-4">
        <p>
          当前页面已通过
          <code>useFollowSystemTheme</code> 跟随系统主题；点击右上角
          <strong>QThemeToggle</strong> 可手动切换，以下色块随主题实时联动：
        </p>
        <div class="theme-grid">
          <div v-for="s in semantic" :key="s.name" class="theme-cell">
            <div
              class="theme-swatch"
              :style="{ backgroundColor: `var(${s.name})` }"
            />
            <div class="theme-name">{{ s.name }}</div>
            <div class="theme-value">{{ s.value }}</div>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock title="主题切换后整体表现">
      <div class="container-column gap-4">
        <div class="card-demo">
          <h4 class="card-demo-title">卡片示例</h4>
          <p>使用语义变量实现的卡片，暗色主题下自动反色。</p>
          <div class="flex gap-4">
            <span class="tag-demo">标签</span>
            <span class="tag-demo">状态</span>
          </div>
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  gap: var(--q-space-4);
}

.theme-cell {
  text-align: center;
}

.theme-swatch {
  height: 2.5rem;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
}

.theme-name {
  margin-top: var(--q-space-2);
  font-size: var(--q-font-size-xs);
  font-family: var(--q-font-family-mono);
  word-break: break-all;
}

.theme-value {
  font-size: var(--q-font-size-xs);
  color: var(--q-color-text-muted);
  font-family: var(--q-font-family-mono);
  word-break: break-all;
}

.card-demo {
  padding: var(--q-space-6);
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-lg);
  box-shadow: var(--q-shadow-sm);
}

.card-demo-title {
  margin-bottom: var(--q-space-4);
  color: var(--q-color-text);
  font-weight: var(--q-font-weight-semibold);
}

.tag-demo {
  padding: var(--q-space-2) var(--q-space-4);
  background: var(--q-color-tag);
  border-radius: var(--q-radius-sm);
  font-size: var(--q-font-size-sm);
  color: var(--q-color-text);
}
</style>
