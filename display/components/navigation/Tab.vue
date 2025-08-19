<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import Tab from "@/components/navigation/Tab.vue";

const code = `
\`\`\`html
<div class="container">
    <Tab :list="['栏目1','栏目2','栏目3']" @select="(index)=>console.log(index)"/>
</div>
\`\`\`
`
</script>
<template>
  <DemoBlock :code>
    <div class="container">
      <Tab :list="['栏目1','栏目2','栏目3']" @select="(index)=>console.log(index)"/>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
