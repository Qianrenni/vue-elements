<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QTooltip } from 'qyani-components';

defineOptions({
  name: 'DisplayLayoutTooltip',
});

const code = `
\`\`\`html
<QTooltip content="上方提示">
  <QButton type="primary">上（hover）</QButton>
</QTooltip>

<QTooltip placement="bottomRight" content="右下提示">
  <QButton>右下</QButton>
</QTooltip>

<QTooltip content="点击触发" trigger="click">
  <QButton type="dashed">点击我</QButton>
</QTooltip>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-row gap-6 flex-wrap demo-wrap">
      <QTooltip content="上方提示">
        <QButton type="primary">上（hover）</QButton>
      </QTooltip>

      <QTooltip placement="bottomRight" content="右下提示">
        <QButton>右下</QButton>
      </QTooltip>

      <QTooltip content="左侧提示" placement="left">
        <QButton>左</QButton>
      </QTooltip>

      <QTooltip content="点击触发" trigger="click">
        <QButton type="dashed">点击我</QButton>
      </QTooltip>
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}

.flex-wrap {
  flex-wrap: wrap;
}
</style>
