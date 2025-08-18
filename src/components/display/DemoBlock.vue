<!-- components/DemoBlock.vue -->
<template>
  <div class="demo-block">
    <div class="demo-header">
      <span class="title">{{ title }}</span>
      <button class="copy-btn" @click="copyCode">📄 复制</button>
    </div>
    <div class="demo-example container-center">
      <slot/>
    </div>
    <CollapsibleSection :initial-expanded="false" direction="up">
      <markdown-render :content="wrapCode" :show-copy="false" class="container-w100"/>
    </CollapsibleSection>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import MarkdownRender from "@/components/display/MarkdownRender.vue";
import CollapsibleSection from "@/components/layout/CollapsibleSection.vue";

const props = defineProps<{
  title?: string
  code?: string
}>()

const wrapCode = computed(() => {
  return props.code || ``
})
const copyCode = () => {
  if (!props.code) return
  navigator.clipboard.writeText(props.code).then(() => {
    alert('已复制到剪贴板！')
  })
}
</script>

<style scoped>
.demo-block {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.demo-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copy-btn {
  border: none;
  background: #eee;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.copy-btn:hover {
  background: #e0e0e0;
}
</style>
