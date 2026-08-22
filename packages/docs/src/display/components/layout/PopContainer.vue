<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QFormButton, QPopContainer } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutPopContainer' });

const visible = ref(false);

const code = `
\`\`\`html
<!-- 悬停显示弹出内容 -->
<QPopContainer hover-show position="bottom-center">
  <QFormButton>悬停查看</QFormButton>
  <template #pop>弹出内容</template>
</QPopContainer>

<!-- 通过 visible 控制显示 -->
<QPopContainer :visible="visible" position="bottom-center">
  <QFormButton @click="visible = !visible">点击切换</QFormButton>
  <template #pop>弹出内容</template>
</QPopContainer>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container gap-8 items-center pop-area">
      <QPopContainer hover-show position="bottom-center">
        <QFormButton>悬停查看</QFormButton>
        <template #pop>
          <div class="pop-card">悬停显示的弹出内容</div>
        </template>
      </QPopContainer>

      <QPopContainer :visible="visible" position="bottom-center">
        <QFormButton @click="visible = !visible">点击切换</QFormButton>
        <template #pop>
          <div class="pop-card">点击控制的弹出内容</div>
        </template>
      </QPopContainer>

      <QPopContainer hover-show position="right-center">
        <QFormButton>右侧弹出</QFormButton>
        <template #pop>
          <div class="pop-card">右侧弹出的内容</div>
        </template>
      </QPopContainer>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.items-center {
  align-items: center;
}
.pop-area {
  padding: 3.5rem 1rem;
}
.pop-card {
  padding: 0.5rem 0.9rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
}
</style>
