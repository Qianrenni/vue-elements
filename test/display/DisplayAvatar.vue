<script lang="ts" setup>
import MarkdownRender from "../../src/components/display/MarkdownRender.vue";
import {QAvatar} from "../../src";

defineOptions({
  name: "DisplayAvatar",
})
const code = `
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
  <div class="container-column">
    <h3>1.默认</h3>
    <div class="container-center">
      <QAvatar/>
    </div>
    <h3>2.自定义</h3>
    <div class="container-center">
      <QAvatar url="https://img-s.msn.cn/tenant/amp/entityid/BB1msKEr?w=0&h=0&q=60&m=6&f=jpg&u=t"/>
    </div>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
