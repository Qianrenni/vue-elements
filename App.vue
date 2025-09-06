<template>
  <MarkdownRender :content="markDownContent"/>
</template>
<script lang="ts" setup>
import MarkdownRender from "@/components/display/MarkdownRender.vue";

const markDownContent = `
  # 测试
  ## 测试
  ### 测试
  #### 测试
  ##### 测试
  ###### 测试
  `
</script>
<style lang="css" scoped>

</style>