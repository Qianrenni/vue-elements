<script lang="ts" setup>
defineOptions({
  name: 'PopContainer'
});
const props = withDefaults(defineProps<{
  visible?: boolean;
  hoverShow?: boolean;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'left-center' | 'right-center';
}>(), {
  hoverShow: true,
  position: 'bottom-center',
  visible: false
})
</script>

<template>
  <div class="pop-container">
    <slot name="default"/>
    <div :class="[
               {
                'hover-show':hoverShow,
                [position]:true,
                'visible':visible,
               }
         ]"
         class="pop-content"

    >
      <slot name="pop"/>
    </div>
  </div>
</template>

<style scoped>
.pop-container {
  position: relative;
}

.pop-content {
  position: absolute;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.pop-container:hover .pop-content.hover-show {
  opacity: 1;
}

.pop-container:hover .pop-content.visible {
  opacity: 1;
}

.pop-content.top-left {
  top: 0;
  left: 0;
  transform: translateY(-100%) translateX(-50%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 75% 90%, 50% 100%, 25% 90%, 0 90%);
}

.pop-content.top-center {
  top: 0;
  left: 50%;
  transform: translateY(-100%) translateX(-50%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 75% 90%, 50% 100%, 25% 90%, 0 90%);
}

.pop-content.top-right {
  top: 0;
  right: 0;
  transform: translateY(-100%) translateX(50%);
  clip-path: polygon(0 0, 100% 0, 100% 90%, 75% 90%, 50% 100%, 25% 90%, 0 90%);
}

.pop-content.bottom-left {
  bottom: 0;
  left: 0;
  transform: translateY(100%) translateX(-50%);
  clip-path: polygon(0 10%, 25% 10%, 50% 0, 75% 10%, 100% 10%, 100% 100%, 0 100%);
}

.pop-content.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateY(100%) translateX(-50%);
  clip-path: polygon(0 10%, 25% 10%, 50% 0, 75% 10%, 100% 10%, 100% 100%, 0 100%);
}

.pop-content.bottom-right {
  bottom: 0;
  right: 0;
  transform: translateY(100%) translateX(50%);
  clip-path: polygon(0 10%, 25% 10%, 50% 0, 75% 10%, 100% 10%, 100% 100%, 0 100%);
}

.pop-content.left-center {
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-100%);
  clip-path: polygon(0 0, 90% 0, 90% 25%, 100% 50%, 90% 75%, 90% 100%, 0 100%);
}

.pop-content.right-center {
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(100%);
  clip-path: polygon(10% 0, 10% 25%, 0 50%, 10% 75%, 10% 100%, 100% 100%, 100% 0);
}
</style>