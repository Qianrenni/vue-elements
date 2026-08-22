<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QScrollContainer } from 'qyani-components';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ name: 'DisplayLayoutScrollContainer' });

const items = Array.from({ length: 30 }, (_, i) => `列表项 ${i + 1}`);
const scrollPos = ref({ x: 0, y: 0 });
const reachedEnd = ref(false);
const wrapRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

const handleScroll = (pos: { x: number; y: number }) => {
  scrollPos.value = pos;
};

const handleEnded = () => {
  reachedEnd.value = true;
};

/*
 * 预览位于「组件展示」标签页中，通过 v-show 控制显隐：挂载时可能仍处于隐藏状态，
 * QScrollContainer 在 onMounted 中测量到的容器高度为 0，导致 @ended 事件无法触发。
 * 这里在组件真正可见后派发一次 window resize 事件，让 QScrollContainer 重新测量高度。
 */
onMounted(() => {
  if (!wrapRef.value) return;
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      window.dispatchEvent(new Event('resize'));
    }
  });
  observer.observe(wrapRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});

const code = `
\`\`\`html
<template>
  <QScrollContainer scroll-y @scroll="handleScroll" @ended="handleEnded">
    <div v-for="i in 30" :key="i" class="item">列表项 {{ i }}</div>
  </QScrollContainer>
</template>

<script setup>
import { ref } from 'vue';

const scrollPos = ref({ x: 0, y: 0 });
const handleScroll = (pos) => (scrollPos.value = pos);
const handleEnded = () => console.log('已滚动到底部');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div ref="wrapRef" class="container-column gap-6">
      <p class="scroll-status">
        滚动位置：x={{ scrollPos.x }}，y={{ scrollPos.y }}
        <span :class="reachedEnd ? 'status-end' : 'status-normal'">
          {{ reachedEnd ? '已到达底部' : '滚动中…' }}
        </span>
      </p>
      <QScrollContainer
        scroll-y
        class="scroll-demo"
        @scroll="handleScroll"
        @ended="handleEnded"
      >
        <div v-for="item in items" :key="item" class="scroll-item">
          {{ item }}
        </div>
      </QScrollContainer>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.scroll-status {
  margin: 0;
}
.status-end {
  color: #52c41a;
}
.status-normal {
  color: #999;
}
.scroll-demo {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem;
}
.scroll-item {
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #eee;
}
</style>
