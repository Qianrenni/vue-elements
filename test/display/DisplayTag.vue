<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
defineOptions({
  name: "DisplayTag",
})
const code=`
\`\`\`html
  <div class="container container-center container-align-center">
    <span class=" tag padding-28rem  radius-rem text-danger text-08rem "  >危险</span>
    <span class=" tag padding-28rem  radius-rem text-warning text-08rem"  >警告</span>
    <span class=" tag padding-28rem  radius-rem text-success text-08rem"  >成功</span>
    <span class=" tag padding-28rem  radius-rem text-info text-08rem"  >信息</span>
    <span class=" tag padding-28rem  radius-rem text-gray text-08rem"  > 通知</span>
    <span class=" tag padding-28rem  radius-rem text-primary border-primary text-08rem"  > 主色 </span>
  </div>
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container container-center container-align-center">
    <span class=" tag padding-28rem  radius-rem text-danger text-08rem "  >危险</span>
    <span class=" tag padding-28rem  radius-rem text-warning text-08rem"  >警告</span>
    <span class=" tag padding-28rem  radius-rem text-success text-08rem"  >成功</span>
    <span class=" tag padding-28rem  radius-rem text-info text-08rem"  >信息</span>
    <span class=" tag padding-28rem  radius-rem text-gray text-08rem"  > 通知</span>
    <span class=" tag padding-28rem  radius-rem text-primary border-primary text-08rem"  > 主色 </span>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
