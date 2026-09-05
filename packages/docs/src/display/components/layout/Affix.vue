<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QAffix, QButton } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutAffix' });

const boxRef = ref<HTMLElement | null>(null);
const topFixed = ref(false);
const bottomFixed = ref(false);

const code = `
\`\`\`html
<QAffix
  :offset-top="0"
  :target="() => boxRef"
  :on-change="(fixed) => (topFixed = fixed)"
>
  <QButton type="primary">吸顶工具栏</QButton>
</QAffix>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div ref="boxRef" class="affix-box">
      <div class="affix-panel">
        <QAffix
          :offset-top="0"
          :target="() => boxRef"
          :on-change="(fixed: boolean) => (topFixed = fixed)"
        >
          <div class="affix-bar">
            <span class="affix-bar-title">📌 吸顶工具栏</span>
            <QButton type="primary" size="small">新建</QButton>
            <span v-if="topFixed" class="affix-state">已固定</span>
          </div>
        </QAffix>
      </div>

      <div class="affix-content">
        <p v-for="i in 10" :key="i">
          第
          {{ i }}
          段：在该滚动容器内向下滚动，顶部工具栏吸附在容器顶部；向上滚回原位后释放。
        </p>
      </div>

      <QAffix
        :offset-bottom="12"
        :target="() => boxRef"
        :on-change="(fixed: boolean) => (bottomFixed = fixed)"
      >
        <div class="affix-bar affix-bar--bottom">
          <span class="affix-bar-title">⬆ 吸底操作</span>
          <QButton type="primary" size="small">提交</QButton>
          <span v-if="bottomFixed" class="affix-state">已固定</span>
        </div>
      </QAffix>
    </div>
  </DemoBlock>
</template>

<style scoped>
.affix-box {
  height: 320px;
  overflow: auto;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  padding: 12px;
  position: relative;
}
.affix-panel {
  margin-bottom: 12px;
}
.affix-bar {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: var(--q-color-bg-card);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md, 8px);
  box-shadow: var(--q-shadow-sm, none);
}
.affix-bar--bottom {
  margin-top: 12px;
}
.affix-bar-title {
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
}
.affix-state {
  font-size: var(--q-font-size-xs, 12px);
  color: var(--q-color-success, #52c41a);
}
.affix-content p {
  margin: 0 0 8px;
  font-size: var(--q-font-size-sm, 14px);
  color: var(--q-color-text-secondary);
  line-height: 1.8;
}
</style>
