<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutCollapsibleSection' });

const code = `
\`\`\`html
<!-- CollapsibleSection Component Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>CollapsibleSection 组件文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
