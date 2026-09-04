<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QRate } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputRate' });

const v1 = ref(3);
const v2 = ref(2.5);
const v3 = ref(4);

const code = `
\`\`\`html
<QRate v-model="value" />

<QRate v-model="value" allow-half />

<QRate v-model="value" character="赞" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <QRate v-model="v1" />
      <QRate v-model="v2" allow-half />
      <QRate v-model="v3" character="赞" />
    </div>
  </DemoBlock>
</template>
