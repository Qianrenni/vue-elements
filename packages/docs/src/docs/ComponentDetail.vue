<!-- src/docs/ComponentDetail.vue -->
<script lang="ts" setup>
import type { ComponentInfo } from '@/utils/useComponentInfo.ts';
import { QMarkdownRender, QTab } from 'qyani-components';
import { defineAsyncComponent, ref, watch } from 'vue';

const componentMap: Record<string, ReturnType<typeof defineAsyncComponent>> = {
  Icon: defineAsyncComponent(
    () => import('../display/components/basic/Icon.vue'),
  ),
  Message: defineAsyncComponent(
    () => import('../display/components/basic/Message.vue'),
  ),
  Pagination: defineAsyncComponent(
    () => import('../display/components/basic/Pagination.vue'),
  ),
  Tag: defineAsyncComponent(
    () => import('../display/components/basic/Tag.vue'),
  ),
  Avatar: defineAsyncComponent(
    () => import('../display/components/display/Avatar.vue'),
  ),
  Badge: defineAsyncComponent(
    () => import('../display/components/display/Badge.vue'),
  ),
  Carousel: defineAsyncComponent(
    () => import('../display/components/display/Carousel.vue'),
  ),
  CarouselItem: defineAsyncComponent(
    () => import('../display/components/display/CarouselItem.vue'),
  ),
  Divider: defineAsyncComponent(
    () => import('../display/components/display/Divider.vue'),
  ),
  LazyImage: defineAsyncComponent(
    () => import('../display/components/display/LazyImage.vue'),
  ),
  MarkdownRender: defineAsyncComponent(
    () => import('../display/components/display/MarkdownRender.vue'),
  ),
  ProgressBar: defineAsyncComponent(
    () => import('../display/components/display/ProgressBar.vue'),
  ),
  ScrollNotice: defineAsyncComponent(
    () => import('../display/components/display/ScrollNotice.vue'),
  ),
  FormButton: defineAsyncComponent(
    () => import('../display/components/form/FormButton.vue'),
  ),
  FormCheckboxGroup: defineAsyncComponent(
    () => import('../display/components/form/FormCheckboxGroup.vue'),
  ),
  FormColorPicker: defineAsyncComponent(
    () => import('../display/components/form/FormColorPicker.vue'),
  ),
  FormDatePicker: defineAsyncComponent(
    () => import('../display/components/form/FormDatePicker.vue'),
  ),
  FormFileUpload: defineAsyncComponent(
    () => import('../display/components/form/FormFileUpload.vue'),
  ),
  FormRadioGroup: defineAsyncComponent(
    () => import('../display/components/form/FormRadioGroup.vue'),
  ),
  FormRangeSlider: defineAsyncComponent(
    () => import('../display/components/form/FormRangeSlider.vue'),
  ),
  FormSelect: defineAsyncComponent(
    () => import('../display/components/form/FormSelect.vue'),
  ),
  FormSwitch: defineAsyncComponent(
    () => import('../display/components/form/FormSwitch.vue'),
  ),
  FormTable: defineAsyncComponent(
    () => import('../display/components/form/FormTable.vue'),
  ),
  FormText: defineAsyncComponent(
    () => import('../display/components/form/FormText.vue'),
  ),
  FormTextarea: defineAsyncComponent(
    () => import('../display/components/form/FormTextarea.vue'),
  ),
  Search: defineAsyncComponent(
    () => import('../display/components/form/Search.vue'),
  ),
  Card: defineAsyncComponent(
    () => import('../display/components/layout/Card.vue'),
  ),
  Collapse: defineAsyncComponent(
    () => import('../display/components/layout/Collapse.vue'),
  ),
  CollapseItem: defineAsyncComponent(
    () => import('../display/components/layout/CollapseItem.vue'),
  ),
  CollapsibleSection: defineAsyncComponent(
    () => import('../display/components/layout/CollapsibleSection.vue'),
  ),
  Dialog: defineAsyncComponent(
    () => import('../display/components/layout/Dialog.vue'),
  ),
  Drawer: defineAsyncComponent(
    () => import('../display/components/layout/Drawer.vue'),
  ),
  PopContainer: defineAsyncComponent(
    () => import('../display/components/layout/PopContainer.vue'),
  ),
  ScrollContainer: defineAsyncComponent(
    () => import('../display/components/layout/ScrollContainer.vue'),
  ),
  SwiperAction: defineAsyncComponent(
    () => import('../display/components/layout/SwiperAction.vue'),
  ),
  Tree: defineAsyncComponent(
    () => import('../display/components/layout/Tree.vue'),
  ),
  TreeNode: defineAsyncComponent(
    () => import('../display/components/layout/TreeNode.vue'),
  ),
  Loading: defineAsyncComponent(
    () => import('../display/components/loading/Loading.vue'),
  ),
  Breathing: defineAsyncComponent(
    () => import('../display/components/loading/animations/Breathing.vue'),
  ),
  Skeleton: defineAsyncComponent(
    () => import('../display/components/loading/animations/Skeleton.vue'),
  ),
  Spinner: defineAsyncComponent(
    () => import('../display/components/loading/animations/Spinner.vue'),
  ),
  NavSection: defineAsyncComponent(
    () => import('../display/components/navigation/NavSection.vue'),
  ),
  Tab: defineAsyncComponent(
    () => import('../display/components/navigation/Tab.vue'),
  ),
  ThemeToggle: defineAsyncComponent(
    () => import('../display/components/theme/ThemeToggle.vue'),
  ),
  useDrag: defineAsyncComponent(() => import('../display/events/useDrag.vue')),
  useFormEvents: defineAsyncComponent(
    () => import('../display/events/useFormEvents.vue'),
  ),
  useMousePosition: defineAsyncComponent(
    () => import('../display/events/useMousePosition.vue'),
  ),
  useAVLTree: defineAsyncComponent(
    () => import('../display/utils/algorithm/useAVLTree.vue'),
  ),
  useArray: defineAsyncComponent(
    () => import('../display/utils/algorithm/useArray.vue'),
  ),
  useGraph: defineAsyncComponent(
    () => import('../display/utils/algorithm/useGraph.vue'),
  ),
  useHeap: defineAsyncComponent(
    () => import('../display/utils/algorithm/useHeap.vue'),
  ),
  useRedBlackTree: defineAsyncComponent(
    () => import('../display/utils/algorithm/useRedBlackTree.vue'),
  ),
  useSegmentTree: defineAsyncComponent(
    () => import('../display/utils/algorithm/useSegmentTree.vue'),
  ),
  useSkipList: defineAsyncComponent(
    () => import('../display/utils/algorithm/useSkipList.vue'),
  ),
  useSort: defineAsyncComponent(
    () => import('../display/utils/algorithm/useSort.vue'),
  ),
  useClip: defineAsyncComponent(
    () => import('../display/utils/business/useClip.vue'),
  ),
  useDebounce: defineAsyncComponent(
    () => import('../display/utils/business/useDebounce.vue'),
  ),
  useFollowSystemTheme: defineAsyncComponent(
    () => import('../display/utils/business/useFollowSystemTheme.vue'),
  ),
  useLRUCache: defineAsyncComponent(
    () => import('../display/utils/business/useLRUCache.vue'),
  ),
  useLocalStorage: defineAsyncComponent(
    () => import('../display/utils/business/useLocalStorage.vue'),
  ),
  useMemoryCache: defineAsyncComponent(
    () => import('../display/utils/business/useMemoryCache.vue'),
  ),
  useMessage: defineAsyncComponent(
    () => import('../display/utils/business/useMessage.vue'),
  ),
  useNullHandel: defineAsyncComponent(
    () => import('../display/utils/business/useNullHandel.vue'),
  ),
  useObject: defineAsyncComponent(
    () => import('../display/utils/business/useObject.vue'),
  ),
  useScreenSize: defineAsyncComponent(
    () => import('../display/utils/business/useScreenSize.vue'),
  ),
  useShowLoading: defineAsyncComponent(
    () => import('../display/utils/business/useShowLoading.vue'),
  ),
  useThrottle: defineAsyncComponent(
    () => import('../display/utils/business/useThrottle.vue'),
  ),
  useTimeDisplay: defineAsyncComponent(
    () => import('../display/utils/business/useTimeDisplay.vue'),
  ),
  useTimeUtils: defineAsyncComponent(
    () => import('../display/utils/business/useTimeUtils.vue'),
  ),
  useWindowResize: defineAsyncComponent(
    () => import('../display/utils/business/useWindowResize.vue'),
  ),
};

