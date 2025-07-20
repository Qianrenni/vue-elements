<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import CollapsibleSection from "../../src/components/CollapsibleSection.vue";

defineOptions({
  name: "DisplayCollapsibleSection",
})
const code = `
\`\`\`json
{
  isShowArrow: {
    type: Boolean,
    default: true,
  },
  initialExpanded: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String as () => 'up' | 'down' | 'left' | 'right',
    default: 'down',
    validator: (value: string) =>
        ['up', 'down', 'left', 'right'].includes(value),
  },
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <CollapsibleSection  style="width: 100%;">
      <div>
        <span>down</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection   direction="left">
      <div>
        <span>left</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection  style="width: 100%;" direction="right">
      <div>
        <span>right</span>
      </div>
    </CollapsibleSection>
  </div>
  <div class="container">
    <CollapsibleSection direction="up" style="width: 100%;">
      <div>
        <span>up</span>
      </div>
    </CollapsibleSection>
  </div>

  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
