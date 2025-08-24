<template>
  <div class="container-column container-align-center">
    <FormSwitch v-model="showDrawer.right" label="右侧抽屉"/>
    <FormSwitch v-model="showDrawer.left" label="左侧抽屉"/>
    <FormSwitch v-model="showDrawer.top" label="顶部抽屉"/>
    <FormSwitch v-model="showDrawer.bottom" label="底部抽屉"/>
    <FormSwitch v-model="showDrawer.inner" label="内嵌抽屉"/>
  </div>
  <div class="container-column" style="position: relative;width: 100%;height: 300px;">
    <Drawer
        v-model:visible="showDrawer.inner"
        :append-to-body="false"
        direction="right"
        title="测试抽屉">
      <div class="padding-24rem">
        <p>这是抽屉的内容</p>
        <p>这是抽屉的内容</p>
        <p>这是抽屉的内容</p>
      </div>
    </Drawer>
  </div>
  <Drawer
      v-model:visible="showDrawer.right"
      direction="right"
      title="测试抽屉">
    <div class="padding-24rem">
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
    </div>
  </Drawer>
  <Drawer
      v-model:visible="showDrawer.left"
      direction="left"
      title="测试抽屉">
    <div class="padding-24rem">
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
    </div>
  </Drawer>
  <Drawer
      v-model:visible="showDrawer.top"
      direction="top"
      title="测试抽屉">
    <div class="padding-24rem">
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
    </div>
  </Drawer>
  <Drawer
      v-model:visible="showDrawer.bottom"
      direction="bottom"
      title="测试抽屉">
    <div class="padding-24rem">
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
      <p>这是抽屉的内容</p>
    </div>
  </Drawer>
</template>
<script lang="ts" setup>
import Drawer from "@/components/layout/Drawer.vue";
import {ref} from "vue";
import FormSwitch from "@/components/form/FormSwitch.vue";

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