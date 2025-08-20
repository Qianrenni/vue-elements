<!-- App.vue -->
<!-- src/docs/App.vue -->
<script lang="ts" setup>
import {ref} from 'vue'
import {ComponentInfo} from "@/utils/useComponentScanner";
import ComponentList from "../docs/ComponentList.vue";
import ComponentDetail from "../docs/ComponentDetail.vue";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";

const selected = ref<ComponentInfo | null>(null)
</script>

<template>
  <div class="app-layout container-column">
    <div class="container container-flex-start padding-horizontal bg-image-header ">
      <theme-toggle size="32" style="color: white;"/>
    </div>
    <div class="app-layout container-center">
      <ComponentList :selected="selected" @select="selected = $event"/>
      <ComponentDetail :component="selected"/>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-layout {
  height: 100vh;
}
</style>
