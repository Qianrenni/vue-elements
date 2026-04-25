<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutPopContainer' });

const code = `
\`\`\`html
<!-- PopContainer Component Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>PopContainer 组件文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
