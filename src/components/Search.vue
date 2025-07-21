<script setup lang="ts">
import Icon from "./Icon.vue";
import {ref} from "vue";

defineOptions({
  name: 'Search'
})
const emits=defineEmits(['search'])
const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索你感兴趣的内容'
  }
})

const searchValue = ref('')
</script>

<template>
  <div class="container"  style="width: 100%;position: relative;">
    <icon icon="search"
          style="position: absolute;
                left: 0;top: 50%;
                background-color: transparent;
                transform: translateY(-50%)"
          size="18px"
          @click="emits('search', searchValue)"
    />
    <input
           type="search"
           class="search-input padding-fourth-vetical"
           :placeholder="props.placeholder"
           v-model="searchValue"
           @keyup.enter="emits('search', searchValue)"
    />
  </div>

</template>

<style scoped>
.search-input {
  outline: none;
  padding-left: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex:1;
}
.search-input:focus{
  border-color: var(--text-color);
}
</style>
