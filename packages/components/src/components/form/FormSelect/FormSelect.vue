<!--
 * @component QFormSelect
 * @description 下拉选择表单组件，支持自定义下拉高度
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        container: direction === 'horizontal',
      },
    ]"
    style="position: relative"
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
    <input
      ref="input-select"
      :class="[
        {
          uneditable: disabled,
        },
      ]"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      class="input-text-container text-input"
      :name="props.name"
      :value="selectedLabel"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="preventInput"
    />
    <Transition name="fade">
      <div
        v-show="isShowOptions"
        ref="input-select-options"
        class="container-column form-select-options bg-card shadow-common scroll-container"
        :style="{ maxHeight: props.optionsHeight }"
      >
        <p
          v-for="option in options"
          :key="option.value"
          :class="{
            'bg-secondary': modelValue === option.value,
          }"
          class="mouse-cursor text-085rem padding-fourth-rem radius-half-rem bg-hover-secondary"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';
import type { FormSelectProps } from './type';
import { useFormSelect } from './composable';

defineOptions({
  name: 'QFormSelect',
});

const props = withDefaults(defineProps<FormSelectProps>(), {
  modelValue: null,
  placeholder: '请选择',
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
  searchable: false,
  optionsHeight: 'auto',
});

const emit = defineEmits<FormComponentEmits<string>>();
const {
  isShowOptions,
  selectedLabel,
  selectOption,
  preventInput,
  handleFocus,
  handleBlur,
} = useFormSelect(props, emit);
</script>

<style lang="css" scoped>
.form-select-options {
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  transform: translateY(calc(100% + 0.25rem));
  z-index: var(--z-index-level-3);
}
</style>
