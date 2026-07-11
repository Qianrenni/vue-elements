<script lang="ts" setup>
import { QFormButton, useMessage } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayFormButton',
});
const handleClick = (name: string) => {
  useMessage.info(`点击了${name}`);
};
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
    <div class="container-column">
      <div class="container flex-wrap">
        <QFormButton @click="handleClick('默认按钮')">默认按钮</QFormButton>
        <QFormButton size="small" @click="handleClick('小按钮')"
          >小按钮</QFormButton
        >
        <QFormButton size="middle" @click="handleClick('中按钮')"
          >中按钮</QFormButton
        >
        <QFormButton size="large" @click="handleClick('大按钮')"
          >大按钮</QFormButton
        >
      </div>
      <div class="container flex-wrap">
        <QFormButton disabled @click="handleClick('禁用按钮')"
          >禁用按钮</QFormButton
        >
        <QFormButton type="submit" @click="handleClick('提交按钮')"
          >提交按钮</QFormButton
        >
        <QFormButton type="reset" @click="handleClick('重置按钮')"
          >重置按钮</QFormButton
        >
      </div>
    </div>
  </DemoBlock>
</template>
