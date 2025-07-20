<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import TabList from "../../src/components/TabList.vue";
defineOptions({
  name: "DisplayTabList",
})
const code=`
\`\`\`json
{
  url:{
    type:String,
    default:'https://picsum.photos/id/1005/200/200'
  },
  size:{
    type:String,
    default:'64px'
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <TabList :list="['栏目1','栏目2','栏目3']"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
