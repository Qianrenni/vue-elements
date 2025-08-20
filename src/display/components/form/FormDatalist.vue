<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormDatalist from "@/components/form/FormDatalist.vue";
import {reactive} from "vue";

const code = `
\`\`\`html
<FormDatalist
    v-model="form.browser"
    :options="['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']"
    direction="vertical"
    label="选择浏览器" name="browser"
    placeholder="输入或选择浏览器"
/>
\`\`\``
const form = reactive({
  browser: ''
})
</script>
<template>
  <DemoBlock :code="code">
    <FormDatalist
        v-model="form.browser"
        :options="['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']"
        direction="vertical"
        label="选择浏览器" name="browser"
        placeholder="输入或选择浏览器"
    />
  </DemoBlock>
</template>

<style scoped>

</style>
