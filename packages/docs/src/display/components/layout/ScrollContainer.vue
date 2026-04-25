<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutScrollContainer' });

const code = `
\`\`\`html
<!-- ScrollContainer Component Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>ScrollContainer 组件文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
