<template>
  <div class="tablist margin-half-vetical">
    <span
        v-for="(item, index) in list"
        :key="index"
        @click="clickHandler(index)"
        :class="{
        [activeClass]: index === activeCategory
      }"
        class="tab-item padding-half-rem mouse-cursor "
    >
      {{ item }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { defineOptions } from 'vue'

defineOptions({
  name: 'TabList'
})

const props = defineProps({
  list: {
    type: Array as () => string[],
    default: () => []
  },
  activeClass: {
    type: String,
    default: 'active'
  }
})

const emit = defineEmits<{
  (e: 'select', index: number): void
}>()

const activeCategory = ref<number | null>(null)

function clickHandler(index: number) {
  activeCategory.value = index
  emit('select', index)
}
</script>

<style scoped>


.tab-item {
  font-weight: bold;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.tab-item:hover {
  background-color: var(--background-color);
}
.tab-item.active{
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
</style>