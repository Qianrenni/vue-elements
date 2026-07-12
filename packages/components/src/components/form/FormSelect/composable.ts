import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
  type ComputedRef,
  type Ref,
} from 'vue';
import type { FormComponentEmits } from '@/types';
import type { FormSelectProps, Options } from './type';
import { useWindowResize } from '@/utils';

/**
 * FormSelect 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns 响应式状态和操作方法
 */
export const useFormSelect = (
  props: FormSelectProps,
  emit: FormComponentEmits<string>,
): {
  inputSelectRef: Readonly<Ref<HTMLInputElement | null>>;
  formSelectOptionsRef: Readonly<Ref<HTMLDivElement | null>>;
  isShowOptions: Ref<boolean>;
  selectedLabel: ComputedRef<string>;
  selectOption: (option: Options) => void;
  preventInput: (e: Event) => void;
  handleFocus: () => void;
  handleBlur: () => void;
} => {
  const inputSelectRef = useTemplateRef<HTMLInputElement>('input-select');
  const formSelectOptionsRef = useTemplateRef<HTMLDivElement>(
    'input-select-options',
  );
  /** 是否显示下拉选项 */
  const isShowOptions = ref(false);

  /** 当前选中项的标签文本 */
  const selectedLabel = computed(() => {
    if (props.modelValue === null) return '';
    const option = props.options.find((opt) => opt.value === props.modelValue);
    return option?.label || '';
  });

  /** 同步下拉选项宽度与输入框一致 */
  const syncWidth = () => {
    if (inputSelectRef.value && formSelectOptionsRef.value) {
      formSelectOptionsRef.value.style.width =
        inputSelectRef.value.offsetWidth + 'px';
      formSelectOptionsRef.value.style.height = 'auto';
    }
  };

  /** 选择选项 */
  const selectOption = (option: Options) => {
    if (inputSelectRef.value) {
      inputSelectRef.value.value = option.label;
    }
    emit('update:modelValue', option.value);
  };

  /** 阻止输入框文本编辑 */
  const preventInput = (e: Event) => {
    (e.target as HTMLInputElement).value = selectedLabel.value;
  };

  /** 聚焦时展示下拉 */
  const handleFocus = () => {
    isShowOptions.value = true;
  };

  /** 失焦时隐藏下拉 */
  const handleBlur = () => {
    isShowOptions.value = false;
  };

  onMounted(async () => {
    await nextTick();
    syncWidth();
    if (
      inputSelectRef.value &&
      props.options
        .map((option) => option.value)
        .includes((props.modelValue ?? '') as string)
    ) {
      inputSelectRef.value.textContent = props.modelValue ?? null;
    }
    useWindowResize.addHandler(syncWidth);
  });

  onBeforeUnmount(() => {
    useWindowResize.removeHandler(syncWidth);
  });

  return {
    inputSelectRef,
    formSelectOptionsRef,
    isShowOptions,
    selectedLabel,
    selectOption,
    preventInput,
    handleFocus,
    handleBlur,
  };
};
