<!--
 * @component QSearch
 * @description 搜索输入组件，支持 Enter 键和点击图标触发搜索
 -->
<template>
  <div class="container" style="position: relative">
    <input
      v-model="searchValue"
      :placeholder="props.placeholder"
      class="search-input text-input padding-fourth-vetical"
      type="search"
      :disabled="props.disabled"
      :name="props.name"
      @keyup="keyDownhandler"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <QIcon
      icon="Search"
      size="16px"
      style="
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
      "
      @click="handleSearchClick"
    />
  </div>
</template>

<script lang="ts" setup>
import type { SearchProps, SearchEmits } from './type';
import { useSearch } from './composable';
import { QIcon } from '@/components/basic/Icon';

defineOptions({
  name: 'QSearch',
});

const props = withDefaults(defineProps<SearchProps>(), {
  direction: 'horizontal',
  disabled: false,
  autofocus: true,
  size: 'middle',
  placeholder: '',
  clearable: true,
});

const emit = defineEmits<SearchEmits>();
const {
  searchValue,
  keyDownhandler,
  handleFocus,
  handleBlur,
  handleSearchClick,
} = useSearch(props, emit);
</script>

<style scoped>
.search-input {
  padding-left: 1.5rem;
}
</style>
