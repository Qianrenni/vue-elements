<template>
  <div class="tablist container container-wrap scroll-container scroll-x margin-half-vetical">
    <span
        v-for="(item, index) in list"
        :key="index"
        :class="{
        [activeClass]: index === activeCategory
      }"
        class="tab-item padding-half-rem mouse-cursor radius-third-rem"
        @click="clickHandler(index)"
    >
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import {defineEmits, defineOptions, defineProps, ref} from 'vue'

defineOptions({
  name: 'Tab'
})

const props = withDefaults(defineProps<{
  list: string[]
  activeClass?: string
}>(), {
  activeClass: 'active'
})

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

const activeCategory = ref<number | null>(props.list.length > 0 ? 0 : null)

function clickHandler(index: number) {
  activeCategory.value = index
  emit('select', index)
}
</script>

<style scoped>
.tablist {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.tablist::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.tab-item {
  font-weight: bold;
  position: relative;
  margin-right: var(--half-distance);
  transition: all 0.3s ease;
}

.tab-item:not(.active):hover {
  background-color: var(--gray-200);
  transform: translateY(-2px);
}

.tab-item.active {
  color: var(--primary-color);
}

.tab-item.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
  transition: transform 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .tab-item {
    flex: 0 0 auto;
  }
}
</style>
