<script lang="ts" setup>
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";

defineOptions({
  name: "DisplayBadge",
})
const code = `
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
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container-column">
    <h3>1.默认</h3>
    <div class="container-center">

    </div>
    <h3>2.自定义</h3>
    <div class="container-center gap">


    </div>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
