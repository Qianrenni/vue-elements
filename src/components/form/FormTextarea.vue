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
    <label v-if="label" :for="name">{{ label }}:</label>
    <textarea
        :id="name"
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

const props = withDefaults(defineProps<FormTextAreaProps>(), {
  rows: 3,
  resizable: false
});

const emit = defineEmits<FormComponentEmits<string>>();
const {handleInput} = useFormEvents(emit);
const onInput = (e: Event) => {
  handleInput(e as InputEvent, (ev) => (ev.target as HTMLInputElement).value as string)
};
</script>

<style scoped>

</style>
