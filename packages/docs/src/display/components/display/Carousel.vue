<script lang="ts" setup>
import { QCarousel, QCarouselItem } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayCarousel',
});

const code = `
\`\`\`html
<template>
  <QCarousel :width="600" :height="300">
    <QCarouselItem v-for="i in 4" :key="i">
      <div class="carousel-item">Slide {{ i }}</div>
    </QCarouselItem>
  </QCarousel>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <QCarousel :width="600" :height="300">
        <QCarouselItem v-for="i in 4" :key="i">
          <div
            class="carousel-item"
            :style="{ background: `hsl(${i * 60}, 70%, 60%)` }"
          >
            Slide {{ i }}
          </div>
        </QCarouselItem>
      </QCarousel>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.carousel-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
}
</style>
