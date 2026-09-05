<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QPopover } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutPopover' });

const open = ref(false);

const basicCode = `
\`\`\`html
<QPopover title="提示" content="这是一段提示文字">
  <QButton>悬停显示</QButton>
</QPopover>
\`\`\`
`;

const clickCode = `
\`\`\`html
<script setup>
const open = ref(false);
<\\/script>
<template>
  <QPopover v-model:open="open" title="操作面板" trigger="click">
    <QButton>点击打开</QButton>
    <template #content>
      <div class="actions">
        <a href="#">编辑</a>
        <a href="#">删除</a>
      </div>
    </template>
  </QPopover>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="basicCode">
    <QPopover title="悬停提示" content="鼠标移入卡片停留，可承载更多内容。">
      <QButton>悬停显示</QButton>
    </QPopover>
    <QPopover title="四种方向" content="试试不同位置" placement="bottomLeft">
      <QButton>左下角</QButton>
    </QPopover>
  </DemoBlock>

  <DemoBlock :code="clickCode">
    <QPopover v-model:open="open" title="操作面板" trigger="click">
      <QButton>点击打开（可交互）</QButton>
      <template #content>
        <div class="pop-actions">
          <a href="#" @click="open = false">关闭</a>
          <a href="#">查看</a>
        </div>
      </template>
    </QPopover>
    <span class="hint">状态：{{ open ? '开' : '关' }}</span>
  </DemoBlock>
</template>

<style scoped>
.pop-actions {
  display: flex;
  gap: 16px;
}
.pop-actions a {
  color: var(--q-color-primary);
}
.hint {
  margin-left: 16px;
  font-size: 13px;
  color: var(--q-color-text-secondary);
}
</style>
