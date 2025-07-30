<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Tab from "../../src/components/Tab.vue";
defineOptions({
  name: "DisplayTabList",
})
const code=`
\`\`\`json
{
  list: {
    type: Array as () => string[],
    default: () => []
  },
  activeClass: {
    type: String,
    default: 'active'
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <Tab :list="['栏目1','栏目2','栏目3']"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
