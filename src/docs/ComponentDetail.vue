<!-- src/docs/ComponentDetail.vue -->
<script lang="ts" setup>
import {defineAsyncComponent, defineOptions, markRaw, ref, watch} from 'vue'
import MarkdownRender from '@/components/display/MarkdownRender.vue'
import {ComponentInfo} from "@/utils/useComponentScanner";
import Tab from "@/components/navigation/Tab.vue";

defineOptions({
  name: 'ComponentDetail'
})
const props = defineProps<{
  component: ComponentInfo | null
}>()

const currentComponent = ref(null);
watch(
    () => props.component,
    (newComponent) => {
      console.log(newComponent);
      try {
        currentComponent.value = markRaw(defineAsyncComponent(() => import(newComponent?.displayPath!)));
      } catch (error) {
        currentComponent.value = null;
        console.log(error);
      }
    }
)
const currentTabIndex = ref<number>(0);
</script>

<template>
  <div v-if="!component" class="placeholder bg-card component-detail">
    请选择一个组件
  </div>

  <div v-else class=" bg-card component-detail container-column scroll-container scroll-y">
    <div class="container-column padding-rem container-flex-1">
      <!-- 右侧标题 -->
      <h2 class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray">
        {{ component.displayName }} 组件
      </h2>
      <Tab :list="['文档说明', '组件展示']" @select="(index)=>currentTabIndex=index"/>
      <!-- 组件展示区 -->
      <div v-show="currentTabIndex===0" class="component-display padding-rem radius-half-rem shadow-black">
        <!-- Markdown 文档 -->
        <MarkdownRender :content="component.docContent"/>
      </div>
      <component :is="currentComponent" v-show="currentTabIndex===1"/>
    </div>
  </div>
</template>

<style scoped>
.component-detail {
  flex: 1;
  overflow-y: auto;
  max-width: 1200px;
  height: calc(100vh - 32px);
}

.component-display {
  transition: all 0.5s ease;
}


.placeholder {
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
