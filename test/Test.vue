<!-- App.vue -->
<!-- src/docs/App.vue -->
<script lang="ts" setup>
import {ref} from 'vue'
import {ComponentInfo} from "../src/utils/useComponentScanner";
import ComponentList from "../src/docs/ComponentList.vue";
import ComponentDetail from "../src/docs/ComponentDetail.vue";

const selected = ref<ComponentInfo | null>(null)
</script>

<template>
  <div class="app-layout">
    <ComponentList :selected="selected" @select="selected = $event"/>
    <ComponentDetail :component="selected"/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-layout {
  display: flex;
  min-height: 100vh;
}
</style>
<!--<template>-->
<!--  <card class="shadow-black radius-half-rem" style="height: 100vh; width: 90%; max-width: 1200px; margin: 0 auto;">-->
<!--    <template #left>-->
<!--      <div-->
<!--          class="scroll-container scroll-y-->
<!--                container-column padding-rem"-->
<!--          style="-->
<!--          height: 100vh;-->
<!--          max-width: 300px;-->
<!--          border-right: 1px solid var(&#45;&#45;primary-color)"-->
<!--      >-->
<!--        &lt;!&ndash; 左侧标题 &ndash;&gt;-->
<!--        <h2 class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray">组件列表</h2>-->

<!--        &lt;!&ndash; 组件分类 &ndash;&gt;-->
<!--        <div v-for="(group, groupName) in groupedComponents" :key="groupName" class="margin-half-vetical">-->
<!--          <div class="text-12rem text-muted padding-half-rem radius-third-rem">{{ groupName }}</div>-->
<!--          <div class="container-column padding-half-rem">-->
<!--              <span-->
<!--                  v-for="item in group"-->
<!--                  :key="item"-->
<!--                  :class="{'component-active': item === selectedComponent}"-->
<!--                  class="component-item padding-24rem margin-fourth-vetical radius-third-rem"-->
<!--                  @click="selectComponent(item)">-->
<!--                {{ item }}-->
<!--              </span>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--    <template #default>-->
<!--      <div class="scroll-container scroll-y bg-card" style="height: 100vh; max-width: 1000px;">-->
<!--        <div class="container-column padding-rem">-->
<!--          &lt;!&ndash; 右侧标题 &ndash;&gt;-->
<!--          <h2 class="text-primary text-center padding-half-rem margin-half-vetical border-horizontal-gray">-->
<!--            {{ selectedComponent }} 组件-->
<!--          </h2>-->

<!--          &lt;!&ndash; 组件展示区 &ndash;&gt;-->
<!--          <div class="component-display padding-rem radius-half-rem shadow-black">-->
<!--            <component :is="currentComponent"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </card>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {defineAsyncComponent, markRaw, ref, shallowRef, computed} from "vue";-->
<!--import Card from '../src/components/layout/Card.vue'-->


<!--// 组件分组-->
<!--const groupedComponents = computed(() => {-->
<!--  return {-->
<!--    '布局组件': ['Card', 'Divider', 'MobileFrame', 'NavSection', 'Tab'],-->
<!--    '数据展示': ['Avatar', 'Badge', 'Carousel', 'MarkdownRender', 'Pagination', 'ProgressBar', 'Tag', 'TypeText'],-->
<!--    '交互组件': ['CollapsibleSection', 'DragUtil', 'Form', 'Icon', 'IconGroups', 'ScrollNotice', 'Search', 'ThemeToggle'],-->
<!--    '工具组件': ['RainFigure', 'TimeUtil', 'UseMousePosition']-->
<!--  }-->
<!--})-->

<!--// 当前选中的组件-->
<!--const selectedComponent = ref(null);-->
<!--const currentComponent = shallowRef(null);-->

<!--// 选择组件的方法-->
<!--const selectComponent = async (item) => {-->
<!--  console.log('switch to', item)-->
<!--  selectedComponent.value = item-->
<!--  currentComponent.value = markRaw(defineAsyncComponent(() => import(`./display/Display${item}.vue`)))-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--/* 组件项样式 */-->
<!--.component-item {-->
<!--  transition: all 0.3s ease;-->
<!--  cursor: pointer;-->
<!--  border-left: 3px solid transparent;-->
<!--}-->

<!--.component-item:hover {-->
<!--  background-color: var(&#45;&#45;gray-200);-->
<!--  transform: translateX(5px);-->
<!--  border-left: 3px solid var(&#45;&#45;primary-light);-->
<!--}-->

<!--.component-active {-->
<!--  background-color: var(&#45;&#45;primary-color);-->
<!--  color: white;-->
<!--  border-left: 3px solid var(&#45;&#45;primary-light);-->
<!--  font-weight: bold;-->
<!--}-->

<!--/* 组件展示区样式 */-->
<!--.component-display {-->
<!--  transition: all 0.5s ease;-->
<!--  min-height: 400px;-->
<!--}-->

<!--/* 添加进入和离开动画 */-->
<!--.fade-enter-active,-->
<!--.fade-leave-active {-->
<!--  transition: opacity 0.5s ease;-->
<!--}-->

<!--.fade-enter-from,-->
<!--.fade-leave-to {-->
<!--  opacity: 0;-->
<!--}-->
<!--</style>-->
