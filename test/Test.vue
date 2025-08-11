<!-- App.vue -->
<!-- src/docs/App.vue -->
<script lang="ts" setup>
import {ref} from 'vue'
import {ComponentInfo} from "@/utils/useComponentScanner";
import ComponentList from "../src/docs/ComponentList.vue";
import ComponentDetail from "../src/docs/ComponentDetail.vue";

const selected = ref<ComponentInfo | null>(null)
</script>

<template>
  <div class="app-layout container-center">
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

.app-layout {
  min-height: 100vh;
}
</style>
