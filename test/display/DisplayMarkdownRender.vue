<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";

defineOptions({
  name: "DisplayMarkdownRender",
})
const code = `
\`\`\`json
{
  content: {
    type: String,
    required: true
  }
}
\`\`\`
`

const example1=`
\`\`\`python
def function():
    return True
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <markdown-render :content="example1"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
