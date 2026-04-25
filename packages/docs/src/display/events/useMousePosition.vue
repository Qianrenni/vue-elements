<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayEventuseMousePosition',
});

const code = `
\`\`\`html
<!-- useMousePosition Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useMousePosition 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
