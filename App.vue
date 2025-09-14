<template>
  <div class="container-column">
    <theme-toggle></theme-toggle>
    <div style="height: 100px;width: 100px;">
      <Loading></Loading>
    </div>
    <div style="height: 100px;width: 100px;">
      <Loading type="spinner"></Loading>
    </div>
    <div style="height: 100px;width: 100px;">
      <Loading type="skeleton"></Loading>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Loading from "@/components/loading/Loading.vue";
import ThemeToggle from "@/components/theme/ThemeToggle.vue";

const markDownContent = `
  # 测试
  ## 测试
  ### 测试
  #### 测试
  ##### 测试
  ###### 测试
  `
</script>
<style lang="css" scoped>

</style>