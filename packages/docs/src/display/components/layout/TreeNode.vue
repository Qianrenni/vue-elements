<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutTreeNode' });

const code = `
\`\`\`html
<!-- TreeNode Component Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>TreeNode 组件文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
