<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Badge from "../../src/components/Badge.vue";
defineOptions({
  name: "DisplayBadge",
})
const code=`
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
      <badge/>
    </div>
    <h3>2.自定义</h3>
    <div class="container-center gap">
      <badge :dot="true">
        <span class="button">
        按钮
      </span>
      </badge>
      <badge value="100">
      <span class="button">
        按钮
      </span>
      </badge>

    </div>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
