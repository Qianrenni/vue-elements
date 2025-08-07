<!-- components/query/InputRange.vue -->
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue: (number | string)[],
}>(), {
  modelValue: () => ['', '']
})

const emit = defineEmits(['update:modelValue']);

const update = (index: number, value: string | number) => {
  const val = [...props.modelValue];
  val[index] = value;
  emit('update:modelValue', val);
};
</script>

<template>
  <div class="query-input-range">
    <input
        :value="modelValue[0]"
        placeholder="最小值"
        type="number"
        @input="update(0, ($event?.target as HTMLInputElement).value)"
    />
    <span class="sep">~</span>
    <input
        :value="modelValue[1]"
        placeholder="最大值"
        type="number"
        @input="update(1, ($event?.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.query-input-range {
  display: flex;
  align-items: center;
  gap: 6px;
}

.query-input-range input {
  width: 100px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.sep {
  font-weight: 500;
  color: #666;
}
</style>
