<script lang="ts" setup>
import type { DocsEntry } from '@/utils/useComponentInfo.ts';
import { QMarkdownRender, QTab } from 'qyani-components';
import { computed, defineAsyncComponent, ref, watch } from 'vue';
import type { Component } from 'vue';

const demoModules = import.meta.glob<{ default: Component }>(
  '../display/**/*.vue',
);
const props = defineProps<{
  component: DocsEntry | null;
}>();

const currentContent = ref('');
const currentTabIndex = ref(0);
const currentDemo = ref<Component | null>(null);
const tabs = computed(() =>
  props.component?.demoPath ? ['文档说明', '组件展示'] : ['文档说明'],
);

/**
 * Load the optional demo module referenced by a documentation manifest entry.
 * @param demoPath Display path without extension from the generated manifest.
 * @returns An async Vue component, or null when the entry has no demo.
 */
const loadDemo = (demoPath: string | undefined) => {
  if (!demoPath) return null;
  const loader = demoModules[`../display/${demoPath}.vue`];
  return loader ? defineAsyncComponent(loader) : null;
};

watch(
  () => props.component,
  async (entry) => {
    currentTabIndex.value = 0;
    currentContent.value = '';
    currentDemo.value = loadDemo(entry?.demoPath);
    if (entry) {
      currentContent.value = await (await fetch(entry.docPath)).text();
    }
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="!component" class="placeholder bg-card component-detail">
    请选择一个文档条目
  </div>

  <div
    v-else
    class="bg-card component-detail container-column scroll-container scroll-y"
  >
    <div class="container-column padding-rem container-flex-1">
      <h2
        class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray"
      >
        {{ component.displayName }}
      </h2>
      <p class="package-name">{{ component.packageName }}</p>
      <QTab
        v-if="tabs.length > 1"
        :list="tabs"
        @select="(index: number) => (currentTabIndex = index)"
      />
      <div
        v-show="currentTabIndex === 0"
        class="component-display padding-rem radius-half-rem shadow-black"
      >
        <QMarkdownRender :content="currentContent" />
      </div>
      <component
        :is="currentDemo"
        v-if="currentDemo"
        v-show="currentTabIndex === 1"
      />
    </div>
  </div>
</template>

<style scoped>
.component-detail {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 2.5rem);
}

.component-display {
  transition: all 0.5s ease;
}

.package-name {
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.875rem;
  text-align: center;
}

.placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.2em;
}
</style>
