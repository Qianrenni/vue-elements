<script lang="ts" setup>
import ThemeToggle from "@/components/theme/ThemeToggle.vue";
import DemoBlock from "@/components/display/DemoBlock.vue";

const code = `
\`\`\`html
<theme-toggle size="32"/>
\`\`\`
`
</script>
<template>
  <demo-block :code="code">
    <theme-toggle size="32"/>
  </demo-block>

</template>

<style scoped>

</style>
