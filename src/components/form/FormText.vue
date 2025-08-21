<!-- components/form/FormText.vue -->
<template>
  <div
      :class="[

          {
            'container-column':direction==='vertical',
            'gap-half':direction==='vertical',
            'container-align-center':direction!=='vertical'
          }
      ]"
      class="form-text-container"
      role="none"
  >
    <label
        v-if="label"
        :id="id"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
        :for="name"
        class="label"
    >
      {{ label }}:
    </label>
    <div
        class="
        input-text-container
        container
        "
    >
      <input
          :id="name"
          :class="[
            {
              'mouse-cursor-disable':disabled,
              'text-12rem':size==='large',
              'text-05rem':size==='small'
            }
          ]
          "
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
      />
      <icon
          v-show="
                  type!=='password'
                  &&showCloseIcon
                  "
          :size="iconSize[size]"
          class="
            close-icon
          "
          icon="Close"
          @click="onClear"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events/useFormEvents";
import Icon from "@/components/basic/Icon.vue";
import {ref} from "vue";

type TextType = `text` | `email` | `password` | `number` | `tel` | `url`

interface FormTextProps extends FormComponentProps<string> {
  type?: TextType,
  pattern?: string
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
})
const showCloseIcon = ref(false);
const iconSize = {
  'small': 8,
  'middle': 12,
  'large': 24
}
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
  showCloseIcon.value = true;
  handleFocus()
}

const onBlur = (e: FocusEvent) => {
  // 使用setTimeout延迟执行，避免点击closeIcon时立即触发blur事件
  setTimeout(() => {
    showCloseIcon.value = false;
    handleBlur()
  }, 200)
}

const onClear = () => {
  handleClear('') // 清空为 null
}
</script>
<style lang="css" scoped>

</style>
