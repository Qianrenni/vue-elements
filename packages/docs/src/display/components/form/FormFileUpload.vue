<script lang="ts" setup>
import { QFormFileUpload } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormFileUpload',
});

const fileValue = ref<File | null>(null);
const multipleFiles = ref<FileList | null>(null);

const code = `
\`\`\`html
<template>
  <!-- 单文件上传 -->
  <QFormFileUpload 
    v-model="fileValue"
    label="上传文件"
    accept=".jpg,.png,.pdf"
  />

  <!-- 多文件上传 -->
  <QFormFileUpload 
    v-model="multipleFiles"
    multiple
    label="上传多个文件"
  />
</template>

<script setup>
import { ref } from 'vue';
const fileValue = ref(null);
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QFormFileUpload
        v-model="fileValue"
        label="单文件上传"
        accept="image/*"
      />
      <p v-if="fileValue">已选择: {{ fileValue.name }}</p>

      <QFormFileUpload
        v-model="multipleFiles"
        multiple
        label="多文件上传"
        accept="image/*"
      />
      <p v-if="multipleFiles">已选择: {{ multipleFiles.length }} 个文件</p>
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
