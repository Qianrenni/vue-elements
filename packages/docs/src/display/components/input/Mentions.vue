<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QMentions } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputMentions' });

const text = ref('你好 @al');
const options = [
  { value: 'Alice' },
  { value: 'Bob', label: 'Bob（运营）' },
  { value: 'Carol' },
  { value: 'Dave', label: 'Dave（设计）' },
];

const code = `
\`\`\`html
<QMentions v-model="text" :options="options" placeholder="@ 提及同事" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QMentions
      v-model="text"
      :options="options"
      placeholder="输入 @ 提及同事"
      style="max-width: 360px"
    />
    <p class="tip">当前文本：{{ text }}</p>
  </DemoBlock>
</template>

<style scoped>
.tip {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
