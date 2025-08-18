<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormFileUpload from "@/components/form/FormFileUpload.vue";
import {reactive} from "vue";

const code = `
<div class="container-column gap">
      <FormFileUpload
          v-model="form.file"
          accept="image/*,.pdf"
          label="上传文件"
          name="file"
      />
      <FormFileUpload
          v-model="form.files"
          accept="*"
          direction="vertical"
          label="多文件上传"
          multiple
          name="files"
      />
    </div>`
const form = reactive({
  file: null,
  files: []
})
</script>
<template>
  <demo-block :code="code">
    <div class="container-column gap">
      <FormFileUpload
          v-model="form.file"
          accept="image/*,.pdf"
          label="上传文件"
          name="file"
      />
      <FormFileUpload
          v-model="form.files"
          accept="*"
          direction="horizontal"
          label="多文件上传"
          multiple
          name="files"
      />
    </div>
  </demo-block>
</template>

<style scoped>

</style>
