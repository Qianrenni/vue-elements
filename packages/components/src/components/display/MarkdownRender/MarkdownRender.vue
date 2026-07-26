<!--
 * @component QMarkdownRender
 * @description Markdown 渲染组件，支持代码高亮、数学公式、悬浮目录等功能
 -->
<template>
  <div
    ref="refMarkdownContainer"
    :class="{ 'markdown-with-toc': props.showToc && toc.length > 0 }"
    class="markdown-container"
  >
    <div class="markdown-body" v-html="htmlContent" />
    <span
      v-if="props.showCopy && props.content.trim() !== ''"
      class="copy"
      @click.prevent="copyHandler"
    >
      <QIcon icon="Copy" size="16" />
    </span>
    <!-- 悬浮目录 -->
    <div
      v-if="props.showToc && toc.length > 0"
      :class="{ 'toc-collapsed': !tocExpanded }"
      class="floating-toc"
    >
      <div class="toc-header" @click="toggleToc">
        <span v-if="tocExpanded">目录</span>
        <div v-else class="toc-icon">
          <QIcon icon="Minus" />
        </div>
      </div>
      <div v-show="tocExpanded" class="toc-content scroll-container scroll-y">
        <div
          v-for="item in toc"
          :key="item.id"
          :class="{ [`level-${item.level}`]: true }"
          class="toc-item"
          @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';

import { useMarkdownRender } from './composable';
import type { MarkdownRenderProps } from './type';

defineOptions({ name: 'QMarkdownRender' });

const props = withDefaults(defineProps<MarkdownRenderProps>(), {
  showCopy: true,
  showToc: false,
});

const {
  htmlContent,
  toc,
  tocExpanded,
  refMarkdownContainer,
  toggleToc,
  scrollToHeading,
  copyHandler,
  getTOC,
  scrollToById,
  scrollTo,
  getContent,
} = useMarkdownRender(props);

defineExpose({
  /** 获取目录结构 */
  getTOC,
  /** 滚动到指定标题 ID */
  scrollToById,
  /** 滚动容器 */
  scrollTo,
  /** 获取原始内容 */
  getContent,
});
</script>

<style scoped>
.copy {
  display: flex;
  justify-content: flex-end;
}

.markdown-container {
  position: relative;
}

.markdown-with-toc {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(12rem, 16rem);
  column-gap: 1.5rem;
}

.markdown-with-toc .markdown-body {
  min-width: 0;
}

.floating-toc {
  position: sticky;
  top: 1rem;
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  max-height: calc(100vh - 2rem);
  padding-left: 1.5rem;
  border-left: 1px solid var(--border-color);
}

.toc-collapsed {
  width: auto;
  max-height: none;
}

.toc-header {
  padding: 0 0 0.75rem;
  color: var(--text-color);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.toc-icon {
  display: none;
}

.toc-content {
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
}

.toc-item {
  padding: 0.25rem 0;
  color: var(--subtle-text-color);
  cursor: pointer;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.2s ease;
}

.toc-item:hover {
  color: var(--primary-color);
}

.level-1 {
  font-weight: bold;
  margin-left: 0;
}

.level-2 {
  margin-left: 12px;
}

.level-3 {
  margin-left: 24px;
  font-size: 0.95em;
}

.level-4,
.level-5,
.level-6 {
  margin-left: 36px;
  font-size: 0.9em;
  color: var(--subtle-text-color);
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .markdown-with-toc {
    display: flex;
    flex-direction: column;
  }

  .floating-toc {
    position: relative;
    top: auto;
    order: -1;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    padding-left: 0;
    border-top: 0;
    border-bottom: 1px solid var(--border-color);
    border-left: 0;
  }

  .toc-header {
    padding: 0 0 0.75rem;
  }
}
</style>
