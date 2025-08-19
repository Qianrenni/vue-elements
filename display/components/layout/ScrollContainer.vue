<script lang="ts" setup>
import ScrollContainer from "@/components/layout/ScrollContainer.vue";
import DemoBlock from "@/components/display/DemoBlock.vue";
</script>
<template>
  <DemoBlock>
    <ScrollContainer scoll-y style="height: 400px;width: 400px;" @ended="console.log('end',new Date().getTime())">
      <div class="bg-image-header" style="height: 600px;width: 400px;">

      </div>
    </ScrollContainer>
  </DemoBlock>
</template>
<style lang="css" scoped>

</style>