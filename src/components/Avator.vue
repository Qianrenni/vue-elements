<template>
  <img :src="$props.url" class="avatar" alt="人像">
</template>

<script setup lang="ts">
import {defineOptions, defineProps} from 'vue'
const props=defineProps({
  url:{
    type:String,
    default:'https://picsum.photos/id/1005/200/200'
  }
})
defineOptions({
  name:'Avator'
})
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>