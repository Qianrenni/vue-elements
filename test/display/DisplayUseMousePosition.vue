<script setup lang="ts">
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import {useMousePosition} from "../../src";
defineOptions({
  name: "DisplayUseMousePosition",
})
const code=`
\`\`\`js
const {x ,y} = useMousePosition()
\`\`\`
`
const {x ,y} = useMousePosition()
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    x:{{x}}
    y:{{y}}
  </div>
  <markdown-render :content="code"/>

</template>

<style scoped>

</style>
