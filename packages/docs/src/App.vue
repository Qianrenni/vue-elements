<!-- App.vue -->
<script lang="ts" setup>
import SearchBar from '@/components/SearchBar.vue';
import TopNav from '@/components/TopNav.vue';
import ComponentDetail from '@/docs/ComponentDetail.vue';
import ComponentList from '@/docs/ComponentList.vue';
import {
  type DocsSectionMeta,
  docsSections,
  entriesOfSection,
} from '@/utils/docsSections';
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

/** 当前顶层栏目：驱动顶栏高亮 + 侧边栏过滤 */
const activeSection = ref<string>('Vue Components');
const activeMeta = computed<DocsSectionMeta | undefined>(() =>
  docsSections.find((s) => s.key === activeSection.value),
);
const sectionEntries = computed<DocsEntry[]>(() =>
  entriesOfSection(activeSection.value),
);

// 选中条目若属于其它栏目，联动切换顶栏
watch(selected, (entry) => {
  if (entry) activeSection.value = entry.category[0];
});

const selectSection = (key: string) => {
  activeSection.value = key;
  if (selected.value && selected.value.category[0] !== key) {
    router.push('/');
  }
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
    <header class="docs-header bg-card container">
      <router-link class="docs-brand" :to="{ path: '/' }">
        qyani·components
      </router-link>
      <TopNav :active="activeSection" @select="selectSection" />
      <div class="docs-actions">
        <SearchBar class="search-bar" />
        <QThemeToggle :size="22" :title="'主题变换'" />
        <QIcon
          v-show="showMenu"
          icon="Menu"
          :size="24"
          @click="showDrawer = !showDrawer"
        />
      </div>
    </header>
    <main class="container docs-main">
      <ComponentList
        :selected="selected"
        :entries="sectionEntries"
        :title="activeMeta?.treeTitle"
        class="hidden-768"
        @select="onSelect"
      />
      <ComponentDetail :component="selected" />
    </main>
    <QDrawer v-model:visible="showDrawer" direction="left">
      <ComponentList
        :selected="selected"
        :entries="sectionEntries"
        :title="activeMeta?.treeTitle"
        style="height: 100vh"
        @select="onSelect"
      />
    </QDrawer>
  </div>
</template>

<style>
.docs-header {
  display: flex;
  align-items: center;
  gap: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: var(--q-z-index-sticky, 200);
  flex-wrap: nowrap;
}
.docs-brand {
  flex: none;
  font-weight: 700;
  font-size: 1rem;
  color: var(--q-color-text);
  text-decoration: none;
  white-space: nowrap;
}
.docs-main {
  display: flex;
  align-items: stretch;
}
.docs-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}
.search-bar {
  flex: 0 1 auto;
  width: 15rem;
  max-width: 20rem;
}
@media screen and (max-width: 768px) {
  .docs-header {
    flex-wrap: wrap;
  }
  .docs-actions {
    margin-left: auto;
  }
}
</style>
