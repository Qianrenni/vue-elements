<!-- App.vue -->
<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue';
import ComponentDetail from '@/docs/ComponentDetail.vue';
import ComponentList from '@/docs/ComponentList.vue';
import { docsEntries, type DocsEntry } from '@/utils/useComponentInfo.ts';
import {
  QDrawer,
  QIcon,
  QThemeToggle,
  useFollowSystemTheme,
  useScreenSize,
} from 'qyani-components';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

useFollowSystemTheme();

const route = useRoute();
const router = useRouter();

/**
 * 由 URL 参数 /c/:name 推导当前选中的文档条目：
 * - 支持直接访问组件页、刷新不丢失状态、浏览器前进后退
 * - 未匹配或处于首页时返回 null，展示占位提示
 */
const selected = computed<DocsEntry | null>(() => {
  const name = route.params.name as string | undefined;
  if (!name) return null;
  return docsEntries.find((entry) => entry.name === name) ?? null;
});

/** 导航/搜索选中某条目时更新 URL */
const onSelect = (entry: DocsEntry) => {
  router.push({ name: 'component', params: { name: entry.name } });
};

const showMenu = useScreenSize.getWidth(768);
const showDrawer = ref(false);
watch(
  () => showMenu.value,
  (newValue) => {
    if (!newValue) {
      showDrawer.value = false;
    }
  },
);
// 路由变化（选中其他组件）时关闭移动端抽屉
watch(
  () => route.fullPath,
  () => {
    showDrawer.value = false;
  },
);
</script>

<template>
  <div>
    <header class="bg-card container" style="justify-content: space-between">
      <QThemeToggle :size="24" :title="'主题变换'" />
      <SearchBar class="search-bar" />
      <QIcon
        v-show="showMenu"
        icon="Menu"
        :size="24"
        @click="showDrawer = !showDrawer"
      />
    </header>
    <main class="container">
      <ComponentList
        :selected="selected"
        class="hidden-768"
        @select="onSelect"
      />
      <ComponentDetail :component="selected" />
    </main>
    <QDrawer v-model:visible="showDrawer" direction="left">
      <ComponentList
        :selected="selected"
        style="height: 100vh"
        @select="onSelect"
      />
    </QDrawer>
  </div>
</template>

<style>
.search-bar {
  flex: 1;
  max-width: 20rem;
  margin: 0 1rem;
}
</style>
