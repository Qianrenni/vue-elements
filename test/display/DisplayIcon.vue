<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import IconGroups from "../../src/components/IconGroups.vue";
import Icon from "../../src/components/Icon.vue";
defineOptions({
  name: "DisplayDisplayIconGroups",
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
    <icon/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
