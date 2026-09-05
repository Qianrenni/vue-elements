<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, useNotification } from 'qyani-components';
import type { QNotificationType } from 'qyani-components';

defineOptions({ name: 'DisplayBasicNotification' });

const notify = useNotification;

const open = (type: QNotificationType, title: string, description: string) => {
  notify.open({ type, title, description });
};

const code = `
\`\`\`html
<QButton @click="notify.success({ title: '保存成功', description: '你的修改已保存。' })">
  Success
</QButton>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QButton
        type="primary"
        @click="open('success', '保存成功', '你的修改已保存。')"
      >
        成功
      </QButton>
      <QButton @click="open('info', '系统通知', '有新消息，请注意查收。')">
        信息
      </QButton>
      <QButton
        @click="open('warning', '磁盘空间不足', '建议及时清理无用文件。')"
      >
        警告
      </QButton>
      <QButton @click="open('error', '请求失败', '网络异常，请稍后重试。')">
        错误
      </QButton>
      <QButton
        @click="
          notify.open({
            type: 'success',
            title: '底部弹窗',
            description: '使用 bottomLeft 位置。',
            placement: 'bottomLeft',
          })
        "
      >
        底部位置
      </QButton>
    </div>
    <p class="tip">默认右上角弹出，4.5 秒自动关闭；通知顶部可手动 × 关闭。</p>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
