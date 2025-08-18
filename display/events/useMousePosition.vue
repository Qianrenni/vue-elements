<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import {useMousePosition} from "@";

const {x, y} = useMousePosition()
const code = `
<div class="container">
      x:{{x}}
      y:{{y}}
</div>
`
</script>
<template>
  <DemoBlock :code="code">
    <div class="container">
      x:{{ x }}
      y:{{ y }}
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
