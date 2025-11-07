<!-- components/FormSwitch.vue -->
<template>
  <div
      :class="
      [
        {
          'mouse-cursor-disable':disabled,
          'form-switch--checked': modelValue,
        }
      ]"
      class="form-switch"
      @click="toggle"
  >
    <input
        :id="id"
        :checked="modelValue!"
        :disabled="disabled"
        :name="name"
        class="form-switch__input"
        type="checkbox"
    />
    <label :class="[
               {
                 'container-column':direction==='vertical'
               }
           ]"
           :for="id"
           class="form-switch__label container-align-center mouse-cursor"
    >
      <span
          :class="[
              {
                'mouse-cursor-disable':disabled,
                 [`size-${size}`]:true,
              }
          ]"
          class="form-switch__slider"
      >

      </span>
      <span v-if="label"
            :class="[
                {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-08rem':size==='small'
                }
            ]"
            class="form-switch__label-text">
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps} from "@/types";
import {useFormEvents} from "@/events";
defineOptions({
  name: 'FormSwitch'
})

// 接收 props
const props = withDefaults(defineProps<FormComponentProps<boolean>>(), {
  modelValue: false,
  label: '',
  disabled: false,
  name: '',
  direction: 'horizontal',
  size: 'middle',
});

const emit = defineEmits<FormComponentEmits<boolean>>();
const {handleChange} = useFormEvents(emit);

async function toggle() {
  if (!props.disabled) {
    handleChange(!props.modelValue);
  }
}
</script>

<style scoped>
.form-switch {
  display: inline-block;
  position: relative;
}

.form-switch__input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.form-switch__slider {
  width: 2.5rem;
  height: 1.5rem;
  background-color: var(--gray-400);
  border-radius: 0.75rem;
  position: relative;
  transition: background-color 0.3s;
  margin-right: 8px;
}

.form-switch__slider::before {
  content: '';
  position: absolute;
  width: 1.2rem;
  height: 1.3rem;
  border-radius: 50%;
  background-color: var(--color-white);
  top: 0.1rem;
  left: 0.1rem;
  transition: transform 0.3s;
}

/* 选中状态样式 */
.form-switch--checked .form-switch__slider {
  background-color: var(--primary-color);
}

.form-switch--checked .form-switch__slider::before {
  transform: translateX(1.1rem);
}

.form-switch__slider.size-large {
  width: 3.5rem;
  height: 1.8rem;
  border-radius: 0.9rem;
  margin-right: 10px;
}

.form-switch__slider.size-large::before {
  width: 1.5rem;
  height: 1.6rem;
}

.form-switch--checked .form-switch__slider.size-large::before {
  transform: translateX(1.8rem);
}

.form-switch__slider.size-small {
  width: 2rem;
  height: 1.2rem;
  border-radius: 0.6rem;
  margin-right: 6px;
}

.form-switch__slider.size-small::before {
  width: 1rem;
  height: 1rem;
}

.form-switch--checked .form-switch__slider.size-small::before {
  transform: translateX(0.8rem);
}
</style>