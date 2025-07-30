<!-- components/form/FormDatePicker.vue -->
<template>
  <div>
    <label v-if="label" :for="name">{{ label }}:</label>
    <input
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        :value="formattedValue"
        @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

// 支持的日期类型
type DateType = 'date' | 'time' | 'datetime-local' | 'month' | 'week';

const props =defineProps<{
  modelValue: string | null | undefined;
  name: string;
  label?: string;
  type: DateType;
  placeholder?: string;
  required?: boolean;
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// 处理输入，确保输出为字符串
const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

// 可选：格式化显示值（防止 null/undefined）
const formattedValue = computed({
  get() {
    return props.modelValue || '';
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<style scoped>

</style>
