<script lang="ts" setup>
import { QAvatar } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayAvatar',
});

const code = `
\`\`\`html
<QAvatar url="https://example.com/avatar.jpg" />
<QAvatar url="https://example.com/avatar.jpg" size="4rem" />
<QAvatar url="https://example.com/avatar.jpg" size="64px" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container gap-8 items-center">
      <QAvatar url="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <QAvatar
        url="https://api.dicebear.com/7.x/avataaars/svg?seed=2"
        size="3rem"
      />
      <QAvatar
        url="https://api.dicebear.com/7.x/avataaars/svg?seed=3"
        size="4rem"
      />
      <QAvatar
        url="https://api.dicebear.com/7.x/avataaars/svg?seed=4"
        size="5rem"
      />
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
