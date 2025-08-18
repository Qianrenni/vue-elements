<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import {reactive} from "vue";

const code = `
<FormSelect
            v-model="form.select"
            :options="[
          { value: 'option1', label: '选项 1' },
          { value: 'option2', label: '选项 2' },
          { value: 'option3', label: '选项 3' },
          { value: 'option4', label: '选项 4' },
          { value: 'option5', label: '选项 5' },
          { value: 'option6', label: '选项 6' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
        ]"
            class="container-column"
            label="下拉选择"
            multiple
            name="select"
            placeholder="请选择"
            searchable
        />
`
const form = reactive({
  select: []
})
</script>
<template>
  <DemoBlock :code="code">
    <FormSelect
        v-model="form.select"
        :options="[
          { value: 'option1', label: '选项 1' },
          { value: 'option2', label: '选项 2' },
          { value: 'option3', label: '选项 3' },
          { value: 'option4', label: '选项 4' },
          { value: 'option5', label: '选项 5' },
          { value: 'option6', label: '选项 6' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
          { value: 'option7', label: '选项 7' },
        ]"
        class="container-column"
        label="下拉选择"
        multiple
        name="select"
        placeholder="请选择"
        searchable
        style="width: 300px;"
    />
  </DemoBlock>
</template>

<style scoped>

</style>
