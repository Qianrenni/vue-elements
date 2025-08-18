<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormTextarea from "@/components/form/FormTextarea.vue";
import {reactive} from "vue";

const code = `
        <FormTextarea
            v-model="form.desc"
            :rows="4"
            disabled
            label="描述"
            name="desc"
            placeholder="请输入详情..."
        />`
const form = reactive({
  desc: "这是描述"
})
</script>
<template>
  <DemoBlock :code="code">
    <FormTextarea
        v-model="form.desc"
        :rows="4"
        disabled
        label="描述"
        name="desc"
        placeholder="请输入详情..."
    />
  </DemoBlock>
</template>

<style scoped>

</style>
