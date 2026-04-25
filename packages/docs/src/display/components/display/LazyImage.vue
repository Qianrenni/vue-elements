<script lang="ts" setup>
import { QLazyImage } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayLazyImage',
});

const code = `
\`\`\`html
<!-- 基础用法 -->
<QLazyImage src="https://example.com/image.jpg" />

<!-- 自定义尺寸 -->
<QLazyImage 
  src="https://example.com/image.jpg" 
  width="300px" 
  height="200px" 
/>

<!-- 带alt文本 -->
<QLazyImage 
  src="https://example.com/image.jpg" 
  alt="图片描述" 
  width="400" 
  height="300" 
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <div class="container gap-8">
        <QLazyImage
          src="https://picsum.photos/200/200?random=1"
          width="200px"
          height="200px"
        />
        <QLazyImage
          src="https://picsum.photos/300/200?random=2"
          width="300px"
          height="200px"
        />
        <QLazyImage
          src="https://picsum.photos/400/300?random=3"
          width="400px"
          height="300px"
        />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
</style>
