<script lang="ts" setup>
import { QMessage } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayBasicMessage',
});

const code = `
\`\`\`html
<QMessage message="操作成功" type="success" />
<QMessage message="操作失败" type="error" />
<QMessage message="请注意" type="warning" />
<QMessage message="提示信息" type="info" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4">
      <QMessage message="操作成功" type="success" />
      <QMessage message="操作失败" type="error" />
      <QMessage message="请注意" type="warning" />
      <QMessage message="提示信息" type="info" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
