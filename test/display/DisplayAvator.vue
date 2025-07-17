<script setup lang="ts">
import Avator from "../../src/components/Avator.vue";
import MarkdownRender from "../../src/components/MarkdownRender.vue";
defineOptions({
  name: "DisplayAvator",
})
const code=`
\`\`\`html
<avator :url="avatar"></avator>
\`\`\`
`
</script>

<template>
  <markdown-render content=""/>
  <h1 class="text-center">示例</h1>
 <div class="container-column">
   <h3>1.默认</h3>
   <div class="container-center">
     <avator/>
   </div>
   <h3>2.自定义</h3>
   <div class="container-center">
     <avator url="https://img-s.msn.cn/tenant/amp/entityid/BB1msKEr?w=0&h=0&q=60&m=6&f=jpg&u=t"/>
   </div>
 </div>

</template>

<style scoped>

</style>
