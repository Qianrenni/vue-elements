<template>
  <component  :is="component"
              style="cursor: pointer;"
              :style="{
                width: props.size,
                height: props.size
              }"
  />
</template>

<script lang="ts" setup>
import {defineProps, defineAsyncComponent, defineOptions} from 'vue'
const props = defineProps(
    {
      icon: {
        type: String,
        default: 'user'
      },
      size: {
        type: String,
        default: '32px'
      }
    }
)

const component = defineAsyncComponent(() => import(`../icons/${props.icon.charAt(0).toUpperCase() + props.icon.slice(1)}.vue`))
defineOptions({
  name:'Icon'
})
</script>

<style scoped></style>
