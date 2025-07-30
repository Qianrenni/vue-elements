<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Search from "../../src/components/Search.vue";

defineOptions({
  name: "DisplaySearch",
})
const code=`
\`\`\`javascript
const emits = defineEmits<{
  (e: 'search', value: string): void
  (e: 'change', value: string): void
}>()
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索你感兴趣的内容'
  }
})
\`\`\`
`
const searchHandler=(e: any) => {
  alert(e);
}
const changeHandler=(e: any) => {
  console.log(e)
}
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <Search @search="(e)=>searchHandler(e)" @change="changeHandler"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
