<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, useMessage } from 'qyani-components';

defineOptions({
  name: 'DisplayFormButton',
});
const handleClick = (name: string) => {
  useMessage.info(`点击了${name}`);
};
const code = `
\`\`\`html
<!-- 基础按钮 -->
<QButton>默认按钮</QButton>

<!-- 不同尺寸 -->
<QButton size="small">小按钮</QButton>
<QButton size="middle">中按钮</QButton>
<QButton size="large">大按钮</QButton>

<!-- 禁用状态 -->
<QButton disabled>禁用按钮</QButton>

<!-- 提交按钮 -->
<QButton html-type="submit">提交</QButton>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <QButton @click="handleClick('默认按钮')">默认按钮</QButton>
        <QButton size="small" @click="handleClick('小按钮')">小按钮</QButton>
        <QButton size="middle" @click="handleClick('中按钮')">中按钮</QButton>
        <QButton size="large" @click="handleClick('大按钮')">大按钮</QButton>
      </div>
      <div class="container flex-wrap">
        <QButton disabled @click="handleClick('禁用按钮')">禁用按钮</QButton>
        <QButton html-type="submit" @click="handleClick('提交按钮')"
          >提交按钮</QButton
        >
        <QButton html-type="reset" @click="handleClick('重置按钮')"
          >重置按钮</QButton
        >
      </div>
    </div>
  </DemoBlock>
</template>
