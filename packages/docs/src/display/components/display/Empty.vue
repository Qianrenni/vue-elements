<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QButton, QEmpty } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayEmpty',
});

const empty = ref(true);

const code = `
\`\`\`html
<!-- 默认插画 + 默认文案 -->
<QEmpty />

<!-- 自定义描述 + 底部操作 -->
<QEmpty description="暂无搜索结果">
  <QButton size="small" type="primary">重新搜索</QButton>
</QEmpty>

<!-- 简洁插画 -->
<QEmpty preset="simple" description="暂无数据" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="empty-row">
      <QEmpty v-if="empty" description="暂无数据">
        <QButton size="small" type="primary" @click="empty = false"
          >去创建</QButton
        >
      </QEmpty>
      <div v-else class="filled">
        已创建内容
        <QButton size="small" @click="empty = true">清空</QButton>
      </div>

      <QEmpty description="暂无搜索结果" preset="simple">
        <QButton size="small" @click="empty = true">重新搜索</QButton>
      </QEmpty>
    </div>
  </DemoBlock>
</template>

<style scoped>
.empty-row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  flex-wrap: wrap;
}
.filled {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  color: var(--q-color-text-secondary);
}
</style>
