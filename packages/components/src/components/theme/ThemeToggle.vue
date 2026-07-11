<template>
  <div aria-label="切换主题" class="theme-toggle" @click="toggle">
    <QIcon v-if="isDark" :size="size" :icon="nightIcon" />
    <QIcon v-else :size="size" :icon="dayIcon" />
  </div>
</template>
<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';
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
