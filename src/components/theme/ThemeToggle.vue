<template>
  <div aria-label="切换主题" class="theme-toggle" @click="toggle">
    <icon v-if="isDark" :size="size" icon="Moon"/>
    <icon v-else :size="size" icon="Sun"/>
  </div>
</template>
<script lang="ts" setup>
import Icon from '../basic/Icon.vue'
import {useFollowSystemTheme} from "@/utils/useFollowSystemTheme";

const {isDark, toggle, stop} = useFollowSystemTheme();
defineOptions({
  name: 'ThemeToggle'
})
defineProps<{
  size?: string | number
}>()
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
