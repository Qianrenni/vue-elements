<script lang="ts" setup>
import { QCarousel, QCarouselItem, QLazyImage } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayCarousel',
});
const currentIndex = ref(0);
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
      <p>Current Index: {{ currentIndex }}</p>
      <QCarousel
        :width="600"
        :height="300"
        @change="(index: number) => (currentIndex = index)"
      >
        <QCarouselItem v-for="i in 4" :key="i">
          <QLazyImage
            src="https://picsum.photos/600/300?random={{ i }}"
            :width="600"
            :height="300"
          />
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
