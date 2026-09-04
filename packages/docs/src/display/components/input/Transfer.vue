<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTransfer } from 'qyani-components';
import type { TransferItem } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputTransfer' });

const targetKeys = ref<(string | number)[]>([]);
const targetKeys2 = ref<(string | number)[]>(['b', 'd']);

const dataSource: TransferItem[] = [
  { key: 'a', title: '苹果', description: '红色水果' },
  { key: 'b', title: '香蕉', description: '黄色水果' },
  { key: 'c', title: '樱桃', description: '小果' },
  { key: 'd', title: '榴莲', description: '重口味', disabled: true },
  { key: 'e', title: '葡萄', description: '紫色水果' },
];

const code = `
\`\`\`html
<QTransfer
  v-model="targetKeys"
  :data-source="dataSource"
  :titles="['待选', '已选']"
  style="width: 520px"
/>

<QTransfer
  v-model="targetKeys2"
  :data-source="dataSource"
  :titles="['左', '右']"
  :operations="['→', '←']"
  show-search
  one-way
  style="width: 520px"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-10 w-520">
      <QTransfer
        v-model="targetKeys"
        :data-source="dataSource"
        :titles="['待选', '已选']"
      />
      <QTransfer
        v-model="targetKeys2"
        :data-source="dataSource"
        :titles="['左', '右']"
        :operations="['→', '←']"
        show-search
        one-way
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-520 {
  width: 520px;
  max-width: 100%;
}
</style>
