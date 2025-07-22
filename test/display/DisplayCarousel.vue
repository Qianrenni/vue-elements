<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import Carousel from "../../src/components/Carousel.vue";
import CarouselItem from "../../src/components/CarouselItem.vue";
defineOptions({
  name: "DisplayCarousel",
})
const code=`
# Props
\`\`\`json
{
  vertical: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type:  Boolean,
    default: true
  },
  //变换时间
  duration: {
    type: Number,
    default: 500
  },
  indicator: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String  as () => 'center-bottom' | 'center-top' | 'left-bottom' | 'left-top' | 'left-center' | 'right-bottom' | 'right-top' | 'right-center',
    default: 'center-bottom'
  },
  width:{
    type: Number,
    required: true
  },
  height:{
    type: Number,
    required: true
  },
  //间隔时间
  interval:{
    type: Number,
    default: 1500
  },
  //轮播方向
  direction:{
    type: String,
    default: 'next',
    validator(value:string) {
      return ['next', 'prev'].includes(value)
    }
  },
  showButton:{
    type: Boolean,
    default: true
  }

}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container-align-center container-column margin-vetical gap"  >
    <Carousel :height="300" :width="600"  direction="prev">
      <CarouselItem v-for="index in 5" :key="index">
        <div style="height: 300px;width: 600px;" class="container-center container-align-center">
          <img :src="`https://picsum.photos/600/300?random=${index+5}`" alt=""/>
        </div>
      </CarouselItem>
    </Carousel>
    <Carousel :height="300" :width="600 "  vertical indicator-position="right-center">
      <CarouselItem v-for="index in 5" :key="index">
        <div style="height: 300px;width: 600px;" class="container-center container-align-center">
          <img :src="`https://picsum.photos/600/300?random=${index+10}`" alt=""/>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
  <markdown-render :content="code"  />
</template>

<style scoped>

</style>
