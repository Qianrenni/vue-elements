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
      :aria-label="'搜索'"
      :tabindex="0"
      icon="Search"
      role="button"
      size="16px"
      style="
        position: absolute;
        left: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
      "
      title="搜索"
      @click="handleSearchClick"
      @keydown.enter.prevent="handleSearchClick"
      @keydown.space.prevent="handleSearchClick"
    />
  </div>
</template>

<script lang="ts" setup>
import { QIcon } from '@/components/basic/Icon';

import { useSearch } from './composable';
import type { SearchEmits, SearchProps } from './type';

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
