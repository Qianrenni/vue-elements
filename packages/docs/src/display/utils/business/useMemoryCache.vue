<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseMemoryCache',
});

const code = `
\`\`\`html
<!-- useMemoryCache Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useMemoryCache 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
