<script lang="ts" setup>
import {defineOptions} from "vue";
import DemoBlock from "../../../src/components/display/DemoBlock.vue";
import Avatar from '@/components/display/Avatar.vue'

defineOptions({
  name: "DisplayAvatar",
})
const code = `
\`\`\`html
<avatar/>
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <avatar/>
  </DemoBlock>
</template>

<style scoped>

</style>
