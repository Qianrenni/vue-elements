<template>
  <card style="height: 100vh;">
    <template #left>
      <scoll-container scroll-y style="height: 100vh;min-width: 200px;">
        <div class="container-column padding-rem border-gray">
        <span
            v-for="(item, index) in components"
            :key="index"
            @click="selectComponent(item)"
            class="margin-half-vetical button">
            {{item.name}}
        </span>
        </div>
      </scoll-container>
    </template>
    <template #default>
      <scoll-container style="height: 100vh;width: calc( 100vw - 200px)" scroll-x scroll-y >
        <div class="container-column " style="height: 100%;">
          <!-- 正确的方式：只传递组件定义，props单独绑定 -->
          <component :is="currentComponent"/>
        </div>
      </scoll-container>
    </template>
  </card>
</template>

<script lang="ts" setup>
import {defineAsyncComponent, markRaw, reactive, ref, shallowRef} from "vue";
import Card from '../src/components/Card.vue'
import ScollContainer from "../src/layout/ScollContainer.vue";
// 使用 markRaw 避免组件被 Vue 的响应式系统转换
const components = [
  {
    name:'Avator',
  },
  {
    name:'Badge',
  },
  {
    name:'Card',
  },
  {
    name:'Carousel',
  },
  {
    name:'CollapsibleSection',
  },
  {
    name:'Divider',
  },
  {
    name:'Icon',
  },
  {
    name:'IconGroups',
  },
  {
    name:'MarkdownRender',
  },
  {
    name:'MobileFrame',
  },
  // {
  //   name:'NavSection',
  // },
  // {
  //   name:'ProcessBar',

  // },
  // {
  //   name:'RainFigure',

  // },
  // {
  //   name:'Search',

  // },
  {
    name:'TabList',

  },
  // {
  //   name:'Tag',

  // },
  // {
  //   name:'ThemeToggle',

  // },,
  // {
  //   name:'TypeText',
  // },
]

// 当前选中的组件
const currentComponent = shallowRef(markRaw(defineAsyncComponent(() => import(`./display/Display${components[0].name}.vue`))))

// 选择组件的方法
const selectComponent = async (item) => {
  console.log('switch ')
  currentComponent.value = markRaw(defineAsyncComponent(() => import(`./display/Display${item.name}.vue`)))
}
</script>

<style>
</style>
