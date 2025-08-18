<script lang="ts" setup>
import MobileFrame from '@/components/display/MobileFrame.vue'
import DemoBlock from '@/components/display/DemoBlock.vue'

const code = `
\`\`\`html
<MobileFrame :src="url"/>
\`\`\`
`
const url = "http://1.95.141.194/user/"
</script>
<template>
  <DemoBlock :code="code">
    <mobile-frame :src="url"/>
  </DemoBlock>
</template>

<style scoped>

</style>
