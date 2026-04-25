<script lang="ts" setup>
import { QFormText } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormText',
});

const textValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');

const code = `
\`\`\`html
<template>
  <!-- 文本输入 -->
  <QFormText 
    v-model="textValue"
    label="用户名"
    placeholder="请输入用户名"
  />

  <!-- 邮箱输入 -->
  <QFormText 
    v-model="emailValue"
    type="email"
    label="邮箱"
    placeholder="请输入邮箱地址"
  />

  <!-- 密码输入 -->
  <QFormText 
    v-model="passwordValue"
    type="password"
    label="密码"
    placeholder="请输入密码"
  />
</template>

<script setup>
import { ref } from 'vue';
const textValue = ref('');
const emailValue = ref('');
const passwordValue = ref('');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QFormText
        v-model="textValue"
        label="用户名"
        placeholder="请输入用户名"
      />
      <QFormText
        v-model="emailValue"
        type="email"
        label="邮箱"
        placeholder="请输入邮箱地址"
      />
      <QFormText
        v-model="passwordValue"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
</style>
