<!-- components/form/FormSelectMultiple.vue -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        'container': direction === 'horizontal'
      }
    ]"
    class=" padding-24rem"
  >
    <div class="container-flex-1 ">
      <p>{{ label }}</p>
      <label>      
        <input
          type="text"
          :placeholder="placeholder"
          class="input-text-container text-input"
          :name="props.name"
        >
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps, Options} from '@/types'
import {computed, ref} from "vue";
import Icon from "@/components/basic/Icon.vue";
import {useFormEvents} from "@/events";

interface FormSelectProps extends FormComponentProps<string[]> {
  options: Options[],
  searchable?: boolean,
}

defineOptions({
  name: 'FormSelect'
})
// Props
const props = withDefaults(defineProps<FormSelectProps>(), {
  modelValue: () => [],
  placeholder: '请选择',
  required: true,
  direction: 'vertical',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
  searchable: false,
})
const emit = defineEmits<FormComponentEmits<string[]>>();

</script>

<style lang="css" scoped>

</style>