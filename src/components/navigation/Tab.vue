<template>
  <div class="tablist margin-half-vetical">
    <span
        v-for="(item, index) in list"
        :key="index"
        :class="{
        [activeClass]: index === activeCategory
      }"
        class="tab-item padding-half-rem mouse-cursor"
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
      activeClass: string
    }>(),
    {
      list: () => [],
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


.tab-item {
  font-weight: bold;
  position: relative;
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
</style>
