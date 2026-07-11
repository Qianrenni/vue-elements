<!--
 * @component QScrollNotice
 * @description 滚动通知组件，文本从右向左无限滚动，支持自定义滚动速度
 -->
<template>
  <div ref="scrollRef" style="overflow: hidden">
    <div ref="noticeRef" class="scroll-text">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ScrollNoticeProps } from './type';
import { useScrollNotice } from './composable';

defineOptions({ name: 'QScrollNotice' });

const props = withDefaults(defineProps<ScrollNoticeProps>(), {
  speed: 1,
});

useScrollNotice(props);
</script>

<style scoped></style>
