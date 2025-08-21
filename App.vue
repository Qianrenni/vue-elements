<script setup>
import {useMessage, useTimeDisplay} from "@";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";
import FormButton from "@/components/form/FormButton.vue";

defineOptions({
  name: 'App'
})
// 自动判断：未来 → 倒计时，过去 → 格式化
const time = useTimeDisplay('2025-12-31', '{DD}天{HH}小时{mm}分{ss}秒');

// 实时时间
const now = useTimeDisplay(undefined, 'YYYY年MM月DD日HH:mm:ss');
</script>

<template>
  <div
      class="container-align-center container-column container-w100"
  >
  <span>

  </span>
    <div class="container-w100">
      <theme-toggle size="32"/>
    </div>
    <div>
      <p>{{ time }}</p>
      <p>{{ now }}</p>
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
