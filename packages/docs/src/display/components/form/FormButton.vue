<script lang="ts" setup>
import { QFormButton } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayFormButton',
});

const code = `
\`\`\`html
<!-- 基础按钮 -->
<QFormButton>默认按钮</QFormButton>

<!-- 不同尺寸 -->
<QFormButton size="small">小按钮</QFormButton>
<QFormButton size="middle">中按钮</QFormButton>
<QFormButton size="large">大按钮</QFormButton>

<!-- 禁用状态 -->
<QFormButton disabled>禁用按钮</QFormButton>

<!-- 提交按钮 -->
<QFormButton type="submit">提交</QFormButton>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <div class="container gap-4 flex-wrap">
        <QFormButton>默认按钮</QFormButton>
        <QFormButton size="small">小按钮</QFormButton>
        <QFormButton size="middle">中按钮</QFormButton>
        <QFormButton size="large">大按钮</QFormButton>
      </div>
      <div class="container gap-4 flex-wrap">
        <QFormButton disabled>禁用按钮</QFormButton>
        <QFormButton type="submit">提交按钮</QFormButton>
        <QFormButton type="reset">重置按钮</QFormButton>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}
.flex-wrap {
  flex-wrap: wrap;
}
</style>
