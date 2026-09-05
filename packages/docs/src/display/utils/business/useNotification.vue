<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, useNotification } from 'qyani-components';

defineOptions({ name: 'DisplayUtilsBusinessuseNotification' });

const notify = useNotification;

const code = `
\`\`\`ts
import { useNotification } from 'qyani-components';

useNotification.success({ title: '保存成功', description: '已保存。' });
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QButton
        type="primary"
        @click="
          notify.success({ title: '保存成功', description: '你的修改已保存。' })
        "
      >
        成功
      </QButton>
      <QButton
        @click="notify.info({ title: '系统通知', description: '有新消息。' })"
      >
        信息
      </QButton>
      <QButton @click="notify.warning('磁盘空间不足')"> 警告 </QButton>
      <QButton
        @click="notify.error({ title: '请求失败', description: '网络异常。' })"
      >
        错误
      </QButton>
    </div>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
