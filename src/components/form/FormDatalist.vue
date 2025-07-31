<!-- components/form/FormDatalist.vue -->
<template>
  <div
      :class="[
          {
            'container-column': direction === 'vertical',
            'gap-half': direction === 'vertical',
            'container-align-center': direction !== 'vertical'
          }
      ]"
      class="form-text-container"
  >
    <label
        v-if="label"
        :id="id"
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
    <div class="input-text-container container">
      <input
          :id="name"
          :class="[
            {
              'mouse-cursor-disable': disabled,
              'text-12rem': size === 'large',
              'text-05rem': size === 'small'
            }
          ]"
          :disabled="disabled"
          :list="name + '-list'"
          :name="name"
          :placeholder="placeholder"
          :required="required"
          :value="modelValue"
          class=""
          @blur="onBlur"
          @change="onChange"
          @focus="onFocus"
          @input="onInput"
      />
    </div>
    <datalist :id="name + '-list'">
      <option v-for="option in options" :key="option" :value="option"/>
    </datalist>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";

interface FormDataListProps extends FormComponentProps<string> {
  options: string[];
}

defineOptions({
  name: 'FormDataList'
})
withDefaults(defineProps<FormDataListProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
});
const emit = defineEmits<FormComponentEmits<string>>();

// 使用统一的表单事件处理器
const {handleInput, handleChange, handleFocus, handleBlur, handleClear} =
    useFormEvents<string>(emit);

// 事件绑定
const onInput = (e: Event) => {
  handleInput(e as InputEvent, (ev) => (ev.target as HTMLInputElement).value);
};

const onChange = (e: Event) => {
  handleChange(e, (ev) => (ev.target as HTMLInputElement).value);
};

const onFocus = (e: FocusEvent) => {
  handleFocus(e);
};

const onBlur = (e: FocusEvent) => {
  handleBlur(e);
};

const onClear = () => {
  handleClear('');
};
</script>

<style lang="css" scoped>
/* 样式完全复用 FormText，无需额外写 */
</style>