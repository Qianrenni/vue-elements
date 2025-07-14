<template>
  <component  :is="component"  style="cursor: pointer;width: 16px; height: 16px;" />
</template>

<script lang="ts" setup>
import {defineProps, defineAsyncComponent, defineOptions} from 'vue'
const props = defineProps(
    {
      icon: {
        type: String,
        default: 'user'
      }
    }
)

const component = defineAsyncComponent(() => import(`../icons/${props.icon.charAt(0).toUpperCase() + props.icon.slice(1)}.vue`))
defineOptions({
  name:'Icon'
})
</script>

<style scoped></style>
