<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayUtilsBusinessuseClip',
});

const code = `
\`\`\`html
<!-- useClip Demo -->
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p>useClip 文档待完善</p>
  </DemoBlock>
</template>

<style scoped></style>
