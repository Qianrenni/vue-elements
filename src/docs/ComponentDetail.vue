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
  <div v-if="!component" class="placeholder">
    请选择一个组件
  </div>

  <div v-else class="component-detail">
    <h1>{{ component.displayName }}</h1>

    <!-- 实时预览 -->
    <div class="preview">
      <component
          :is="component.name"
          v-if="component.name"
      />
    </div>

    <!-- Markdown 文档 -->
    <MarkdownRender :content="component.docContent"/>
  </div>
</template>

<style scoped>
.component-detail {
  padding: 2rem;
  flex: 1;
  overflow-y: auto;
  background: white;
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
</style>