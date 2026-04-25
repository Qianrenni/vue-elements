<script lang="ts" setup>
import { QDialog, QFormButton } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutDialog' });

const dialogVisible = ref(false);

const code = `
\`\`\`html
<template>
  <QFormButton @click="dialogVisible = true">打开对话框</QFormButton>
  <QDialog v-model:visible="dialogVisible" title="标题">
    <p>对话框内容</p>
  </QDialog>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <QFormButton @click="dialogVisible = true">打开对话框</QFormButton>
      <QDialog v-model:visible="dialogVisible" title="示例对话框">
        <p>这是对话框的主要内容区域。</p>
        <p>可以放置表单、文本或其他任何内容。</p>
      </QDialog>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
</style>
