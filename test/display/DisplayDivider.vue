<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import Divider from "../../src/components/display/Divider.vue";


defineOptions({
  name: "DisplayDivider",
})
const code = `
\`\`\`json

\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <divider/>
  </div>
</template>

<style scoped>

</style>
