<template>
  <span
      class="tag btn-outline"
      :class="{
        'radius-rem': circle === 'large',
        'radius-half-rem': circle === 'middle',
        'radius-third-rem': circle === 'small'
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
    type: String,
    default:'large',
    validator:(value:string)=>['large','middle','small','none'].includes(value)
  }
  }
)
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  white-space: nowrap;
  cursor: pointer;
}
</style>