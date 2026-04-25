<script lang="ts" setup>
import { QMarkdownRender } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayMarkdownRender',
});

const markdownContent = `
# Markdown 渲染示例

## 标题

这是 **加粗** 和 *斜体* 文本。

## 列表

- 项目 1
- 项目 2
- 项目 3

## 代码

\`\`\`javascript
console.log('Hello World');
\`\`\`

## 引用

> 这是一段引用文本

## 链接

[访问官网](https://example.com)
`;

const code = `
\`\`\`html
<template>
  <QMarkdownRender :content="markdownContent" />
</template>

<script setup>
const markdownContent = \`
# 标题

这是 **加粗** 文本。
\`;
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="markdown-demo">
      <QMarkdownRender :content="markdownContent" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.markdown-demo {
  max-height: 400px;
  overflow-y: auto;
}
</style>
