<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import TypeText from "../../src/components/TypeText.vue";
defineOptions({
  name: "DisplayTypeText",
})
const code=`
\`\`\`json
{
  type: {
    type: String as ()=>'primary' | 'danger' | 'success' | 'warning' | 'gray' | 'personal' |'info',
    default: 'personal',
    validator: (value: string) => ['primary', 'danger', 'success', 'warning','gray','personal','info'].includes(value)
  },
  text: {
    type: String,
    required: true
  },
  foreground: {
    type: String,
    default: 'var(--text-color)'
  },
  background: {
    type: String,
    default: 'var(--background-color)'
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <type-text text="主色" type="primary" />
    <type-text text="成功" type="success" />
    <type-text text="警告" type="warning" />
    <type-text text="错误" type="danger" />
    <type-text text="信息" type="info" />

  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
