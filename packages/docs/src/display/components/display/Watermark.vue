<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QWatermark } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayWatermark' });

const text = ref('内部资料');
const fontColor = ref('#000000');

const code = `
\`\`\`html
<QWatermark content="内部资料">
  <div class="page">受保护内容区域……</div>
</QWatermark>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="control">
      <label>
        水印文字
        <input v-model="text" class="inp" placeholder="输入水印" />
      </label>
      <label>
        颜色
        <input v-model="fontColor" type="color" />
      </label>
    </div>
    <QWatermark
      :content="[text || '内部资料', '2026-09-05']"
      :font="{ color: fontColor }"
      :gap="[120, 120]"
    >
      <div class="page">
        <h4>机密说明页</h4>
        <p>这是一段受水印保护的内容，仅允许授权人员查看与传播。</p>
        <p>水印层 pointer-events: none，不会影响页面内交互。</p>
      </div>
    </QWatermark>
  </DemoBlock>
</template>

<style scoped>
.control {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
  color: var(--q-color-text-secondary);
  font-size: 13px;
}
.control label {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}
.inp {
  padding: 6px 10px;
  border: 1px solid var(--q-color-border-light);
  border-radius: 6px;
  min-width: 180px;
}
.page {
  position: relative;
  padding: 24px;
  border: 1px solid var(--q-color-gray-200);
  border-radius: 8px;
  background: #fff;
  color: #333;
}
.page h4 {
  margin: 0 0 12px;
}
</style>
