<template>
  <div  class="carousel"
        ref="carousel"
        :style="{
        width: `${props.width}px`,
        height: `${props.height}px`
      }"
  >
    <!-- 轮播内容容器 -->
    <div

        class="carousel-inner container-flex-start"
        :style="{
          transform: transformStyle,
          transition: transition,
          width: `${props.width*(vertical?1:totalItemsCount)}px`,
          height: `${props.height*(vertical?totalItemsCount:1)}px`
        }"
        :class="{
         'container-wrap': vertical,
        }"
    >
      <!-- 复制最后一项到最前 -->
      <div v-if="itemsCount > 0">
        <component :is="items[items.length - 1]" />
      </div>

      <!-- 正常显示所有 item -->
      <div
          v-for="(item, index) in items"
          :key="index"
      >
        <component :is="item" />
      </div>
      <!-- 复制第一项到最后 -->
      <div v-if="itemsCount > 0">
        <component :is="items[0]" />
      </div>
    </div>
    <!-- 左/上按钮 -->

    <!-- 指示器 -->
    <div class="carousel-indicators  bg-transparent"
         v-if="indicator"
         :class="{
          'center-bottom':indicatorPosition === 'center-bottom',
          'center-top':indicatorPosition === 'center-top',
          'left-bottom':indicatorPosition === 'left-bottom',
          'left-top':indicatorPosition === 'left-top',
          'left-center':indicatorPosition === 'left-center',
          'right-bottom':indicatorPosition === 'right-bottom',
          'right-top':indicatorPosition === 'right-top',
          'right-center':indicatorPosition === 'right-center'
         }"
        >
      <span
          v-for="(_, i) in itemsCount"
          :key="i"
          class="indicator "
          :class="{ active: i === realIndex }"
          @click="goTo(i)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onBeforeUnmount, useSlots, useTemplateRef} from 'vue'

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type:  Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 500
  },
  indicator: {
    type: Boolean,
    default: true
  },
  indicatorPosition: {
    type: String,
    default: 'center-bottom'
  },
  width:{
    type: Number,
    required: true
  },
  height:{
    type: Number,
    required: true
  },
  interval:{
    type: Number,
    default: 1500
  },
  direction:{
    type: String,
    default: 'next',
    validator(value) {
      return ['next', 'prev'].includes(value)
    }
  }

})
const slots = useSlots()
/* 轮播项*/
const items = computed(() => {
  if (!slots.default) return []
  if (slots.default()[0].type === Symbol.for('v-fgt')) {
    console.log('carousel use v-for');
    return slots.default()[0].children;
  }
  return slots.default().filter(vnode => vnode.type.name === 'CarouselItem')
})

const itemsCount = computed(() => items.value.length)
const totalItemsCount = computed(() => items.value.length + 2) // 前后各加一个复制项
// 当前索引
const currentIndex = ref(1)
const realIndex= computed(() => {
  if (currentIndex.value<=0) {
    return itemsCount.value - 1
  }
  if (currentIndex.value>=totalItemsCount.value - 1) {
    return 0
  }
  return currentIndex.value - 1
})
const carousel = useTemplateRef('carousel')
let intervalId = null
// 计算 transform 样式
const transformStyle = computed(() => {
  const value = -currentIndex.value * (props.vertical ? props.height : props.width)
  return props.vertical ? `translateY(${value}px)` : `translateX(${value}px)`
})
const useTransition = ref(true)
const transition = computed(() => {
  return useTransition.value ? `${props.duration}ms ease-in-out` : 'none'
})
// 上一页
function prev() {
  if(currentIndex.value<=0){
    // 切换到复制项，关闭动画
    useTransition.value = false
    currentIndex.value = totalItemsCount.value - 2

    // 下一帧恢复动画
    requestAnimationFrame(() => {
        requestAnimationFrame(()=>{
          useTransition.value = true
        })
      }
    )
  }else{
    currentIndex.value -= 1
  }
}

// 下一页
function next() {
  if(currentIndex.value>=totalItemsCount.value - 1){
    // 切换到复制项，关闭动画
    useTransition.value = false
    currentIndex.value = 1
    // 下一帧恢复动画
    requestAnimationFrame(() => {
        requestAnimationFrame(()=>{
          useTransition.value = true
        })
      }
    );
  }else{
    currentIndex.value += 1
  }
}

// 跳转到指定页
function goTo(index) {
  currentIndex.value = index+1;
}

// 启动自动播放
function startAutoplay() {
  if (props.autoplay && itemsCount.value > 1) {
    console.log('carousel start autoplay')
    stopAutoplay();
    intervalId = setInterval(props.direction === 'next' ? next : prev, props.interval);

  }
}

// 停止自动播放
function stopAutoplay() {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// 监听鼠标悬停停止播放
function addHoverListeners() {
  const carouselEl = carousel.value;
  if (!carouselEl) return

  carouselEl.addEventListener('mouseenter', stopAutoplay)
  carouselEl.addEventListener('mouseleave', startAutoplay)
}

// 销毁监听
onBeforeUnmount(() => {
  stopAutoplay()
  const carouselEl = carousel.value;
  if (carouselEl) {
    carouselEl.removeEventListener('mouseenter', stopAutoplay)
    carouselEl.removeEventListener('mouseleave', startAutoplay)
  }
})
// 初始化
onMounted(async () => {
  startAutoplay()
  addHoverListeners()
})
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
}
.carousel-indicators.center-bottom {
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
}
.carousel-indicators.right-bottom {
  bottom: 0.5rem;
  right: 0.5rem;
  transform:translateX(-50%);
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
  transform:translateX(-50%);
}
.carousel-indicators.left-top {
  top: 0.5rem;
  left: 0.5rem;
}
.carousel-indicators.left-center{
  left: 0.5rem;
  transform: translateY(-50%);
  top: 50%;
  flex-direction: column;
}
.carousel-indicators.right-center{
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
  background-color: var(--primary-color)
}
</style>
