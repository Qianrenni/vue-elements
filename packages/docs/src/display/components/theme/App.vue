<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QApp, QButton, useQApp } from 'qyani-components';
import type { QNotificationType } from 'qyani-components';
import { defineComponent, h } from 'vue';

defineOptions({ name: 'DisplayThemeApp' });

// 作用域子组件：位于 <QApp> 内部，useQApp() 拿到的是 App 作用域通知
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
    return () =>
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
      );
  },
});

const code = `
\`\`\`html
<!-- QApp 子树内的任意组件中： -->
<QButton type="primary" @click="notification.success('已保存')">成功</QButton>

<script setup>
// 由 useQApp() 取得绑定到本 App 作用域的 notification
const { notification } = useQApp();
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QApp>
      <DemoInner />
      <p class="tip">
        通知由 <code>useQApp().notification</code> 渲染进本 QApp 根（而非
        body），可继承外层 QConfigProvider 的 CSS 变量 / 主题。
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
