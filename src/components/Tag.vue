<template>
  <span
      class="tag"
      :class="{
        'radius-rem': circle === 'large',
        'radius-half-rem': circle === 'middle',
        'radius-third-rem': circle === 'small',
        [hoverClass]: true
      }"

  >{{ text }}</span>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

// 使用 defineProps 接收属性
defineProps({
  text:{
    type: String,
    default:''
  },
  circle:{
    type: String as () => 'large' | 'middle' | 'small' | 'none',
    default:'small',
    validator:(value:string)=>['large','middle','small','none'].includes(value)
  },
  hoverClass:{
    type: String ,
    default: 'button'
  }
})
</script>

<style scoped>

</style>
