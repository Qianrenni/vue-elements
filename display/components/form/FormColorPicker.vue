<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormColorPicker from "@/components/form/FormColorPicker.vue";
import {reactive} from "vue";

const form = reactive({
  color: '#007BFF',
});
const code = `
    <FormColorPicker
        v-model="form.color"
        label="主题颜色"
        name="color"
        size="large"
    />`
</script>
<template>
  <DemoBlock :code="code">
    <FormColorPicker
        v-model="form.color"
        label="主题颜色"
        name="color"
        size="large"
    />
  </DemoBlock>
</template>

<style scoped>

</style>
