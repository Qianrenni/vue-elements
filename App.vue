<script setup>
import {useMessage} from "@";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";
import FormButton from "@/components/form/FormButton.vue";

defineOptions({
  name: 'App'
})
</script>

<template>
<div
    class="container-align-center container-column container-w100"
>
  <div class="container-w100">
    <theme-toggle size="32"/>
  </div>
  <FormButton type="button" @click="useMessage.success('success')">
    ClickMe
  </FormButton>
  <FormButton type="button" @click="useMessage.error('error')">
    ClickMe
  </FormButton>
  <FormButton type="button" @click="useMessage.warning('warning')">
    ClickMe
  </FormButton>
  <FormButton type="button" @click="useMessage.info('gray')">
    ClickMe
  </FormButton>
</div>
</template>

<style scoped>

</style>
