<!-- App.vue -->
<!-- src/docs/App.vue -->
<script lang="ts" setup>
import { ref, watch } from 'vue';
import ComponentList from '@/docs/ComponentList.vue';
import ComponentDetail from '@/docs/ComponentDetail.vue';
import { QThemeToggle, useScreenSize } from 'qyani-components';
import type { ComponentInfo } from '@/utils/useComponentInfo.ts';
import { useFollowSystemTheme } from 'qyani-components';
useFollowSystemTheme();
const selected = ref<ComponentInfo | null>(null);
const updateSelected = (comp: ComponentInfo) => {
  selected.value = comp;
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
  <div class="app-layout">
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

<style>
.app-layout {
  width: 100vw;
  height: 100vh;
}
</style>
