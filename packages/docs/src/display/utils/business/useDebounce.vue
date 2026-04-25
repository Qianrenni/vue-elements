<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseDebounce',
});

const code = `
\`\`\`html
<!-- useDebounce Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useDebounce 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
