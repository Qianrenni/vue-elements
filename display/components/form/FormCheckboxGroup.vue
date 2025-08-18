<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormCheckboxGroup from "@/components/form/FormCheckboxGroup.vue";
import {reactive} from "vue";

const form = reactive({
  hobby: []
});
const code = `
\`\`\`html
<FormCheckboxGroup
    v-model="form.hobby"
    :options="[
      { value: 'reading', label: '阅读' },
      { value: 'sports', label: '运动' },
      { value: 'music', label: '音乐' }
    ]"
    label="复选框"
/>
\`\`\`
`
</script>
<template>
  <DemoBlock :code="code">
    <FormCheckboxGroup
        v-model="form.hobby"
        :options="[
          { value: 'reading', label: '阅读' },
          { value: 'sports', label: '运动' },
          { value: 'music', label: '音乐' }
        ]"
        label="复选框"
    />
  </DemoBlock>
</template>

<style scoped>

</style>
