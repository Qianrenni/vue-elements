<!-- components/form/FormText.vue -->
<template>
  <div>
    <label v-if="label" :for="name" class="label">{{ label }}:</label>
    <input
        :id="name"
        v-model="value"
        :name="name"
        :pattern="pattern"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        class="input-text padding-24rem"
        @input="$emit('update:modelValue', value)"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

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

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const emit = defineEmits(['update:modelValue']);
</script>
<style lang="css" scoped>

</style>
