<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QFlex } from 'qyani-components';

defineOptions({ name: 'DisplayLayoutFlex' });

const code = `
\`\`\`html
<QFlex justify="space-between" gap="middle">
  <div class="box">左</div>
  <div class="box">中</div>
  <div class="box">右</div>
</QFlex>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="vertical">
      <div class="seg">
        <b class="label">默认</b>
        <QFlex gap="small">
          <div class="box">A</div>
          <div class="box">B</div>
          <div class="box">C</div>
        </QFlex>
      </div>
      <div class="seg">
        <b class="label">space-between · wrap</b>
        <QFlex justify="space-between" gap="middle" wrap>
          <div class="box">1</div>
          <div class="box">2</div>
          <div class="box">3</div>
          <div class="box">4</div>
        </QFlex>
      </div>
      <div class="seg">
        <b class="label">垂直 · center</b>
        <QFlex
          vertical
          gap="middle"
          justify="center"
          align="center"
          style="height: 120px"
        >
          <div class="box">上</div>
          <div class="box">下</div>
        </QFlex>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.vertical {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.seg {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.label {
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 40px;
  border-radius: var(--q-radius-sm, 6px);
  background: color-mix(in srgb, var(--q-color-primary) 12%, transparent);
  color: var(--q-color-primary);
}
</style>
