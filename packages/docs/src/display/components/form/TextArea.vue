<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTextArea, useMessage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormTextArea',
});

const basicValue = ref('');
const autoSizeValue = ref('');
const countValue = ref('');
const clearValue = ref('可以一键清除的多行文本');
const statusValue = ref('内容校验未通过');

const onClear = () => {
  useMessage.info('已清空');
};

const code = `
\`\`\`html
<!-- 基础用法（默认 3 行） -->
<QTextArea v-model:value="basicValue" placeholder="请输入内容" />

<!-- 自适应高度（限制 2~6 行） -->
<QTextArea
  v-model:value="autoSizeValue"
  :auto-size="{ minRows: 2, maxRows: 6 }"
  placeholder="输入多行内容，高度自适应"
/>

<!-- 字数统计 -->
<QTextArea
  v-model:value="countValue"
  show-count
  :max-length="200"
  placeholder="最多 200 个字符"
/>

<!-- 可清除 -->
<QTextArea v-model:value="clearValue" allow-clear @clear="onClear" />

<!-- 校验状态 / 禁用 / 只读 -->
<QTextArea v-model:value="statusValue" status="error" />
<QTextArea v-model:value="basicValue" disabled placeholder="禁用" />
<QTextArea v-model:value="basicValue" readonly />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4" style="max-width: 420px">
      <div class="container flex-wrap">
        <QTextArea v-model:value="basicValue" placeholder="请输入内容" />
      </div>
      <div class="container flex-wrap">
        <QTextArea
          v-model:value="autoSizeValue"
          :auto-size="{ minRows: 2, maxRows: 6 }"
          placeholder="输入多行内容，高度自适应"
        />
      </div>
      <div class="container flex-wrap">
        <QTextArea
          v-model:value="countValue"
          show-count
          :max-length="200"
          placeholder="最多 200 个字符"
        />
      </div>
      <div class="container flex-wrap">
        <QTextArea v-model:value="clearValue" allow-clear @clear="onClear" />
      </div>
      <div class="container flex-wrap">
        <QTextArea v-model:value="statusValue" status="error" />
      </div>
      <div class="container flex-wrap">
        <QTextArea v-model:value="basicValue" disabled placeholder="禁用" />
        <QTextArea v-model:value="basicValue" readonly />
      </div>
    </div>
  </DemoBlock>
</template>
