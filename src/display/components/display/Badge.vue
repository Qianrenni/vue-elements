<script lang="ts" setup>
import {defineOptions} from "vue";
import DemoBlock from "@/components/display/DemoBlock.vue";
import Badge from '@/components/display/Badge.vue'

defineOptions({
  name: "Badge"
})
const code = `
\`\`\`html
<div class="container-center gap">
  <badge :dot="true">
    <span class="button padding-24rem">
    按钮
  </span>
  </badge>
  <badge value="100">
    <span class="button padding-28rem">
      按钮
    </span>
  </badge>
</div>
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container-center gap">
      <badge :dot="true">
        <span class="button padding-24rem">
        按钮
      </span>
      </badge>
      <badge value="100">
        <span class="button padding-28rem">
          按钮
        </span>
      </badge>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
