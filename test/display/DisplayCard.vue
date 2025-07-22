<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Card from "../../src/layout/Card.vue";
import ScollContainer from "../../src/layout/ScollContainer.vue";
defineOptions({
  name: "DisplayCard",
})
const code=`
# Props
\`\`\`json

{
  type: {
    type: String as () => "primary" | "success" | "warning" | "danger" | "gray"|"info",
    default: "info",
  },
  value:{
    type:[Number, String],
    default: 1,
  },
  max: {
    type: Number,
    default: 99,
  },
  dot: {
    type: Boolean,
    default: false,
  }
\`\`\`

# Demo
\`\`\`html
    <Card animation >
      <template #header>
        title
       </template>
      <template #default>
        default
      </template>
      <template #left>
        left
      </template>
      <template #right>
        right
      </template>
      <template #footer>
        footer
      </template>
    </Card>

\`\`\`
`
</script>

<template>
  <h1 class="text-center">示例</h1>
  <div class="container-column">
    <Card animation >
      <template #header>
        title
      </template>
      <template #default>
        default
      </template>
      <template #left>
        left
      </template>
      <template #right>
        right
      </template>
      <template #footer>
        footer
      </template>
    </Card>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
