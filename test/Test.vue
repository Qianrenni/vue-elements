<template>
  <card style="height: 100vh;">
    <template #left>
      <div class="container-column padding-rem border-gray">
        <span
            v-for="(item, index) in components"
            :key="index"
            @click="selectComponent(item)"
            class="margin-half-vetical button">
            {{item.name}}
        </span>
      </div>
    </template>
    <template #default>
      <div class="container-column padding-rem" style="height: 100%;">
        <!-- 正确的方式：只传递组件定义，props单独绑定 -->
        <component :is="currentComponent"/>
      </div>
    </template>
  </card>
</template>

<script lang="ts" setup>
import {defineAsyncComponent, markRaw, reactive, ref, shallowRef} from "vue";
import Card from '../src/components/Card.vue'
// 使用 markRaw 避免组件被 Vue 的响应式系统转换
const components = [
  {
    name:'Avator',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayAvator.vue')))
  },
  {
    name:'Badge',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayBadge.vue')))
  },
  {
    name:'Card',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayCard.vue')))
  },
  {
    name:'Carousel',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayCarousel.vue')))
  },
  // {
  //   name:'CollapsibleSection',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayCollapsibleSection.vue')))
  // },
  // {
  //   name:'Divider',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayDivider.vue')))
  // },
  {
    name:'Icon',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayIcon.vue')))
  },
  {
    name:'IconGroups',
    component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayIconGroups.vue')))
  },
  // {
  //   name:'MarkdownRender',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayMarkdownRender.vue')))
  // },
  // {
  //   name:'MobileFrame',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayMobileFrame.vue')))
  // },
  // {
  //   name:'NavSection',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayNavSection.vue')))
  // },
  // {
  //   name:'ProcessBar',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayProcessBar.vue')))
  // },
  // {
  //   name:'RainFigure',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayRainFigure.vue')))
  // },
  // {
  //   name:'Search',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplaySearch.vue')))
  // },
  // {
  //   name:'TabList',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayTabList.vue')))
  // },
  // {
  //   name:'Tag',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayTag.vue')))
  // },
  // {
  //   name:'ThemeToggle',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayThemeToggle.vue')))
  // },,
  // {
  //   name:'TypeText',
  //   component:() => markRaw(defineAsyncComponent(() => import('./display/DisplayTypeText.vue')))
  // },
]

// 当前选中的组件
const currentComponent = shallowRef(components[0].component())

// 选择组件的方法
const selectComponent = async (item) => {
  console.log('switch ')
  currentComponent.value = item.component()
}
</script>

<style>
</style>
