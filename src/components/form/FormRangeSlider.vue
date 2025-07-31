<!-- components/form/FormRangeSlider.vue -->
<template>
  <div
      :class="[
      'range-slider',
      {
        'container-column': direction === 'vertical',
        'gap-fourth': direction === 'vertical',
        'container-align-center': direction !== 'vertical'
      }
    ]"
      role="none"
  >
    <label
        v-if="label"
        :id="labelId"
        :class="{
        'mouse-cursor-disable': disabled,
        'text-12rem': size === 'large',
        'text-05rem': size === 'small'
      }"
        :for="name"
        class="label"
    >
      {{ label }}:
    </label>

    <div
        class="
          container
          container-flex-1
          container-align-center
          gap-half
        "
    >
      <input
          :id="name"
          :aria-labelledby="labelId"
          :aria-valuemax="max"
          :aria-valuemin="min"
          :aria-valuenow="modelValue as number"
          :aria-valuetext="valueText || `${modelValue}`"
          :class="{
          'mouse-cursor-disable': disabled,
        }"
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

      <!-- 输出当前值，对屏幕阅读器友好 -->
      <output
          :id="outputId"
          :aria-live="!disabled ? 'polite' : undefined"
          :class="{
          'mouse-cursor-disable': disabled,
          'text-12rem': size === 'large',
          'text-05rem': size === 'small'
          }"
      >
        {{ displayValue }}
      </output>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";
import {computed} from "vue";

interface FormRangeSliderProps extends FormComponentProps<number> {
  min?: number;
  max?: number;
  step?: number;
  /**
   * 自定义显示值文本（用于 ARIA 和 output）
   */
  valueText?: string;
  /**
   * 自定义输出显示格式
   */
  formatter?: (value: number) => string;
}

const props = withDefaults(defineProps<FormRangeSliderProps>(), {
  required: true,
  direction: "horizontal",
  disabled: false,
  readonly: false,
  size: "middle",
  min: 0,
  max: 100,
  step: 1,
  clearable: false, // 虽不适用，但保持接口统一
  formatter: (val: number) => String(val),
});

const emit = defineEmits<FormComponentEmits<number>>();

// 使用统一事件处理器
const {handleInput, handleChange, handleFocus, handleBlur} = useFormEvents<number>(emit);

// 唯一 ID
const labelId = computed(() => props.id || `${props.name}-label`);
const outputId = computed(() => `${props.name}-output`);

// 显示值（格式化）
const displayValue = computed(() => props.formatter!(props.modelValue ?? 0));

// 事件绑定
const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  handleInput(e as InputEvent, () => target.valueAsNumber);
};

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  handleChange(e, () => target.valueAsNumber);
};

const onFocus = (e: FocusEvent) => {
  handleFocus(e);
};

const onBlur = (e: FocusEvent) => {
  handleBlur(e);
};
</script>

<style lang="css" scoped>
</style>