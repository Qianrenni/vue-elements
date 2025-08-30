<template>
  <theme-toggle/>
  <div class="container">
    <div
        class="container-center container-w100">
      <ScrollContainer
          :threshold="200"
          class="container-w100  container container-flex-start container-wrap"
          scoll-y
          style="height: 600px;width: 1008px;"
          @ended="add">
        <LazyImage
            v-for="item in photos"
            :height="100"
            :src="item"
            :width="100"
        />
      </ScrollContainer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ThemeToggle from "@/components/theme/ThemeToggle.vue";
import ScrollContainer from "@/components/layout/ScrollContainer.vue";
import {useThrottle} from "@";
import {ref} from "vue";
import LazyImage from "@/components/display/LazyImage.vue";
import {useFollowSystemTheme} from "@/utils/useFollowSystemTheme";

useFollowSystemTheme();
const photos = ref(Array.from({length: 100}, (_, i) => `https://picsum.photos/200/200?random=${i}`))
const add = useThrottle(() => {
  photos.value.push(...Array.from({length: 10}, (_, i) => `https://picsum.photos/200/200?random=${i}`))
}, 100);
</script>
<style lang="css" scoped>

</style>
