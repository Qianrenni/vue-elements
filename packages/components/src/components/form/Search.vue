<script lang="ts" setup>
import { FormComponentEmits, FormComponentProps } from '@/types';
import { ref, watch } from 'vue';
import { QIcon } from '@/components/basic/Icon';
defineOptions({
  name: 'Search',
});
interface SearchEmits extends FormComponentEmits<string> {
  (e: 'search', value: string): void;
}
const emits = defineEmits<SearchEmits>();
const props = withDefaults(defineProps<FormComponentProps<string>>(), {
  direction: 'horizontal',
  disabled: false,
  autofocus: true,
  size: 'middle',
  placeholder: '',
  clearable: true,
});

const searchValue = ref(props.modelValue || '');
const keyDownhandler = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    emits('search', searchValue.value);
  } else {
    emits('change', searchValue.value);
  }
};
watch(
  () => searchValue.value,
  (newValue) => {
    emits('update:modelValue', newValue);
    emits('change', newValue);
  },
);
</script>

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
      @focus="emits('focus')"
      @blur="emits('blur')"
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
      @click="emits('search', searchValue)"
    />
  </div>
</template>

<style scoped>
.search-input {
  padding-left: 1.5rem;
}
</style>
