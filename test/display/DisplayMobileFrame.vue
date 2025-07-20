<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import MobileFrame   from "../../src/components/MobileFrame.vue"
defineOptions({
  name: "DisplayMobileFrame",
})
const code = `
\`\`\`json
{
  src: {
    type: String,
    required: true
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>


  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
