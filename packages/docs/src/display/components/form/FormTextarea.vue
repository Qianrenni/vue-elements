<script lang="ts" setup>
import { QFormTextarea } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormTextarea',
});

const textareaValue = ref('');
const resizableValue = ref('');

const code = `
\`\`\`html
<template>
  <!-- 基础文本域 -->
  <QFormTextarea 
    v-model="textareaValue"
    label="备注"
    placeholder="请输入内容"
  />

  <!-- 可调整大小的文本域 -->
  <QFormTextarea 
    v-model="resizableValue"
    :rows="8"
    resizable
    label="详细描述"
  />
</template>

<script setup>
import { ref } from 'vue';
const textareaValue = ref('');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8 w-400">
      <QFormTextarea
        v-model="textareaValue"
        label="基础文本域"
        placeholder="请输入内容"
      />
      <QFormTextarea
        v-model="resizableValue"
        :rows="8"
        resizable
        label="可调整大小"
        placeholder="可以拖动右下角调整大小"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.w-400 {
  width: 400px;
}
</style>
