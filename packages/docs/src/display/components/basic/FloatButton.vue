<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QFloatButton } from 'qyani-components';

defineOptions({ name: 'DisplayBasicFloatButton' });

const code = `
\`\`\`html
<div style="position: fixed; right: 24px; bottom: 24px">
  <QFloatButton type="primary" :badge="{ count: 3 }">
    <template #icon>＋</template>
  </QFloatButton>
</div>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="stage">
      <div class="panel">
        <span class="label">默认</span>
        <QFloatButton>
          <template #icon>＋</template>
        </QFloatButton>
        <QFloatButton type="primary" tooltip="新建">
          <template #icon>＋</template>
        </QFloatButton>
        <QFloatButton type="primary" shape="square" :badge="{ count: 3 }">
          <template #icon>✉</template>
        </QFloatButton>
        <QFloatButton shape="square" description="问">
          <template #icon>?</template>
        </QFloatButton>
        <QFloatButton :badge="{ dot: true, color: '#52c41a' }">
          <template #icon>🔔</template>
        </QFloatButton>
      </div>
    </div>
    <p class="tip">
      位置由外层容器控制（示例为普通文档流展示）；badge 支持数字与红点，tooltip
      悬停提示。
    </p>
  </DemoBlock>
</template>

<style scoped>
.stage {
  display: flex;
}
.panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  padding: 16px;
  min-height: 72px;
  border: 1px dashed var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
}
.label {
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
