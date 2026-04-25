<script lang="ts" setup>
defineOptions({
  name: 'PopContainer',
});
const props = withDefaults(
  defineProps<{
    visible?: boolean;
    hoverShow?: boolean;
    position?:
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
      | 'left-center'
      | 'right-center';
  }>(),
  {
    hoverShow: false,
    position: 'bottom-center',
    visible: false,
  },
);
</script>

<template>
  <div class="pop-container">
    <slot />
    <div
      :class="[
        {
          'hover-show': hoverShow,
          [position]: true,
          visible: visible,
        },
      ]"
      class="pop-content"
    >
      <slot name="pop" />
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
  pointer-events: none;
  z-index: var(--z-index-level-3);
}

.pop-container:hover .pop-content.hover-show {
  opacity: 1;
}

.pop-content.visible {
  opacity: 1;
}
.pop-content.top-left {
  top: 0;
  left: 0;
  transform: translateY(-100%) translateX(-50%);
}

.pop-content.top-center {
  top: 0;
  left: 50%;
  transform: translateY(-100%) translateX(-50%);
}

.pop-content.top-right {
  top: 0;
  right: 0;
  transform: translateY(-100%) translateX(50%);
}

.pop-content.bottom-left {
  bottom: 0;
  left: 0;
  transform: translateY(100%) translateX(-50%);
}

.pop-content.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateY(100%) translateX(-50%);
}

.pop-content.bottom-right {
  bottom: 0;
  right: 0;
  transform: translateY(100%) translateX(50%);
}

.pop-content.left-center {
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-100%);
}

.pop-content.right-center {
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(100%);
}
</style>
