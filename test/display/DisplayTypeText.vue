<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";

defineOptions({
  name: "DisplayTypeText",
})
const code=`
\`\`\`html
<div class="container">
  <span class="text-primary">主色</span>
  <span class="text-danger">危险色</span>
  <span class="text-success">成功色</span>
  <span class="text-warning">警告色</span>
  <span class="text-gray">灰色</span>
  <span class="text-info">信息色</span>
</div>
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <span class="text-primary">主色</span>
    <span class="text-danger">危险色</span>
    <span class="text-success">成功色</span>
    <span class="text-warning">警告色</span>
    <span class="text-gray">灰色</span>
    <span class="text-info">信息色</span>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
