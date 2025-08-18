<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";

import {useDrag} from "@";
import {onMounted, useTemplateRef} from "vue";

const refSpan = useTemplateRef('target');
onMounted(() => {
  if (refSpan.value) {
    useDrag(refSpan.value);
  }
})
const code = `
    <div  style="position:relative;height: 600px;width: 100%;overflow: hidden;">
      <span class="shadow-black mouse-cursor" ref="target" style="position: absolute;">被拖动元素 </span>
    </div>
`
</script>
<template>
  <DemoBlock :code="code">
    <div style="position:relative;height: 600px;width: 100%;overflow: hidden;">
      <span ref="target" class="shadow-black mouse-cursor" style="position: absolute;">被拖动元素 </span>
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
