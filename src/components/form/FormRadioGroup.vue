<!-- components/form/FormRadioGroup.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-radio-group-container"
  >
    <span
        v-if="label"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-08rem':size==='small'
        }"
        class="label"
    >
      {{ label }}
    </span>
    <div class="">
      <label
          v-for="opt in options"
          :key="opt.value"
          :for="opt.value"
          class="margin-fourth-horizontal"
      >
        <input
            :checked="modelValue === opt.value"
            :class="[
              {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-08rem':size==='small'
              }
            ]
            "
            :disabled="disabled"
            :name="name"
            :required="required"
            :value="opt.value"
            type="radio"
            @change="onChange"
        />
        {{ opt.label }}
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
.form-radio-group-container {
  display: flex;

}
</style>
