<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QPopconfirm } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutPopconfirm' });

const loading = ref(false);

async function doDelete() {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 1200));
  loading.value = false;
}

const code = `
\`\`\`html
<QPopconfirm
  title="确定删除该记录？"
  description="删除后不可恢复。"
  ok-text="删除"
>
  <QButton>删除</QButton>
</QPopconfirm>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QPopconfirm
        title="确定删除该记录？"
        description="删除后不可恢复。"
        ok-text="删除"
        @confirm="doDelete"
      >
        <QButton>异步删除</QButton>
      </QPopconfirm>
      <QPopconfirm
        title="确定要退出登录吗？"
        placement="bottomLeft"
        ok-text="退出"
      >
        <QButton>退出登录</QButton>
      </QPopconfirm>
    </div>
    <p v-if="loading" class="tip">异步请求中（确认按钮将保持 loading）…</p>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  gap: 16px;
}
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
