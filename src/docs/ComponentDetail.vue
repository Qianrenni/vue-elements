<!-- src/docs/ComponentDetail.vue -->
<script lang="ts" setup>
import {defineOptions, ref} from 'vue'
import MarkdownRender from '@/components/display/MarkdownRender.vue'
import {ComponentInfo} from "@/utils/useComponentScanner";

defineOptions({
  name: 'ComponentDetail'
})
defineProps<{
  component: ComponentInfo | null
}>()

const componentRef = ref()
</script>

<template>
  <div v-if="!component" class="placeholder bg-card component-detail">
    请选择一个组件
  </div>

  <div v-else class="scroll-container scroll-y bg-card component-detail container">
    <div class="container-column padding-rem container-flex-1">
      <!-- 右侧标题 -->
      <h2 class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray">
        {{ component.displayName }} 组件
      </h2>

      <!-- 组件展示区 -->
      <div class="component-display padding-rem radius-half-rem shadow-black">
        <!-- Markdown 文档 -->
        <MarkdownRender :content="component.docContent"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-detail {
  flex: 1;
  overflow-y: auto;
  background: white;
  height: 100vh;
  max-width: 1000px;
}

.component-display {
  transition: all 0.5s ease;
  flex: 1;
}

.preview {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.2em;
}

/* 添加进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
