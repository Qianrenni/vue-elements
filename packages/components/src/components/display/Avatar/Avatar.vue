<!--
 * @component QAvatar
 * @description 头像组件，用于展示用户头像图片
 -->
<template>
  <img
    :src="props.url"
    :style="{
      width: props.size,
      height: props.size,
    }"
    alt="人像"
    class="avatar"
  />
</template>

<script lang="ts" setup>
import { AvatarProps } from './type';

defineOptions({ name: 'QAvatar' });

const props = withDefaults(defineProps<AvatarProps>(), {
  size: '2rem',
});
</script>

<style scoped>
.avatar {
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}
</style>
