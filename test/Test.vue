<template>
  <div class="container-center container-column margin-vetical">
    <div class="container-center">
      <Card style="background-color: transparent" animation>
        <Avator style="width: 100px;"></Avator>
      </Card>
    </div>
    <div class="container-center">
      <tag text="标签" circle="large"></tag>
      <tag text="标签" circle="middle"></tag>
      <tag text="标签" circle="small"></tag>
      <tag text="标签" circle="none"></tag>
    </div>

    <div class="container-center">
      <TabList :list="list"></TabList>
    </div>
    <divider></divider>
    <div class="container-center">
      <theme-toggle></theme-toggle>
    </div>
    <div class="container-center">
      <scoll-container :scroll-x="true" width="100px">
        <tab-list :list="list"></tab-list>
      </scoll-container>
    </div>
    <div class="container-center margin-vetical">
      <scoll-container :scroll-y="true" height="50px">
        <div class="container-column">
          <tab-list :list="list"></tab-list>
        </div>
      </scoll-container>
    </div>
    <div class="container-center">
      <card>
        <Carousel  :duration="500" :width="300" :height="300">
          <carousel-item v-for="n in 5" :key="n">
            <div style="width: 300px;height: 300px;" class="container-center container-align-center">
              {{n}}
            </div>
          </carousel-item>
        </Carousel>
      </card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Avator from "../src/components/Avator.vue";
import Tag from "../src/components/Tag.vue";
import TabList from "../src/components/TabList.vue";
import Card from "../src/components/Card.vue";
import Divider from "../src/components/Divider.vue";
import ThemeToggle from "../src/components/ThemeToggle.vue";
import ScollContainer from "../src/layout/ScollContainer.vue";
import Carousel from "../src/components/Carousel.vue";
import CarouselItem from "../src/components/CarouselItem.vue";
const list=['1','2','3']
</script>
<style>

</style>