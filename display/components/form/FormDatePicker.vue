<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormDatePicker from "@/components/form/FormDatePicker.vue";
import {reactive} from "vue";

const code = `
    <div class="container-column gap">
      <FormDatePicker
          v-model="form.date"
          direction="vertical"
          label="日期"
          name="date"
          type="date"
      />
      <FormDatePicker
          v-model="form.time"
          label="时间"
          name="time"
          type="time"
      />
      <FormDatePicker
          v-model="form.datetime"
          label="日期时间"
          name="datetime"
          type="datetime-local"
      />
    </div>`
const form = reactive({
  date: '',
  time: '',
  datetime: ''
})
</script>
<template>
  <demo-block :code="code">
    <div class="container-column gap">
      <FormDatePicker
          v-model="form.date"
          direction="vertical"
          label="日期"
          name="date"
          type="date"
      />
      <FormDatePicker
          v-model="form.time"
          label="时间"
          name="time"
          type="time"
      />
      <FormDatePicker
          v-model="form.datetime"
          label="日期时间"
          name="datetime"
          type="datetime-local"
      />
    </div>
  </demo-block>
</template>

<style scoped>

</style>
