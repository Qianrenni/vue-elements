<!-- App.vue -->
<!-- src/docs/App.vue -->
<script lang="ts" setup>
import ComponentDetail from '@/docs/ComponentDetail.vue';
import ComponentList from '@/docs/ComponentList.vue';
import type { DocsEntry } from '@/utils/useComponentInfo.ts';
import { QDrawer, QIcon, QThemeToggle, useScreenSize } from 'qyani-components';
import { useFollowSystemTheme } from 'qyani-components';
import { ref, watch } from 'vue';

useFollowSystemTheme();
const selected = ref<DocsEntry | null>(null);

/**
 * Select a documentation entry from the navigation tree.
 * @param entry Generated documentation metadata for the selected item.
 * @returns Nothing.
 */
const updateSelected = (entry: DocsEntry) => {
  selected.value = entry;
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
</script>

<template>
  <div>
    <header class="bg-card container" style="justify-content: space-between">
      <QThemeToggle :size="24" :title="'主题变换'" />
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
        @select="updateSelected"
      />
      <ComponentDetail :component="selected" />
    </main>
    <QDrawer v-model:visible="showDrawer" direction="left">
      <ComponentList
        :selected="selected"
        style="height: 100vh"
        @select="updateSelected"
      />
    </QDrawer>
  </div>
</template>

<style></style>
