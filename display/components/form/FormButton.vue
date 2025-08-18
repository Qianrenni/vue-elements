<script lang="ts" setup>

import DemoBlock from "@/components/display/DemoBlock.vue";
import FormButton from "@/components/form/FormButton.vue";

const code = `
    <fieldset>
      <legend
      >
        按钮控件
      </legend>
      <FormButton
          type="submit"
      >
        提交
      </FormButton>
      <FormButton
          type="reset"
      >
        重置
      </FormButton>
    </fieldset>
`
</script>
<template>
  <DemoBlock :code="code">
    <fieldset>
      <legend
      >
        按钮控件
      </legend>
      <FormButton
          type="submit"
      >
        提交
      </FormButton>
      <FormButton
          type="reset"
      >
        重置
      </FormButton>
    </fieldset>
  </DemoBlock>
</template>

<style scoped>

</style>
