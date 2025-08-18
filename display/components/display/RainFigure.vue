<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import RainFigure from "@/components/display/RainFigure.vue";

const code = `
\`\`\`html
<div class="container">
  <RainFigure
      :image-url="'https://p3-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/7dc082a4b9f74ce08f531be55fbc9b63~tplv-tb4s082cfz-aigc_resize_loss:720:720.webp?lk3s=4fa96020&x-expires=1757376000&x-signature=E8MuoSee9BWWMYPUitH0VdNBMjI%3D'"/>
</div>
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container">
      <RainFigure
          :image-url="'https://p3-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/7dc082a4b9f74ce08f531be55fbc9b63~tplv-tb4s082cfz-aigc_resize_loss:720:720.webp?lk3s=4fa96020&x-expires=1757376000&x-signature=E8MuoSee9BWWMYPUitH0VdNBMjI%3D'"/>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
