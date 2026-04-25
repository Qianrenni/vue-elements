<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseLocalStorage',
});

const code = `
\`\`\`html
<!-- useLocalStorage Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useLocalStorage 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
