<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseWindowResize',
});

const code = `
\`\`\`html
<!-- useWindowResize Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useWindowResize 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
