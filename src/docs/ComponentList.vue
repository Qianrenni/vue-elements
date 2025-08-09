<!-- src/docs/ComponentList.vue -->
<script lang="ts" setup>
import {computed, onBeforeMount} from 'vue'
import {ComponentInfo, useComponentScanner} from '@/utils/useComponentScanner'

defineProps<{
  selected: ComponentInfo | null
}>()

defineEmits<{
  (e: 'select', comp: ComponentInfo): void
}>()

const {components, loadComponents} = useComponentScanner()

onBeforeMount(() => {
  loadComponents()
  console.log(components.value);
})

// ✅ 按 category 分组
const grouped = computed(() => {
  const map = new Map<string, ComponentInfo[]>()
  components.value.forEach(comp => {
    if (!map.has(comp.category)) {
      map.set(comp.category, [])
    }
    map.get(comp.category)!.push(comp)
  })
  return map
})
</script>

<template>
  <div class="component-list">
    <div v-for="[category, list] in grouped" :key="category" class="category">
      <h3>{{ category }}</h3>
      <ul>
        <li
            v-for="comp in list"
            :key="comp.name"
            :class="{ active: selected?.name === comp.name }"
            @click="$emit('select', comp)"
        >
          {{ comp.displayName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.component-list {
  width: 260px;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  background: #f8f9fa;
  padding: 1rem;
}

.category h3 {
  margin: 1.5rem 0 0.5rem;
  color: #333;
  font-size: 1.2em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.4rem 0.6rem;
  margin: 0.2rem 0;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.95em;
}

li:hover {
  background: #0b5ed7;
  color: white;
}

li.active {
  background: #0d6efd;
  color: white;
}
</style>