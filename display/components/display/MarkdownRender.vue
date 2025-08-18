<script lang="ts" setup>
import MarkdownRender from '@/components/display/MarkdownRender.vue'
import DemoBlock from '@/components/display/DemoBlock.vue'

const content = `
\`\`\`typescript
function add(a: number, b: number) {
  return a + b
}
\`\`\`
`
const code = `
    <MarkdownRender :content="content"/>`
</script>
<template>
  <DemoBlock :code="code">
    <MarkdownRender :content="content"/>
  </DemoBlock>
</template>

<style scoped>

</style>
