<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QImage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayImage' });

const svg = (from: string, to: string, text: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/><text x="300" y="210" font-size="44" text-anchor="middle" fill="#fff">${text}</text></svg>`,
  )}`;

const img1 = svg('#8c5a2b', '#d4b48e', '山间');
const img2 = svg('#0d6efd', '#8fcae8', '海洋');
const img3 = svg('#28a745', '#b2f2cc', '森林');
const img4 = svg('#c82333', '#f5a3a3', '晚霞');

const open = ref(false);

const code = `
\`\`\`html
<QImage
  v-model:preview-open="open"
  :src="img1"
  width="120"
  height="80"
  fit="cover"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <p class="tip">
      点击缩略图打开全屏预览：滚轮缩放、底部工具栏放大/缩小/还原/旋转/关闭。
    </p>
    <div class="row">
      <QImage
        v-model:preview-open="open"
        :src="img1"
        width="140"
        height="94"
        fit="cover"
      />
      <QImage :src="img2" width="140" height="94" fit="cover" />
      <QImage :src="img3" width="120" height="120" fit="cover" />
      <QImage :src="img4" width="140" height="94" fit="cover" preview />
    </div>
    <p class="tip">当前第一张预览受控：{{ open ? '开' : '关' }}</p>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.tip {
  margin: 0 0 12px;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.row + .tip {
  margin: 12px 0 0;
}
</style>
