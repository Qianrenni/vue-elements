<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QFormButton, QSwiperAction } from 'qyani-components';
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ name: 'DisplayLayoutSwiperAction' });

const swipeCount = ref(0);
const isOpen = ref(false);
const swiperKey = ref(0);
const wrapRef = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

const handleSwipe = () => {
  swipeCount.value++;
};

const handleOpenChange = (open: boolean) => {
  isOpen.value = open;
};

/*
 * QSwiperAction 在挂载时测量右侧操作区宽度；若在隐藏的「组件展示」标签页中挂载
 * （v-show），测量到的宽度为 0，滑动将无法展开操作区。
 * 这里在组件可见后通过 :key 强制重新挂载一次，以获取正确的操作区宽度。
 */
onMounted(() => {
  if (!wrapRef.value) return;
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) {
      swiperKey.value++;
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
  <QSwiperAction :threshold="50" @swipe="handleSwipe">
    <div class="item">向左滑动显示操作</div>
    <template #action>
      <QFormButton>删除</QFormButton>
    </template>
  </QSwiperAction>
</template>

<script setup>
const handleSwipe = () => console.log('swipe');
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div ref="wrapRef" class="container-column gap-6 w-400">
      <p class="swipe-status">
        已触发 swipe {{ swipeCount }} 次，操作区{{
          isOpen ? '已展开' : '已收起'
        }}
      </p>

      <QSwiperAction
        :key="swiperKey"
        :threshold="50"
        @swipe="handleSwipe"
        @update:open="handleOpenChange"
      >
        <div class="item">左滑我显示操作按钮</div>
        <template #action>
          <div class="action-area">
            <QFormButton>删除</QFormButton>
            <QFormButton>置顶</QFormButton>
          </div>
        </template>
      </QSwiperAction>

      <QSwiperAction disabled>
        <div class="item">已禁用滑动</div>
        <template #action>
          <div class="action-area">
            <QFormButton>删除</QFormButton>
          </div>
        </template>
      </QSwiperAction>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
.swipe-status {
  margin: 0;
  color: #666;
}
.item {
  padding: 1rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 6px;
}
.action-area {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  height: 100%;
  padding: 0 0.5rem;
  background: #f5f5f5;
}
</style>
