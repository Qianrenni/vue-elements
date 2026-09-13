<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { useShowLoading } from 'qyani-components';

defineOptions({
  name: 'DisplayUtilsBusinessuseShowLoading',
});

const code = `
\`\`\`html
<!-- useShowLoading Demo -->
\`\`\`
`;
const func = () => {
  useShowLoading.show();
  setTimeout(() => {
    useShowLoading.hide();
  }, 2000);
};
</script>

<template>
  <DemoBlock :code="code">
    <p>useShowLoading 文档待完善</p>
    <QButton @click="func">开始加载</QButton>
  </DemoBlock>
</template>

<style scoped></style>
