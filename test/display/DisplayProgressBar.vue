<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import ProgressBar from "../../src/components/ProgressBar.vue";
defineOptions({
  name: "DisplayProgressBar",
})
const code=`
\`\`\`json
{
  percent: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'var(--primary-color)'
  },
  direction: {
    type: String as () => 'horizontal' | 'vertical',
    default: 'horizontal',
    validator: (value: string) => ['horizontal', 'vertical'].includes(value)
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div style="width: 100px;height: 2px;">
    <progress-bar percent="80%"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
