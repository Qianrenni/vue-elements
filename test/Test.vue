<template>
  <card style="height: 100vh;width:1200px;margin: 0 auto;">
    <template #left>
      <div class="scroll-container scroll-y" style="height: 100vh;max-width: 300px;">
        <div class="container-column padding-rem bo">
        <span
            v-for="(item, index) in components"
            :key="index"
            class="margin-half-vetical text-hover-gray"
            @click="selectComponent(item)">
            {{ item }}
        </span>
        </div>
      </div>
    </template>
    <template #default>
      <div class="scroll-container scroll-y" style="height: 100vh;max-width: 1000px;">
        <div class="container-column ">
          <!-- 正确的方式：只传递组件定义，props单独绑定 -->
          <component :is="currentComponent"/>
        </div>
      </div>
    </template>
  </card>
</template>

<script lang="ts" setup>
import {defineAsyncComponent, markRaw, shallowRef} from "vue";
import Card from '../src/components/layout/Card.vue'
// 使用 markRaw 避免组件被 Vue 的响应式系统转换
const components = [
  'Avatar',
  'Badge',
  'Card',
  'Carousel',
  'CollapsibleSection',
  'Divider',
  'DragUtil',
  'Form',
  'Icon',
  'IconGroups',
  'MarkdownRender',
  'MobileFrame',
  'NavSection',
  'ProgressBar',
  'RainFigure',
  'ScrollNotice',
  'Search',
  'Tab',
  'Tag',
  'ThemeToggle',
  'TimeUtil',
  'TypeText',
  'UseMousePosition'

]

// 当前选中的组件
const currentComponent = shallowRef(markRaw(defineAsyncComponent(() => import(`./display/Display${components[0]}.vue`))))

// 选择组件的方法
const selectComponent = async (item) => {
  console.log('switch ')
  currentComponent.value = markRaw(defineAsyncComponent(() => import(`./display/Display${item}.vue`)))
}
</script>

<style>
</style>
