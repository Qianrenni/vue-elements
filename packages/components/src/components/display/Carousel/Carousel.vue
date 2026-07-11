<!--
 * @component QCarousel
 * @description 轮播组件，支持自动播放、切换按钮、指示器等功能
 -->
<template>
  <div
    ref="carousel"
    :style="{
      width: `${props.width}px`,
      height: `${props.height}px`,
    }"
    class="carousel"
  >
    <QIcon
      v-if="props.showButton"
      :class="{
        'left-center': props.indicatorPosition === 'center-bottom',
        'center-top':
          props.indicatorPosition !== 'center-top' &&
          props.indicatorPosition !== 'center-bottom',
      }"
      :icon="props.indicatorPosition === 'center-bottom' ? 'Left' : 'Up'"
      class="opacity-2-9 carousel-indicators"
      @click="prev"
    />
    <QIcon
      v-if="props.showButton"
      :class="{
        'right-center': props.indicatorPosition === 'center-bottom',
        'center-bottom':
          props.indicatorPosition !== 'center-top' &&
          props.indicatorPosition !== 'center-bottom',
      }"
      :icon="props.indicatorPosition === 'center-bottom' ? 'Right' : 'Down'"
      class="opacity-2-9 carousel-indicators"
      @click="next"
    />
    <div
      ref="containerInner"
      :class="{
        'container-wrap': props.vertical,
      }"
      :style="{
        transform: transformStyle,
        transition: transition,
        width: `${props.width * (props.vertical ? 1 : totalItemsCount)}px`,
        height: `${props.height * (props.vertical ? totalItemsCount : 1)}px`,
      }"
      class="carousel-inner container-flex-start"
    >
      <!-- 复制最后一项到最前 -->
      <div v-if="itemsCount > 0">
        <component :is="items[items.length - 1]" />
      </div>

      <!-- 正常显示所有 item -->
      <div v-for="(item, index) in items" :key="index">
        <component :is="item" />
      </div>
      <!-- 复制第一项到最后 -->
      <div v-if="itemsCount > 0">
        <component :is="items[0]" />
      </div>
    </div>

    <!-- 指示器 -->
    <div
      v-if="props.indicator"
      :class="{
        'center-bottom': props.indicatorPosition === 'center-bottom',
        'center-top': props.indicatorPosition === 'center-top',
        'left-bottom': props.indicatorPosition === 'left-bottom',
        'left-top': props.indicatorPosition === 'left-top',
        'left-center': props.indicatorPosition === 'left-center',
        'right-bottom': props.indicatorPosition === 'right-bottom',
        'right-top': props.indicatorPosition === 'right-top',
        'right-center': props.indicatorPosition === 'right-center',
      }"
      class="carousel-indicators bg-transparent"
    >
      <span
        v-for="(_, i) in itemsCount"
        :key="i"
        :class="{ active: i === realIndex }"
        class="indicator"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCarousel } from './composable';
import type { CarouselEmits, CarouselProps } from './type';
import { QIcon } from '@/components/basic/Icon';

defineOptions({ name: 'QCarousel' });

const props = withDefaults(defineProps<CarouselProps>(), {
  vertical: false,
  autoplay: true,
  duration: 500,
  indicator: true,
  indicatorPosition: 'center-bottom',
  interval: 1500,
  direction: 'next',
  showButton: true,
  loop: true,
  touchMove: false,
});

const emit = defineEmits<CarouselEmits>();

const {
  prev,
  next,
  goTo,
  items,
  itemsCount,
  totalItemsCount,
  realIndex,
  carousel,
  containerInner,
  transformStyle,
  transition,
} = useCarousel(props, emit);

defineExpose({
  prev,
  next,
  goTo,
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  transition: transform ease-in-out;
}

.carousel-indicators {
  position: absolute;
  display: flex;
  gap: 6px;
  z-index: var(--z-index-level-2);
}

.carousel-indicators.center-bottom {
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-indicators.right-bottom {
  bottom: 0.5rem;
  right: 0.5rem;
  transform: translateX(-50%);
}

.carousel-indicators.left-bottom {
  bottom: 0.5rem;
  left: 0.5rem;
}

.carousel-indicators.center-top {
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-indicators.right-top {
  top: 0.5rem;
  right: 0.5rem;
  transform: translateX(-50%);
}

.carousel-indicators.left-top {
  top: 0.5rem;
  left: 0.5rem;
}

.carousel-indicators.left-center {
  left: 0.5rem;
  transform: translateY(-50%);
  top: 50%;
  flex-direction: column;
}

.carousel-indicators.right-center {
  right: 0.5rem;
  transform: translateY(-50%);
  top: 50%;
  flex-direction: column;
}

.indicator {
  width: 8px;
  height: 8px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: var(--primary-color);
}
</style>
