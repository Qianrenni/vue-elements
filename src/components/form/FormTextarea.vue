<!-- components/form/FormTextarea.vue -->
<template>
  <div
    :class="[
      {
        'container-column':direction === 'vertical',
        'container':direction === 'horizontal'

      }
    ]"
    class="form-text-area-container"
  >
    <p
      v-if="label"
      class=" text-label"
      :class="[
        {
          'required':required
        }
      ]"
    >
      {{ label }}
    </p>
    <textarea
      :id="name"
      :class="[
        {
          'uneditable':disabled
        }
      ]"
      :disabled="disabled"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :style="{ resize: resizable ? 'both' : 'none' }"
      :value="modelValue"
      class=" text-input scroll-container"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events";

defineOptions({
  name: 'FormTextarea'
});

type FormTextAreaProps =FormComponentProps<string> & {
  // 行数
  rows?: number;
  // 是否可拉伸
  resizable?: boolean;
}

withDefaults(defineProps<FormTextAreaProps>(), {
  rows: 5,
  resizable: false,
  placeholder: '请输入内容',
  required: true,
  direction: 'vertical',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
});

const emit = defineEmits<FormComponentEmits<string>>();
const {handleInput} = useFormEvents(emit);
const onInput = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value as string)
};
</script>

