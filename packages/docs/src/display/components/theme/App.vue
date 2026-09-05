<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QApp, QButton, useQApp } from 'qyani-components';
import type { QNotificationType } from 'qyani-components';
import { defineComponent, h, ref } from 'vue';

defineOptions({ name: 'DisplayThemeApp' });

// 作用域子组件：位于 <QApp> 内部，useQApp() 拿到的是 App 作用域上下文
const DemoInner = defineComponent({
  name: 'DemoAppInner',
  setup() {
    const app = useQApp();
    const items: { type: QNotificationType; label: string; title: string }[] = [
      { type: 'success', label: '成功', title: '已保存' },
      { type: 'info', label: '信息', title: '有新消息' },
      { type: 'warning', label: '警告', title: '磁盘空间不足' },
      { type: 'error', label: '错误', title: '网络异常' },
    ];
    const modalState = ref('未操作');
    const openConfirm = async () => {
      const ok = await app.modal.confirm({
        title: '删除确认',
        content: '确定要删除这条数据吗？',
      });
      modalState.value = ok ? '已确认删除' : '已取消';
      if (ok) app.message.success('删除成功');
    };
    return () =>
      h('div', { class: 'app-demo' }, [
        h(
          'div',
          { class: 'row' },
          items.map((item) =>
            h(
              QButton,
              {
                type: item.type === 'success' ? 'primary' : undefined,
                onClick: () =>
                  app.notification.open({ type: item.type, title: item.title }),
              },
              () => item.label,
            ),
          ),
        ),
        h(
          'div',
          { class: 'row' },
          (['info', 'success', 'warning', 'error'] as const).map((type) =>
            h(
              QButton,
              {
                size: 'small',
                onClick: () => app.message[type](`作用域消息：${type}`),
              },
              () => `message.${type}`,
            ),
          ),
        ),
        h('div', { class: 'row' }, [
          h(QButton, { onClick: openConfirm }, () => 'modal.confirm'),
          h(
            QButton,
            {
              onClick: async () => {
                await app.modal.alert({ title: '提示', content: '操作成功' });
              },
            },
            () => 'modal.alert',
          ),
        ]),
        h('p', { class: 'tip' }, `modal 结果：${modalState.value}`),
      ]);
  },
});

const code = `
\`\`\`html
<!-- QApp 子树内的任意组件中： -->
<QButton type="primary" @click="notification.success('已保存')">通知</QButton>
<QButton @click="message.info('这是一条消息')">消息</QButton>
<QButton @click="modal.confirm({ title: '删除确认', content: '确定删除？' })">弹窗</QButton>

<script setup>
// 由 useQApp() 取得绑定到本 App 作用域的 message / notification / modal
const { message, notification, modal } = useQApp();
const onDelete = async () => {
  const ok = await modal.confirm({ title: '删除确认', content: '确定删除？' });
  if (ok) message.success('已删除');
};
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QApp>
      <DemoInner />
      <p class="tip">
        message / notification 由 <code>useQApp().message</code> 与
        <code>useQApp().notification</code> 渲染进本 QApp 根（而非
        body），可继承 外层 QConfigProvider 的 CSS 变量 / 主题；<code
          >useQApp().modal</code
        >
        提供 命令式 confirm / alert。
      </p>
    </QApp>
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
.tip code {
  font-family: monospace;
}
</style>
