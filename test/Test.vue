<template>
  <card style="height: 100vh;">
    <template #left>
      <div class="container-column margin-rem">
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
      <div class="container-column" style="height: 100%;">
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
  }
]

// 当前选中的组件
let currentComponent =shallowRef(components[0].component())

// 选择组件的方法
const selectComponent = (item) => {
  currentComponent=item.component;
}
</script>

<style>
</style>
