<template>
  <component :is="iconMap[icon]"/>
</template>

<script setup lang="ts">
import {defineProps, defineAsyncComponent, defineOptions} from 'vue'
const props = defineProps(
    {
      icon: {
        type: String,
        default: 'user'
      }
    }
)

const iconMap = {
  'user': defineAsyncComponent(() => import('../icons/User.vue'))
}
defineOptions({
  name:'Icon'
})
</script>

<style scoped></style>
