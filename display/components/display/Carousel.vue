<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import Carousel from "@/components/display/Carousel.vue";
import CarouselItem from "@/components/display/CarouselItem.vue";

const code = `
\`\`\`html
<div class="container-align-center container-column margin-vetical gap">
  <Carousel :height="300" :width="600" direction="prev">
    <CarouselItem v-for="index in 5" :key="index">
      <div class="container-center container-align-center" style="height: 300px;width: 600px;">
        <img :src="\`https://picsum.photos/600/300?random=\${index + 5}\`" alt=""/>
      </div>
    </CarouselItem>
  </Carousel>
  <Carousel :height="300" :width="600 " indicator-position="right-center" vertical>
    <CarouselItem v-for="index in 5" :key="index">
      <div class="container-center container-align-center" style="height: 300px;width: 600px;">
        <img :src="\`https://picsum.photos/600/300?random=\${index + 10}\`" alt=""/>
      </div>
    </CarouselItem>
  </Carousel>
</div>
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container-align-center container-column margin-vetical gap">
      <Carousel :height="300" :width="600" direction="prev">
        <CarouselItem v-for="index in 5" :key="index">
          <div class="container-center container-align-center" style="height: 300px;width: 600px;">
            <img :src="`https://picsum.photos/600/300?random=${index+5}`" alt=""/>
          </div>
        </CarouselItem>
      </Carousel>
      <Carousel :height="300" :width="600 " indicator-position="right-center" vertical>
        <CarouselItem v-for="index in 5" :key="index">
          <div class="container-center container-align-center" style="height: 300px;width: 600px;">
            <img :src="`https://picsum.photos/600/300?random=${index+10}`" alt=""/>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
