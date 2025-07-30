<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import MobileFrame   from "../../src/components/display/MobileFrame.vue"
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
const url="http://1.95.141.194/user/"
</script>

<template>

  <h1 class="text-center">示例</h1>
  <mobile-frame :src="url" />

  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
