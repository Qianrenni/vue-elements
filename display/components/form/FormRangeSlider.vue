<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormRangeSlider from "@/components/form/FormRangeSlider.vue";
import {reactive} from "vue";

const code = `
        <FormRangeSlider
            v-model="form.range"
            :max="100"
            :min="0"

            direction="vertical"
            label="滑块输入"
            name="range"
        />`
const form = reactive({
  range: 1,
})
</script>
<template>
  <DemoBlock :code="code">
    <FormRangeSlider
        v-model="form.range"
        :max="100"
        :min="0"

        direction="vertical"
        label="滑块输入"
        name="range"
    />
  </DemoBlock>
</template>

<style scoped>

</style>
