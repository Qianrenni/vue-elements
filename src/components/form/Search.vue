<script setup lang="ts">
import Icon from "../basic/Icon.vue";
import {ref} from "vue";

defineOptions({
  name: 'Search'
})
const emits = defineEmits<{
  (e: 'search', value: string): void
  (e: 'change', value: string): void
}>()
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索你感兴趣的内容'
  }
})

const searchValue = ref('')

const keyDownhandler = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emits('search', searchValue.value)
  }else{
    emits('change', searchValue.value)
  }
}
</script>

<template>
  <div class="container"  style="width: 100%;position: relative;">
    <icon icon="Search"
          style="position: absolute;
                left: 0.5rem;top: 50%;
                background-color: transparent;
                transform: translateY(-50%)"
          size="1.1rem"
          @click="emits('search', searchValue)"
    />
    <input
           type="search"
           class="search-input padding-fourth-vetical"
           :placeholder="props.placeholder"
           v-model="searchValue"
           @keyup="keyDownhandler"
    />
  </div>

</template>

<style scoped>
.search-input {
  outline: none;
  padding-left: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex:1;
  transition: border-color 0.3s ease;
}
.search-input:focus{
  border-color: var(--primary-color);
}
</style>
