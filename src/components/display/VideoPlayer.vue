<template>
  <div class="video-player">
    <!-- 视频元素 -->
    <video
        ref="videoRef"
        :autoplay="autoPlay"
        :controls="controls"
        :muted="muted"
        :src="source"
    ></video>
  </div>
</template>

<script lang="ts" setup>

defineOptions({
  name: 'VideoPlayer'
})

const props = withDefaults(defineProps<{
  source?: string,
  autoPlay?: boolean,
  controls?: boolean,
  muted?: boolean,
}>(), {
  source: '',
  autoPlay: true,
  controls: true,
  muted: false
})


</script>

<style scoped>
/* 与原样式完全一致，无改动 */
.video-player {
  width: 100%;
  background-color: transparent;
}

.video-player video {
  width: 100%;
}
</style>