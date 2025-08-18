<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import ScrollNotice from "@/components/display/ScrollNotice.vue";

const code = `
  <div class="container">
    <scroll-notice :text="'无线滚动'" :width="300"  class="padding-fourth-rem radius-rem bg-body"/>
  </div>`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container">
      <scroll-notice :text="'无线滚动'" :width="300" class="padding-fourth-rem radius-rem bg-body"/>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
