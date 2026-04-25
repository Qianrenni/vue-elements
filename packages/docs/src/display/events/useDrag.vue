<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayEventuseDrag',
});

const code = `
\`\`\`html
<!-- useDrag Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useDrag 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
