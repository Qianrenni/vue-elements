<!--
 * @component QFormCheckboxGroup
 * @description 多选框组表单组件，支持横向/纵向排列
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction !== 'vertical',
        'container-align-center': direction !== 'vertical',
      },
    ]"
  >
    <p
      v-if="label"
      class="text-label"
      :class="[
        {
          required: required,
        },
      ]"
    >
      {{ label }}
    </p>
    <div class="inner-container">
      <label
        v-for="opt in options"
        :key="opt.value"
        :for="opt.value"
        class="container-center gap-fourth"
      >
        <input
          :checked="modelValue?.includes(opt.value)"
          :disabled="disabled"
          :name="opt.value"
          :value="opt.value"
          type="checkbox"
          @change="onChange"
        />
        <span class="text-085rem">
          {{ opt.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';
import type { FormCheckboxGroupProps } from './type';
import { useFormCheckboxGroup } from './composable';

defineOptions({
  name: 'QFormCheckboxGroup',
});
const props = withDefaults(defineProps<FormCheckboxGroupProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
});

const emit = defineEmits<FormComponentEmits<string[]>>();
const { onChange } = useFormCheckboxGroup(props, emit);
</script>

<style scoped></style>
