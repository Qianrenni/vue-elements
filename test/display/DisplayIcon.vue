<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import Icon from "../../src/components/basic/Icon.vue";
defineOptions({
  name: "DisplayIcon",
})
const code=`
# Props
\`\`\`json
{
  icon: {
    type: String,
    default: 'User'
  },
  size: {
    type: String,
    default: '32'
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container-flex-start  margin-vetical gap" >
    <icon icon="Wifi"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
