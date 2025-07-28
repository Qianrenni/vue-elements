<template>
  <div class="nav-section  text-secondary ">
    <!-- 返回按钮 -->
    <div v-if="stack.length > 1" class="back-button" @click="goBack">
      ← 返回上一级
    </div>

    <!-- 当前层级标题 -->
    <h4 v-if="currentLevelTitle" class="current-title">
      {{ currentLevelTitle }}
    </h4>

    <!-- 导航列表 -->
    <ul class="section-nav">
      <li
          v-for="(section,index) in currentSections"
          :key="index"
          class="nav-item"
      >
        <a
            v-if="section.children?.length"
            href="javascript:void(0)"
            class="nav-link has-child hover-primary"
            :class="{ active: activeId === index }"
            @click="enterSubLevel(section,index)"
        >
          {{ section.title }}
        </a>
        <a
            v-else
            href="javascript:void(0)"
            class="nav-link hover-primary"
            :class="{ active: activeId === index }"
            @click="markActive(section, index)"
        >
          {{ section.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 定义类型
interface Section {
  id: number | string
  title: string
  children?: Section[]
}

// props
const props = defineProps<{
  sections: Section[],
  title: string,
}>()

// 事件定义
const emit = defineEmits<{
  (e: 'select', section: Section): void
}>()

// 数据状态
const stack = ref<{ title: string; children: Section[] }[]>([
  { title: props.title, children: [] }
])
const activeId = ref<string | number | null>(null)

// 初始化栈数据
watch(
    () => props.sections,
    (newSections) => {
      stack.value = [{ title: props.title, children: newSections }]
      activeId.value = null
    },
    { immediate: true }
)

// 计算当前显示的菜单项
const currentSections = computed(() => {
  return stack.value.length ? stack.value[stack.value.length - 1].children : props.sections
})

// 当前层级标题
const currentLevelTitle = computed(() => {
  if (stack.value.length <= 1) return props.title
  return stack.value[stack.value.length - 1].title
})

// 方法
function enterSubLevel(section: Section, index: number) {
  stack.value.push(section)
  activeId.value = index
}

function goBack() {
  if (stack.value.length > 1) {
    stack.value.pop()
  }
  if (stack.value.length === 1) {
    stack.value[0].children = props.sections
  }
}

function markActive(section: Section,index: number) {
  activeId.value = index;
  // console.log(section);
  emit('select', section)
}
</script>

<style scoped>
/* 这里保持原样式不变即可 */
.nav-section {}

.back-button {
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

.current-title {
  padding-right: 1em;
  font-size: 1.1rem;
  font-weight: bold;
}

.section-nav {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.nav-link {
  display: block;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.4rem 0.4rem;
  transition: all 0.3s ease;
}

.nav-link.has-child::after {
  content: '→';
}

.nav-link.active {
  background-color: var(--primary-color);
  color: var(--color-white);
}

@media screen and (max-width: 768px) {
  .nav-section {
    width: 100%;
    max-width: 100vw;
  }
}
</style>
