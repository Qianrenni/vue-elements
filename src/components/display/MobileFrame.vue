<template>
  <!-- 手机外形的div -->
  <div class="phone-frame">
    <!-- 加载你的uni-app应用 -->
    <iframe :src="props.src"></iframe>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

defineOptions({
  name: 'MobileFrame'
})
const props = defineProps<{
  src: string
}>()
</script>

<style scoped>
.phone-frame {
  width: 375px; /* 根据需要调整宽度 */
  height: 667px; /* 根据需要调整高度 */
  border: 12px solid #242424;
  border-radius: 15px;
  margin: 10px auto;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
}

/* iframe样式 */
.phone-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
}

@media screen and (max-width: 768px) {
  .phone-frame {
    border: none;
    border-radius: unset;
    width: 100%;
    height: var(--content-height-without-header);
    margin: 0;
    box-shadow: none;
  }

}
</style>
