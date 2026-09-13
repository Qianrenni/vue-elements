<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QInput, useMessage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormInput',
});

const basicValue = ref('');
const affixValue = ref('');
const clearValue = ref('可清除的内容');
const countValue = ref('');
const passwordValue = ref('');
const statusValue = ref('校验未通过');

const onPressEnter = () => {
  useMessage.info(`回车提交：${clearValue.value || '空'}`);
};

const onClear = () => {
  useMessage.info('已清空');
};

const code = `
\`\`\`html
<!-- 基础用法 -->
<QInput v-model:value="basicValue" placeholder="请输入内容" />

<!-- 前后缀图标 -->
<QInput v-model:value="affixValue" prefix="Search" suffix="User" placeholder="请输入关键字" />

<!-- 可清除 + 回车事件 -->
<QInput v-model:value="clearValue" allow-clear @press-enter="onPressEnter" @clear="onClear" />

<!-- 字数统计 -->
<QInput v-model:value="countValue" show-count :max-length="20" placeholder="最多 20 个字符" />

<!-- 密码 + 校验状态 -->
<QInput v-model:value="passwordValue" type="password" placeholder="请输入密码" />
<QInput v-model:value="statusValue" status="error" />

<!-- 尺寸 -->
<QInput v-model:value="basicValue" size="small" placeholder="小" />
<QInput v-model:value="basicValue" size="middle" placeholder="中" />
<QInput v-model:value="basicValue" size="large" placeholder="大" />

<!-- 禁用 / 只读 -->
<QInput v-model:value="basicValue" disabled placeholder="禁用" />
<QInput v-model:value="basicValue" readonly />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4" style="max-width: 420px">
      <div class="container flex-wrap">
        <QInput v-model:value="basicValue" placeholder="请输入内容" />
      </div>
      <div class="container flex-wrap">
        <QInput
          v-model:value="affixValue"
          prefix="Search"
          suffix="User"
          placeholder="请输入关键字"
        />
      </div>
      <div class="container flex-wrap">
        <QInput
          v-model:value="clearValue"
          allow-clear
          @press-enter="onPressEnter"
          @clear="onClear"
        />
      </div>
      <div class="container flex-wrap">
        <QInput
          v-model:value="countValue"
          show-count
          :max-length="20"
          placeholder="最多 20 个字符"
        />
      </div>
      <div class="container flex-wrap">
        <QInput
          v-model:value="passwordValue"
          type="password"
          placeholder="请输入密码"
        />
        <QInput v-model:value="statusValue" status="error" />
      </div>
      <div class="container flex-wrap">
        <QInput v-model:value="basicValue" size="small" placeholder="小" />
        <QInput v-model:value="basicValue" size="middle" placeholder="中" />
        <QInput v-model:value="basicValue" size="large" placeholder="大" />
      </div>
      <div class="container flex-wrap">
        <QInput v-model:value="basicValue" disabled placeholder="禁用" />
        <QInput v-model:value="basicValue" readonly />
      </div>
    </div>
  </DemoBlock>
</template>
