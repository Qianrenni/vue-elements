<!--
 * @component QMarkdownRender
 * @description Markdown 渲染组件，支持代码高亮、数学公式、悬浮目录等功能
 -->
<template>
  <div class="markdown-container" ref="refMarkdownContainer">
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
import { useMarkdownRender } from './composable';
import type { MarkdownRenderProps } from './type';
import { QIcon } from '@/components/basic/Icon';

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
.markdown-container {
  position: relative;
}

.copy {
  display: flex;
  justify-content: flex-end;
}

.floating-toc {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: 0 2px 10px var(--box-shadow);
  transition: all 0.3s ease;
  z-index: var(--z-index-level-2);
  max-width: 300px;
  max-height: 60vh;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.toc-collapsed {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.toc-header {
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toc-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.toc-content {
  max-height: calc(60vh - 40px);
  overflow-y: auto;
}

.toc-item {
  padding: 4px 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s;
}

.toc-item:hover {
  background-color: var(--gray-100);
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
  .floating-toc {
    top: 10px;
    right: 10px;
    max-width: 250px;
  }

  .toc-collapsed {
    width: 32px;
    height: 32px;
  }
}
</style>
