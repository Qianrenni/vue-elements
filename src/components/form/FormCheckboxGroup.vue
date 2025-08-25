<!-- components/form/FormCheckboxGroup.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-checkbox-group-container"
  >
    <label
        v-if="label"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-08rem':size==='small'
        }"
        class="label"
    >
      {{ label }}
    </label>
    <div>
      <label
          v-for="opt in options"
          :key="opt.value"
          :for="opt.value"
          class="margin-fourth-horizontal"
      >
        <input
            :checked="modelValue?.includes(opt.value)"
            :class="[
              {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-08rem':size==='small'
              }
            ]
            "
            :disabled="disabled"
            :name="opt.value"
            :value="opt.value"
            type="checkbox"
            @change="onChange"
        />
        {{ opt.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps, Options} from '@/types';
import {useFormEvents} from "@/events";

interface FormCheckboxGroupProps extends FormComponentProps<string[]> {
  options: Options[],
}

defineOptions({
  name: 'FormCheckboxGroup',
})
const props = withDefaults(defineProps<FormCheckboxGroupProps>(), {
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '',
  clearable: true,
})

const emit = defineEmits<FormComponentEmits<string[]>>();
const {handleInput} = useFormEvents<string[]>(emit)
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const value = target.value;
  const checked = target.checked;
  const newValue = [...props.modelValue ?? []];

  if (checked) {
    newValue.push(value);
  } else {
    const index = newValue.indexOf(value);
    if (index > -1) {
      newValue.splice(index, 1);
    }
  }
  handleInput(newValue)
}
</script>

<style scoped>
.form-checkbox-group-container {
  display: flex;
}
</style>
