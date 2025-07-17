<template>
  <Tag v-for="(item, index) in list"
             :key="index"
             :text="item"
             :circle="circle"
             :hoverClass="hoverClass"
             class="margin-fourth-rem"
             :class="{ active: activeCategory === index }"
             @click="clickHandler(index)"
  />
</template>

<script lang="ts" setup>

import { defineOptions, defineProps ,defineEmits } from "vue";
import { ref } from "vue";
import Tag from "./Tag.vue";

defineOptions({
  name: "TabList"
});

defineProps({
  list: {
    type: Array as () => string[],
    default: () => []
  },
  circle:{
    type: String as ()=>'large'|'middle'|'small'|'none',
    default:'small',
    validator:(value:string)=>['large','middle','small','none'].includes(value)
  },
  hoverClass:{
    type:String,
    default:'button'
  }
});

let activeCategory = ref<number | null>(null);
const emit = defineEmits<{
  select: [index: number];
}>();

function clickHandler(index: number) {
  console.log(`click ${index}`);
  activeCategory.value = index;
  emit("select", index);
}
</script>

<style scoped>
.active {
  color: var(--color-white); /* 请替换为实际需要的颜色值 */
  background-color: var(--primary-color)
}
</style>
