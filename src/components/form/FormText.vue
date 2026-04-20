<!-- components/form/FormText.vue -->
<template>
  <div
    :class="[

      {
        'container-column':direction==='vertical',
        'container':direction==='horizontal',
      }
    ]"
    role="none"
  >
    <p 
      v-if="label"
      class="text-label"
      :class="[
        {
          'required':required
        }
      ]"
    >
      {{ label }}
    </p>
    <input
      class="text-input"
      :class="[
        {
          'uneditable':disabled
        }
      ]"
      :disabled="disabled"
      :name="name"
      :pattern="pattern"
      :placeholder="placeholder"
      :required="required"
      :type="type"
      :value="modelValue"
      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      @input="onInput"
    >
  </div>
</template>

<script lang="ts" setup>

import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";

type TextType = `text` | `email` | `password` | `number` | `tel` | `url`

interface FormTextProps extends FormComponentProps<string> {
  type?: TextType,
  pattern?: string | undefined,
  editable?:boolean,
}

defineOptions({
  name: 'FormText'
})
withDefaults(defineProps<FormTextProps>(), {
  type: "text",
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
  pattern: undefined,
  editable:true,
})
const emit = defineEmits<FormComponentEmits<string>>()
// 创建事件处理器
const {handleInput, handleChange, handleFocus, handleBlur, handleClear} = useFormEvents<string>(emit)

// 具体事件绑定
const onInput = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value as string)
}

const onChange = (e: Event) => {
  handleChange((e.target as HTMLInputElement).value as string)
}

const onFocus = (e: FocusEvent) => {
  handleFocus()
}

const onBlur = (e: FocusEvent) => {
  handleBlur()
}

const onClear = () => {
  handleClear('') // 清空为 null
}
</script>
<style lang="css" scoped>

</style>
