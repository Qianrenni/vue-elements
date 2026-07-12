<!--
 * @component QThemeToggle
 * @description 主题切换组件，支持日间/夜间模式切换
-->
<template>
  <div aria-label="切换主题" class="theme-toggle" @click="toggle">
    <QIcon v-if="isDark" :size="size" :icon="nightIcon" />
    <QIcon v-else :size="size" :icon="dayIcon" />
  </div>
</template>
<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
import { useFollowSystemTheme } from '@/utils';
import type { ThemeToggleProps } from './type';

const { isDark, toggle } = useFollowSystemTheme();
defineOptions({
  name: 'QThemeToggle',
});
withDefaults(defineProps<ThemeToggleProps>(), {
  size: 20,
  dayIcon: 'Sun',
  nightIcon: 'Moon',
});
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
