<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Tag from "../../src/components/Tag.vue";
defineOptions({
  name: "DisplayTag",
})
const code=`
\`\`\`html
  <div class="container">
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
  </div>
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
    <span class="tag button-outline radius-third-rem">标签</span>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
