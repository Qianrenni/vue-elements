<script lang="ts" setup>
import type { DocsEntry } from '@/utils/useComponentInfo.ts';
import { QMarkdownRender, QTab } from 'qyani-components';
import { computed, defineAsyncComponent, ref, shallowRef, watch } from 'vue';
import type { Component } from 'vue';

const demoModules = import.meta.glob<{ default: Component }>(
  '../display/**/*.vue',
);
const props = defineProps<{
  component: DocsEntry | null;
}>();

const currentContent = ref('');
const currentTabIndex = ref(0);
const currentDemo = shallowRef<Component | null>(null);
let activeRequestId = 0;
const tabs = computed(() =>
  props.component?.demoPath ? ['文档说明', '组件展示'] : ['文档说明'],
);

/**
 * 将生成的绝对文档路径（如 /docs/components/basic/Icon.md）拼上 Vite base。
 * 生产部署于 GitHub Pages 子路径 /vue-elements/ 下，直接 fetch 绝对路径会打到站根导致 404。
 * import.meta.env.BASE_URL 在开发环境为 '/'、生产构建为 '/vue-elements/'。
 */
const resolveDocUrl = (docPath: string) =>
  `${import.meta.env.BASE_URL}${docPath.replace(/^\//, '')}`;

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
    const requestId = ++activeRequestId;
    currentTabIndex.value = 0;
    currentContent.value = '';
    currentDemo.value = loadDemo(entry?.demoPath);
    if (!entry) return;

    const response = await fetch(resolveDocUrl(entry.docPath));
    if (!response.ok) {
      if (requestId === activeRequestId) {
        currentContent.value = `> ⚠️ 文档加载失败（${response.status} ${response.statusText}）`;
      }
      return;
    }
    const content = await response.text();
    if (requestId === activeRequestId) {
      currentContent.value = content;
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
        <QMarkdownRender
          v-if="currentContent"
          :key="component.docPath"
          :content="currentContent"
          show-toc
        />
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
