<template>
  <div :class="{
        'card-animation': animation
       }"
       class="card container-column "
  >

    <div class="card-header container-space-between ">
      <slot name="header"></slot>
    </div>

    <div class="card-body container-space-between ">
      <slot name="left"></slot>
      <div class="container-flex-1">
        <slot name="default"/>
      </div>
      <slot name="right"></slot>
    </div>

    <div class="card-footer container-space-between ">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {defineOptions} from 'vue'

defineProps({
  animation: {
    type: Boolean,
    default: false
  }
})
defineOptions({
  name: 'Card'
})
</script>

<style scoped>
</style>
