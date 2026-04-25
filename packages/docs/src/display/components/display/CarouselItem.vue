<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayCarouselItem',
});

const code = `
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem>
      <img src="image1.jpg" alt="图片1" />
    </QCarouselItem>
    <QCarouselItem>
      <img src="image2.jpg" alt="图片2" />
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <p>CarouselItem 是 Carousel 的子组件，用于包裹轮播内容。</p>
      <p>请参考 Carousel 组件的完整示例。</p>
    </div>
  </DemoBlock>
</template>

<style scoped></style>
