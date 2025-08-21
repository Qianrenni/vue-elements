<!-- components/form/FormTextarea.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-text-area-container"
  >
    <label
        v-if="label"
        :id="name"
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
    <textarea
        :id="name"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        :style="{ resize: resizable ? 'both' : 'none' }"
        :value="modelValue"
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

interface FormTextAreaProps extends FormComponentProps<string> {
  rows?: number;
  resizable?: boolean; // 是否允许拖拽调整大小，默认为true
}

withDefaults(defineProps<FormTextAreaProps>(), {
  rows: 3,
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

<style scoped>
.form-text-area-container textarea {
  width: 100%;
  padding: 0.2rem 0.5rem;
  border: 1px solid #ccc;
}

.form-text-area-container textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.form-text-area-container label {
  white-space: nowrap;
}
</style>
