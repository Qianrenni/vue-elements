<!-- components/form/FormRadioGroup.vue -->
<template>
  <div
    :class="[
      {
        'container-column':direction === 'vertical',
        'container':direction!=='vertical'

      }
    ]"
  >
    <span
      v-if="label"
      class="text-label"
    >
      {{ label }}
    </span>
    <div class="inner-container">
      <label
        v-for="opt in options"
        :key="opt.value"
        :for="opt.value"
        class="container-center"
      >
        <input
          :checked="modelValue === opt.value"
          :disabled="disabled"
          :name="name"
          :required="required"
          :value="opt.value"
          type="radio"
          @change="onChange"
        >
        <span class="text-085rem margin-fourth-horizontal">
          {{ opt.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps, Options} from "@/types";
import {useFormEvents} from "@/events";

interface FormRadioGroupProps extends FormComponentProps<string> {
  options: Options[];
}

defineOptions({
  name: 'FormRadioGroup',
})
const props = withDefaults(defineProps<FormRadioGroupProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
})
const emit = defineEmits<FormComponentEmits<string>>();
const {handleInput} = useFormEvents<string>(emit);
const onChange = (e: Event) => {
  handleInput((e.target as HTMLInputElement).value as string)
}
</script>

<style scoped>
</style>
