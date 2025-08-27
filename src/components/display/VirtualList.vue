<!-- VirtualList.vue -->
<template>
  <div
      ref="containerRef"
      class="virtual-list-container"
      @scroll="handleScroll"
      :style="{ height: containerHeight + 'px' }"
  >
    <!-- 占位元素：撑起滚动条总高度 -->
    <div class="virtual-list-phantom" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 可视区域内容（通过 translateY 定位） -->
    <div class="virtual-list-content" :style="{ transform: `translateY(${offset}px)` }">
      <div
          v-for="item in visibleItems"
          :key="item.key"
          class="virtual-list-item"
          :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        <!-- 插槽：允许自定义内容 -->
        <slot :item="item.data" :index="item.key">
          {{ item.data }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// ========== Props 定义 ==========
const props = defineProps<{
  data: Array<any>,
  itemSize: number,
  containerHeight: number
}>()

// ========== 响应式状态 ==========
const containerRef = ref(null)
const scrollTop = ref(0) // 当前滚动位置

// ========== 计算属性 ==========
// 总内容高度（用于撑起滚动条）
const totalHeight = computed(() => props.data.length * props.itemSize)

// 可视区域能显示的 item 数量
const visibleCount = computed(() => Math.ceil(props.containerHeight / props.itemSize))

// 预加载缓冲数量（前后各多渲染几个，防止快速滚动白屏）
const prefetchCount = 5
const totalCount = computed(() => visibleCount.value + 2 * prefetchCount)

// 当前起始索引
const startIdx = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemSize) - prefetchCount)
})

// 当前结束索引
const endIdx = computed(() => {
  return Math.min(startIdx.value + totalCount.value, props.data.length)
})

// translateY 偏移量（让内容“窗口”滑动）
const offset = computed(() => startIdx.value * props.itemSize)

// 当前需要渲染的可见项
const visibleItems = computed(() => {
  const items = []
  for (let i = startIdx.value; i < endIdx.value; i++) {
    items.push({
      key: i,
      props.data[i]
    })
  }
  return items
})

// ========== 事件处理 ==========
const handleScroll = () => {
  scrollTop.value = containerRef.value.scrollTop
}

// ========== 生命周期 ==========
onMounted(() => {
  // 初始化滚动位置
  scrollTop.value = containerRef.value.scrollTop || 0
})

// 数据变化时，不需要特别处理，computed 会自动更新
watch(
    () => props.data.length,
    () => {
      // 可在此处重置 scrollTop 或做其他适配
      console.log('数据更新，长度：', props.data.length)
    }
)
</script>

<style scoped>
.virtual-list-container {
  overflow-y: auto;
  position: relative;
  border: 1px solid #ddd;
  outline: none;
}

.virtual-list-phantom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* 可选：开启硬件加速，提升滚动性能 */
  /* transform: translateZ(0); */
}

.virtual-list-item {
  padding: 0 15px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 可以添加 hover 效果 */
.virtual-list-item:hover {
  background-color: #f5f5f5;
}
</style>