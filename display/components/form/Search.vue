<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import Search from "@/components/form/Search.vue";

const searchHandler = (e: any) => {
  alert(e);
}
const changeHandler = (e: any) => {
  alert(e);
}
const code = `
    <div class="container">
      <Search @change="changeHandler" @search="(e)=>searchHandler(e)"/>
    </div>`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container">
      <Search @change="changeHandler" @search="(e)=>searchHandler(e)"/>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
