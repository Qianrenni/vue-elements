<!-- components/form/FormText.vue -->
<template>
  <div>
    <label v-if="label" :for="name" class="label">{{ label }}:</label>
    <input
        :id="name"
        :name="name"
        :pattern="pattern"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        class="input-text padding-24rem"
        @input="oninput"
        :value="modelValue"
    />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  modelValue: String,
  name: String,
  label: String,
  type: {
    type: String as () => `text` | `email` | `password` | `number` | `tel` | `url`,
    default: 'text'
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: true
  },
  pattern: String
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();
const oninput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value as string);
}
</script>
<style lang="css" scoped>

</style>
