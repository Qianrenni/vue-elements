<script setup lang="ts">
import MarkdownRender from "../../src/components/MarkdownRender.vue";
import {onBeforeUnmount, onMounted, useTemplateRef} from "vue";
import {useDrag} from "../../src";

defineOptions({
  name: "DisplayDragUtil",
})
const spanRef=useTemplateRef<HTMLSpanElement>('target');
let dragHandler:{destroy:()=>void} | null = null;
onMounted(()=>{
  dragHandler = useDrag(spanRef.value);
})
onBeforeUnmount(()=>{
  if(dragHandler){
    dragHandler.destroy();
  }
});
const code=`
\`\`\`js
const spanRef=useTemplateRef<HTMLSpanElement>('target');
let dragHandler:{destroy:()=>void} | null = null;
onMounted(()=>{
  dragHandler = useDrag(spanRef.value);
})
onBeforeUnmount(()=>{
  if(dragHandler){
    dragHandler.destroy();
  }
});
\`\`\`

\`\`\`html
<div  style="position:relative;height: 600px;width: 100%;overflow: hidden;">
  <span class="shadow-black mouse-cursor" ref="target" style="position: absolute;">被拖动元素 </span>
</div>
\`\`\`
`

</script>

<template>

  <h1 class="text-center">示例</h1>
  <div  style="position:relative;height: 600px;width: 100%;overflow: hidden;">
    <span class="shadow-black mouse-cursor" ref="target" style="position: absolute;">被拖动元素 </span>
  </div>
  <markdown-render :content="code"/>

</template>

<style scoped>

</style>
