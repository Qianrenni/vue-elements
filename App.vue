<template>
  <theme-toggle/>
  <div class="container">
    <div
        class="container container-w100 bg-card">
      <VirtualList
          :container-height="700"
          :data="photos" :item-size="100" class="container-w100">
        <template v-slot:default="{index,item}">
          <img :src="item" alt=""/>
        </template>
      </VirtualList>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ThemeToggle from "@/components/theme/ThemeToggle.vue";
import VirtualList from "@/components/display/VirtualList.vue";

const photos = Array.from({length: 1000}, (_, i) => `https://picsum.photos/100/100?random=${i}`);
</script>
<style lang="css" scoped>

</style>
