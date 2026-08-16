<!--
 * @component QNavSection
 * @description 导航区域组件，支持多层嵌套导航，包含返回按钮、当前层级标题和导航列表
 -->
<template>
  <div class="nav-section text-secondary">
    <!-- 返回按钮 -->
    <div
      v-if="stack.length > 1"
      :tabindex="0"
      class="back-button"
      role="button"
      title="返回上一级"
      @click="goBack"
      @keydown.enter.prevent="goBack"
      @keydown.space.prevent="goBack"
    >
      <QIcon icon="Left" size="24" />返回
    </div>
    <!-- 当前层级标题 -->
    <h4 v-if="currentLevelTitle" class="current-title">
      {{ currentLevelTitle }}
    </h4>

    <!-- 导航列表 -->
    <ul class="section-nav">
      <li
        v-for="(section, index) in currentSections"
        :key="index"
        class="nav-item"
      >
        <a
          v-if="section.children?.length"
          :aria-current="activeId === index ? 'page' : undefined"
          :class="{ active: activeId === index }"
          class="nav-link hover-primary"
          href="javascript:void(0)"
          @click="enterSubLevel(section, index)"
        >
          {{ section.title }}
        </a>
        <a
          v-else
          :aria-current="activeId === index ? 'page' : undefined"
          :class="{ active: activeId === index }"
          class="nav-link hover-primary"
          href="javascript:void(0)"
          @click="markActive(section, index)"
        >
          {{ section.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';

import { useNavSection } from './composable';
import type { NavSectionProps } from './type';

defineOptions({ name: 'QNavSection' });

const props = defineProps<{
  sections: NavSectionProps[];
  title: string;
}>();

const emit = defineEmits<{
  (e: 'select', section: NavSectionProps): void;
}>();

const {
  stack,
  activeId,
  currentSections,
  currentLevelTitle,
  enterSubLevel,
  goBack,
  markActive,
} = useNavSection(props, emit);
</script>

<style scoped></style>
