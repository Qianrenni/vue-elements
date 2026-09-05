<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QAlert } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayAlert' });

const closable = ref(true);

const code = `
\`\`\`html
<QAlert type="success" message="成功提示" description="详细说明文案" />
<QAlert type="info" message="信息提示" />
<QAlert type="warning" message="警告标题" closable />
<QAlert type="error" message="错误提示" banner />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="col">
      <QAlert
        type="success"
        message="成功提示"
        description="这是关于本次操作成功的详细说明。"
      />
      <QAlert type="info" message="这是一条普通信息提示。" />
      <QAlert
        type="warning"
        message="请注意检查输入内容。"
        :closable="closable"
      />
      <QAlert type="error" message="操作失败，请稍后重试。" banner />
    </div>
  </DemoBlock>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
