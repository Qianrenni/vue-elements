<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseMessage',
});

const code = `
\`\`\`html
<!-- useMessage Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useMessage 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
