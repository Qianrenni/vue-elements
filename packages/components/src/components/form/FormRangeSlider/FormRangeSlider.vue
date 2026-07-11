<!--
 * @component QFormRangeSlider
 * @description 范围滑块表单组件，支持自定义格式化输出
 -->
<template>
  <div
    :class="[
      'range-slider',
      {
        'container-column': direction === 'vertical',
        container: direction !== 'vertical',
      },
    ]"
    role="none"
  >
    <label v-if="label" :id="labelId" class="text-label" :for="name">
      {{ label }}:
    </label>

    <div class="inner-container">
      <input
        :id="name"
        :aria-labelledby="labelId"
        :aria-valuemax="max"
        :aria-valuemin="min"
        :aria-valuenow="modelValue as number"
        :aria-valuetext="valueText || `${modelValue}`"
        :disabled="disabled"
        :max="max"
        :min="min"
        :name="name"
        :readonly="readonly"
        :required="required"
        :step="step"
        :value="modelValue"
        type="range"
        @blur="onBlur"
        @change="onChange"
        @focus="onFocus"
        @input="onInput"
      />

      <output
        :id="outputId"
        :aria-live="!disabled ? 'polite' : undefined"
        :class="{
          'text-12rem': size === 'large',
          'text-08rem': size === 'small',
        }"
      >
        {{ displayValue }}
      </output>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormComponentEmits } from '@/types';
import type { FormRangeSliderProps } from './type';
import { useFormRangeSlider } from './composable';

defineOptions({
  name: 'QFormRangeSlider',
});

const props = withDefaults(defineProps<FormRangeSliderProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  readonly: false,
  size: 'middle',
  min: 0,
  max: 100,
  step: 1,
  clearable: false,
  formatter: (val: number) => String(val),
});

const emit = defineEmits<FormComponentEmits<number>>();
const { labelId, outputId, displayValue, onInput, onChange, onFocus, onBlur } =
  useFormRangeSlider(props, emit);
</script>

<style lang="css" scoped>
.range-slider input[type='range'] {
  -webkit-appearance: none;
  flex: 1;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--primary-hover)
  );
}

.range-slider input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;
}

.range-slider input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.range-slider input[type='range']::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease;
}

.range-slider input[type='range']::-moz-range-track {
  flex: 1;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--primary-hover)
  );
}

.range-slider output {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
