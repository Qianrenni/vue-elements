<!-- components/form/FormDatalist.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input
        :id="name"
        :list="name + '-list'"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
    />
    <datalist :id="name + '-list'">
      <option v-for="option in options" :key="option" :value="option"/>
    </datalist>
  </div>
</template>

<script lang="ts" setup>
// 定义 props
defineProps<{
  modelValue: string;
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
}>();

// 定义 emit 事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// 处理输入事件，更新 v-model
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<style scoped>

</style>
