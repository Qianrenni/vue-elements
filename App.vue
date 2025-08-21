<!-- App.vue 或其他页面 -->
<template>
  <div>
    <theme-toggle size="32"/>
    <FormSwitch v-model="enabled" label="启用功能"/>
    <FormSwitch v-model="enabled" label="启用功能" size="small"/>
    <FormSwitch v-model="enabled" label="启用功能" size="large"/>
    <br/>
    <FormSwitch v-model="darkMode" label="深色模式"/>
    <FormSwitch v-model="darkMode" direction="vertical" label="深色模式"/>
    <br/>
    <FormSwitch v-model="notifications" disabled label="接收通知"/>

    <p>Enabled: {{ enabled }}</p>
    <p>Dark Mode: {{ darkMode }}</p>
    <p>Notifications: {{ notifications }}</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import FormSwitch from "@/components/form/FormSwitch.vue";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";

const enabled = ref(false)
const darkMode = ref(true)
const notifications = ref(false)
</script>