defineOptions({
  name: 'ComponentDetail',
});
const props = defineProps<{
  component: ComponentInfo | null;
}>();
const currentTabIndex = ref<number>(0);
const currentCotent = ref('');
watch(
  () => props.component,
  async (newComponent: ComponentInfo | null) => {
    if (newComponent) {
      currentCotent.value = await (await fetch(newComponent.docPath)).text();
    }
  },
);
</script>

<template>
  <div v-if="!component" class="placeholder bg-card component-detail">
    请选择一个组件
  </div>

  <div
    v-else
    class="bg-card component-detail container-column scroll-container scroll-y"
  >
    <div class="container-column padding-rem container-flex-1">
      <!-- 右侧标题 -->
      <h2
        class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray"
      >
        {{ component.displayName }} 组件
      </h2>
      <QTab
        :list="['文档说明', '组件展示']"
        @select="(index: number) => (currentTabIndex = index)"
      />
      <!-- 组件展示区 -->
      <div
        v-show="currentTabIndex === 0"
        class="component-display padding-rem radius-half-rem shadow-black"
      >
        <!-- Markdown 文档 -->
        <QMarkdownRender :content="currentCotent" />
      </div>
      <component
        :is="componentMap[props.component?.name as keyof typeof componentMap]"
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

.placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.2em;
}

/* 添加进入和离开动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
