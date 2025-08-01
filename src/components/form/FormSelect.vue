<!-- components/form/FormSelectMultiple.vue -->
<template>
  <div
      class="form-select-container"
  >
    <label
        v-if="label"
        class="label"
    >
      {{ label }}
    </label>
    <div
        class="
        container-column
        gap-fourth
        container-w100
        "
    >
      <div
          class="
          form-select-result
          "
          style="max-height: 3rem;min-height: 2rem;"
          @mousedown.prevent
      >
        <div
            class="
              scroll-container
              scroll-x
              container-align-center
            "
            style="
              white-space: nowrap;
              margin-right: 1.5rem;
              "
        >
          <span v-for="(option,index) in selectResult"
                :key="index"
                class="
                  bg-body
                  margin-half-horizontal
                "
          >
            {{ option.label }}
          <icon
              icon="Close"
              size="12"
              style="display: inline;"
              @click="activeIndexSet.delete(option)"
          />
        </span>
        </div>
        <icon
            v-if="!showOptions"
            class="arrow"
            icon="Left"
            size="24"
            @click="showOptions=!showOptions"
        />
        <icon
            v-else
            class="arrow"
            icon="Down"
            size="24"
            @click="showOptions=!showOptions"
        />
      </div>
      <div
          v-if="showOptions"
          class="
              form-select-options
              scroll-container
              scroll-y
              shadow-black
            "
          style="max-height: 180px;"
      >
        <span
            v-for="(option , index) in options"
            :key="index"
            :class="[{
              'active':activeIndexSet.has(option)
            }]"
            class="option hover-primary"
            @click="swtichActiveIndex(option)"
        >
          {{ option.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentEmits, FormComponentProps, Options} from '@/types'
import {computed, ref} from "vue";
import Icon from "@/components/basic/Icon.vue";

interface FormSelectProps extends FormComponentProps<string[]> {
  options: Options[],
  searchable: boolean,
  multiple: boolean
}

defineOptions({
  name: 'FormSelect'
})
// Props
const props = withDefaults(defineProps<FormSelectProps>(), {
  placeholder: '请选择',
  required: true,
  direction: 'horizontal',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  clearable: false,
  searchable: false,
  multiple: true
})
const emit = defineEmits<FormComponentEmits<string[]>>()
// 生成唯一 ID
const showOptions = ref(false);

let activeIndexSet = ref(new Set<Options>());
const selectResult = computed(() => {
  return props.options.filter((option, _) => activeIndexSet.value.has(option));
})
const swtichActiveIndex = (value: Options) => {
  if (!props.multiple) {
    if (activeIndexSet.value.has(value)) {
      activeIndexSet.value.clear();
    } else {
      activeIndexSet.value.clear();
      activeIndexSet.value.add(value);
    }
  } else {
    if (activeIndexSet.value.has(value)) {
      activeIndexSet.value.delete(value);
    } else {
      activeIndexSet.value.add(value);
    }
  }
}

</script>

<style lang="css" scoped>

.form-select-options {

  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 0.2rem;
}

.form-select-result {
  position: relative;
  display: flex;
  border: 1px solid var(--border-color);
}

.form-select-result .arrow {
  position: absolute;
  right: 0.05rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
}

.form-select-options .option {
  margin: 0.2rem 0.5rem;
  cursor: pointer;
}

.form-select-options .option.active {
  background-color: var(--primary-color);
  color: var(--color-white);
}
</style>