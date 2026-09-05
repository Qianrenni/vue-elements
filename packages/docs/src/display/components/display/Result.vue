<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QResult } from 'qyani-components';

defineOptions({ name: 'DisplayResult' });

const code = `
\`\`\`html
<QResult
  status="success"
  title="提交成功"
  sub-title="我们将在 1 个工作日内完成审核。"
>
  <template #extra>
    <QButton type="primary">再次提交</QButton>
  </template>
</QResult>
<QResult status="404" title="页面不存在" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QResult
      status="success"
      title="提交成功"
      sub-title="我们将在 1 个工作日内完成审核，可在通知中心查看进度。"
      style="border: 1px solid var(--q-color-gray-200); border-radius: 8px"
    >
      <template #extra>
        <div class="extra">
          <button class="btn btn--primary" type="button">返回首页</button>
          <button class="btn" type="button">查看详情</button>
        </div>
      </template>
    </QResult>
    <div class="row">
      <QResult status="error" title="处理失败" />
      <QResult status="warning" title="存在未配置项" />
      <QResult status="404" title="页面不存在" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.extra {
  display: flex;
  justify-content: center;
  gap: 12px;
}
.btn {
  padding: 6px 18px;
  border: 1px solid var(--q-color-border-light);
  background: var(--q-color-bg-card);
  color: var(--q-color-text);
  border-radius: 6px;
  cursor: pointer;
}
.btn--primary {
  border-color: var(--q-color-primary);
  background: var(--q-color-primary);
  color: #fff;
}
.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  border-top: 1px solid var(--q-color-gray-100);
  margin-top: 24px;
}
.row :deep(.q-result) {
  padding: 24px 8px;
}
</style>
