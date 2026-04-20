<!-- components/form/FormSelectMultiple.vue -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        'container': direction === 'horizontal'
      }
    ]"
    style="position: relative;"
  >
    <p 
      v-if="label"
      class="text-label"
    >
      {{ label }}
    </p>
    <!-- 禁止input对输入有反应 -->
    <input
      ref="input-select"
      :class="[
        {
          'uneditable':disabled,
        }
      ]"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      class="input-text-container text-input"
      :name="props.name"
      :value="selectedLabel"
      @focus="isShowOptions = true"
      @blur="isShowOptions = false"
      @input="(event) => (event.target as HTMLInputElement).value = selectedLabel"
    >
    <Transition name="fade">
      <div
        v-show="isShowOptions"
        ref="input-select-options"
        class=" container-column form-select-options bg-card shadow-common scroll-container"
        :style="{ maxHeight: props.optionsHeight }"
      >
        <p
          v-for="option in options"
          :key="option.value"
          :class="{
            'bg-secondary':modelValue===option.value
          }"
          class=" mouse-cursor text-085rem padding-fourth-rem radius-half-rem bg-hover-secondary"
          @click="() => {
            inputSelectRef!.value = option.label;
            emit('update:modelValue', option.value);
          }"
        >
          {{ option.label }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps, Options} from '@/types'
import {computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef} from "vue";
import { useWindowResize } from '@/utils';

interface FormSelectProps extends FormComponentProps<string> {
  options: Options[],
  searchable?: boolean,
  optionsHeight?: string,
}

defineOptions({
  name: 'FormSelect'
})
// Props
const props = withDefaults(defineProps<FormSelectProps>(), {
  modelValue: null,
  placeholder: '请选择',
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
  searchable: false,
  optionsHeight: 'auto',
});
const inputSelectRef = useTemplateRef('input-select');
const formSelectOptionsRef = useTemplateRef('input-select-options');
const isShowOptions = ref(false);
const emit = defineEmits<FormComponentEmits<string>>();
const selectedLabel = computed(() => {
  if (!props.modelValue) return '';
  const option = props.options.find(opt => opt.value === props.modelValue);
  return option?.label || '';
});
const handler = ()=>{
    if(inputSelectRef.value&&formSelectOptionsRef.value){
      formSelectOptionsRef.value.style.width = inputSelectRef.value.offsetWidth + 'px';
      formSelectOptionsRef.value.style.height = 'auto'
    }
  }
onMounted(async () => {
  nextTick(
    ()=>{
      handler();
        if(
          inputSelectRef.value
          &&props.options.map((option) => option.value).includes(props.modelValue || '')
        ){
          // Set the input text content to the selected option label
          inputSelectRef.value!.textContent = props.modelValue;
        }
    }
  )
  useWindowResize.addHandler(handler);
});
onBeforeUnmount(() => {
  useWindowResize.removeHandler(handler);
});
</script>

<style lang="css" scoped>

.form-select-options{
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  transform: translateY( calc(100% + 0.25rem) );
  z-index: var(--z-index-level-3);
}
</style>