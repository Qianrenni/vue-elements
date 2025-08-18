<script lang="ts" setup>
import Icon from "@/components/basic/Icon.vue";
import DemoBlock from "@/components/display/DemoBlock.vue";

defineOptions({
  name: "DisplayIcon",
})
const code = `
<Icon icon="Wifi"/>
`
</script>

<template>
  <DemoBlock :code="code">
    <Icon icon="Wifi"/>
  </DemoBlock>
</template>

<style scoped>

</style>
