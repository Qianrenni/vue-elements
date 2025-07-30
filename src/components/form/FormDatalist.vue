<!-- components/form/FormDatalist.vue -->
<template>
  <div>
    <label :for="name">{{ label }}:</label>
    <input
        :id="name"
        v-model="modelValue"
        :list="name + '-list'"
        :name="name"
        type="text"
    />
    <datalist :id="name + '-list'">
      <option v-for="opt in options" :value="opt"/>
    </datalist>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: String,
  name: String,
  label: String,
  options: Array
});
defineEmits(['update:modelValue']);
</script>
