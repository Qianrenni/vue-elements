<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutTree' });

const code = `
\`\`\`html
<!-- Tree Component Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>Tree 组件文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
