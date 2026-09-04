<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QStatistic } from 'qyani-components';
import { onMounted, ref } from 'vue';

defineOptions({
  name: 'DisplayStatistic',
});

const count = ref(8846);
const statRef = ref<InstanceType<typeof QStatistic> | null>(null);

onMounted(() => {
  statRef.value?.startCountUp();
});

function add() {
  count.value += 1000;
  statRef.value?.startCountUp();
}

const code = `
\`\`\`html
<QStatistic title="今日访问" :value="1234567" :precision="0" />
<QStatistic title="销售额" :value="99.5" prefix="¥" suffix="万" :precision="2" />
<QStatistic title="累计用户" :value="count" count-up :count-duration="1200" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="stat-row">
      <QStatistic title="今日访问" :value="1234567" :precision="0" />
      <QStatistic
        title="销售额"
        :value="99.5"
        prefix="¥"
        suffix="万"
        :precision="2"
      />
      <QStatistic
        ref="statRef"
        title="累计用户"
        :value="count"
        :count-up="true"
        :count-duration="1200"
        @click="add"
      />
    </div>
    <p class="tip">点击「累计用户」数值可 +1000 重新滚动</p>
  </DemoBlock>
</template>

<style scoped>
.stat-row {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}
.stat-row :deep(.q-statistic-value) {
  cursor: pointer;
}
.tip {
  margin: 1rem 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
