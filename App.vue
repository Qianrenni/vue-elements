<template>
  <theme-toggle />
  <div class="container scroll-container scroll-y"
       style="height: 600px;background-color: #00b4d8"
  >
    <div
        class="container container-w100 bg-card"
        style="height: 800px;">

    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";

const showDrawer = ref({
  left: false,
  right: false,
  top: false,
  bottom: false,
  inner: false
});
</script>
<style lang="css" scoped>

</style>
