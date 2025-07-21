<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Tag from "../../src/components/Tag.vue";
defineOptions({
  name: "DisplayTag",
})
const code=`
\`\`\`json
{
  text:{
    type: String,
    default:''
  },
  circle:{
    type: String as () => 'large' | 'middle' | 'small' | 'none',
    default:'small',
    validator:(value:string)=>['large','middle','small','none'].includes(value)
  },
  hoverClass:{
    type: String ,
    default: ' button button-outline'
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <tag text="主色" />
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
