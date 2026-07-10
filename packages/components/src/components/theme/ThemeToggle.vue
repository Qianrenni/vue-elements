<template>
  <div aria-label="切换主题" class="theme-toggle" @click="toggle">
    <icon v-if="isDark" :size="size" :icon="nightIcon" />
    <icon v-else :size="size" :icon="dayIcon" />
  </div>
</template>
<script lang="ts" setup>
import Icon from '../basic/Icon.vue';
import { useFollowSystemTheme } from '@/utils';

const { isDark, toggle } = useFollowSystemTheme();
defineOptions({
  name: 'ThemeToggle',
});
withDefaults(
  defineProps<{
    size?: string | number;
    dayIcon?: string;
    nightIcon?: string;
  }>(),
  {
    size: 20,
    dayIcon: 'Sun',
    nightIcon: 'Moon',
  },
);
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
</style>
