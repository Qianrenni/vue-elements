<template>
  <div class="container-center container-column margin-vetical">
    <div class="container-center">
      <Card style="width: 32px;" >
        <Avator></Avator>
      </Card>
    </div>
    <div class="container-center">
      <TabList :list="tabList"></TabList>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Avator from "../src/components/Avator.vue";
import SkillTag from "../src/components/SkillTag.vue";
import TabList from "../src/components/TabList.vue";
import Card from "../src/components/Card.vue";
const tabList=['1','2','3']
</script>
<style>

</style>