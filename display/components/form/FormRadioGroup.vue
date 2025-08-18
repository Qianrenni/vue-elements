<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormRadioGroup from "@/components/form/FormRadioGroup.vue";
import {reactive} from "vue";

const form = reactive({
  gender: 'male'
});
const code = `
        <FormRadioGroup
            v-model="form.gender"
            :options="[
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' }
        ]"
            direction="vertical"
            label="单选按钮 :"
            name="gender"
            required
        />`
</script>
<template>
  <DemoBlock :code="code">
    <div>
      <FormRadioGroup
          v-model="form.gender"
          :options="[
          { value: 'male', label: '男' },
          { value: 'female', label: '女' },
          { value: 'other', label: '其他' }
        ]"
          direction="vertical"
          label="单选按钮 :"
          name="gender"
          required
      />
    </div>
  </DemoBlock>
</template>

<style scoped>

</style>
