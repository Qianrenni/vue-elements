<script lang="ts" setup>
import DemoBlock from "@/components/display/DemoBlock.vue";
import IconGroups from "@/components/basic/IconGroups.vue";

defineOptions({
  name: "DisplayDisplayIconGroups",
})
const code =
    `
<IconGroups/>
`
</script>

<template>
  <DemoBlock :code="code">
    <IconGroups/>
  </DemoBlock>
</template>

<style scoped>

</style>
