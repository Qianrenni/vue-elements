<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import RainFigure from "../../src/components/RainFigure.vue";
defineOptions({
  name: "DisplayProgressBar",
})
const code=`
\`\`\`json
{
  imageUrl: {
    type: String,
    required: true
  }
}
\`\`\`
`
</script>

<template>

  <h1 class="text-center">示例</h1>
  <div class="container">
    <RainFigure  :image-url="'https://p9-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/03edf48010164d3295f545bc89f98b3d~tplv-tb4s082cfz-aigc_resize_loss:1080:1080.webp?lk3s=4fa96020&x-expires=1754784000&x-signature=vPKcMykXTPDOqdn8dK%2FchGrq%2ByE%3D'"/>
  </div>
  <markdown-render :content="code"/>
</template>

<style scoped>

</style>
