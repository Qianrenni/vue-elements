<template>
  <button
      :autofocus="autofocus"
      :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
      :type="type"
      class="button-primary"
      @click="onClick"
  >
    <slot
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
    />
  </button>
</template>

<script lang="ts" setup>
import {FormComponentProps} from "@/types";

interface FormButtonProps extends FormComponentProps<null> {
  type?: 'button' | 'submit' | 'reset'
}

defineOptions({
  name: 'FormButton',
})
const props = withDefaults(defineProps<FormButtonProps>(), {
  type: 'button',
  disabled: false,
  autofocus: false,
  size: 'middle',
})
const onClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
    return
  }
}
</script>

<style scoped>

</style>
