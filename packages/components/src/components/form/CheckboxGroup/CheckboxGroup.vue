<!--
 * @component QCheckboxGroup
 * @description 复选框组，对齐 Ant Design Checkbox.Group：options 驱动、v-model:value 双向绑定、支持单项禁用
 -->
<template>
  <div class="q-checkbox-group">
    <label
      v-for="option in normalizedOptions"
      :key="option.value"
      class="q-checkbox-group__item"
      :class="{ 'q-checkbox-group__item--disabled': isOptionDisabled(option) }"
    >
      <input
        class="q-checkbox-group__input"
        type="checkbox"
        :checked="isChecked(option.value)"
        :disabled="isOptionDisabled(option)"
        :name="name"
        :value="option.value"
        @change="onChange(option.value)"
      />
      <span class="q-checkbox-group__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { useCheckboxGroup } from './composable';
import type { NormalizedCheckboxOption } from './composable';
import type {
  CheckboxValue,
  QCheckboxGroupEmits,
  QCheckboxGroupProps,
} from './type';

defineOptions({ name: 'QCheckboxGroup' });

const props = withDefaults(defineProps<QCheckboxGroupProps>(), {
  options: () => [],
  value: () => [],
  disabled: false,
  name: undefined,
});

const emit = defineEmits<QCheckboxGroupEmits>();

const { normalizedOptions, isChecked, toggle } = useCheckboxGroup(props);

/** 选项是否禁用：整体禁用优先于单项禁用 */
function isOptionDisabled(option: NormalizedCheckboxOption): boolean {
  return props.disabled || option.disabled;
}

/** 选项变更：派发 update:value 与 change */
function onChange(value: CheckboxValue) {
  const next = toggle(value);
  emit('update:value', next);
  emit('change', next);
}
</script>

<style scoped>
.q-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--q-space-4);
}

.q-checkbox-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--q-space-4);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
  color: var(--q-color-text);
  cursor: pointer;
}

.q-checkbox-group__item--disabled {
  color: var(--q-color-text-muted);
  cursor: not-allowed;
}

.q-checkbox-group__input {
  width: 1rem;
  height: 1rem;
  margin: 0;
  accent-color: var(--q-color-primary);
  cursor: inherit;
}
</style>
