<template>
  <component :is="iconMap[icon]"  style="cursor: pointer;width: 16px; height: 16px;" />
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

const iconMap:{ [index: string]: ReturnType<typeof defineAsyncComponent> } = {
  'user': defineAsyncComponent(() => import('../icons/User.vue')),
  'search': defineAsyncComponent(() => import('../icons/Search.vue')),
}
defineOptions({
  name:'Icon'
})
</script>

<style scoped></style>
