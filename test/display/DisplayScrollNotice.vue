<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import ScrollNotice from "../../src/components/ScrollNotice.vue";
defineOptions({
  name: "DisplayScrollNotice",
})
const code=`
\`\`\`json
{
  text:{
    type: String,
    required: true
  },
  width:{
    type: Number,
    required: true
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <scroll-notice :text="'无线滚动'" :width="300"  class="padding-fourth-rem radius-rem bg-body"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
