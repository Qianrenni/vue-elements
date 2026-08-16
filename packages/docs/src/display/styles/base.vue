<script lang="ts" setup>
/**
 * 基础样式 (Base) 示例
 * 展示 reset 与 base.css 提供的基础元素样式。
 */
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'StylesBase' });

const baseCode = `
\`\`\`html
<h1>一级标题</h1>
<h2>二级标题</h2>
<p>正文段落，继承 --q-color-text 与 --q-font-family-base。</p>
<a href="#">链接文字</a>
<pre><code>const msg = 'hello qyani'</code></pre>
\`\`\`
`;
</script>

<template>
  <div class="container-column gap-6">
    <DemoBlock title="基础元素样式" :code="baseCode">
      <div class="container-column gap-4 base-preview">
        <h1>一级标题</h1>
        <h2>二级标题</h2>
        <p>
          正文段落，继承 <code>--q-color-text</code> 与
          <code>--q-font-family-base</code>，抗锯齿渲染已开启。
        </p>
        <a href="#">链接文字</a>
        <pre><code>const msg = 'hello qyani'</code></pre>
      </div>
    </DemoBlock>

    <DemoBlock title="主题切换示例">
      <p>
        基础样式依赖语义化变量，切换暗色主题后文字、背景、链接自动适配。
        点击页面右上角 <strong>QThemeToggle</strong> 即可体验。
      </p>
    </DemoBlock>
  </div>
</template>

<style scoped>
.base-preview {
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
}

.base-preview h1 {
  font-size: var(--q-font-size-2xl);
  font-weight: var(--q-font-weight-bold);
}

.base-preview h2 {
  font-size: var(--q-font-size-xl);
  font-weight: var(--q-font-weight-semibold);
}

.base-preview p {
  line-height: var(--q-line-height-normal);
}

.base-preview a {
  color: var(--q-color-link);
}

.base-preview a:hover {
  color: var(--q-color-link-hover);
}
</style>
