<script lang="ts" setup>
import { QAvatar } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayAvatar',
});

const code = `
\`\`\`html
<QAvatar url="https://picsum.photos/200/300" />
<QAvatar url="https://picsum.photos/200/300" size="4rem" />
<QAvatar url="https://picsum.photos/200/300" size="64px" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container gap-8 items-center">
      <QAvatar url="https://picsum.photos/200/300" />
      <QAvatar url="https://picsum.photos/200/300" size="3rem" />
      <QAvatar url="https://picsum.photos/200/300" size="4rem" />
      <QAvatar url="https://picsum.photos/200/300" size="5rem" />
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
</style>
