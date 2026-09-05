// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h, nextTick, reactive } from 'vue';

import QFormItem from '../../QFormItem/QFormItem.vue';
import QForm from '../QForm.vue';
import type { QFormExpose } from '../type';

const nameInput = defineComponent({
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () =>
      h('input', {
        class: 'field-input',
        value: props.modelValue,
        onInput: (e: Event) =>
          emit('update:modelValue', (e.target as HTMLInputElement).value),
      });
  },
});

const mountForm = (model: Record<string, unknown>) =>
  mount(QForm, {
    props: {
      model,
      rules: {
        name: [{ required: true, message: '请输入姓名' }, { min: 2 }],
      },
    },
    slots: {
      default: () =>
        h(
          QFormItem,
          { name: 'name', label: '姓名' },
          {
            default: () =>
              h(nameInput as never, {
                modelValue: model.name,
                'onUpdate:modelValue': (v: string) => {
                  model.name = v;
                },
              }),
          },
        ),
    },
  });

describe('QForm + QFormItem 集成', () => {
  it('必填红星与初始无错误', () => {
    const wrapper = mountForm(reactive({ name: '' }));
    expect(wrapper.find('.q-form-item__star').exists()).toBe(true);
    expect(wrapper.find('.q-form-item__error').exists()).toBe(false);
  });

  it('validate 失败显示错误，改值 blur 后通过清除', async () => {
    const model = reactive({ name: '' });
    const wrapper = mountForm(model);
    const vm = wrapper.vm as unknown as QFormExpose;

    expect(await vm.validate()).toBe(false);
    await nextTick();
    expect(wrapper.find('.q-form-item__error').text()).toContain('请输入姓名');

    model.name = 'Alice';
    await nextTick();
    await wrapper.find('.field-input').trigger('focusout');
    await nextTick();
    expect(await vm.validate()).toBe(true);
    await nextTick();
    expect(wrapper.find('.q-form-item__error').exists()).toBe(false);
  });

  it('resetFields 还原初始值并清错', async () => {
    const model = reactive({ name: 'init' });
    const wrapper = mountForm(model);
    const vm = wrapper.vm as unknown as QFormExpose;
    model.name = 'changed';
    await vm.validate();
    vm.resetFields();
    expect(model.name).toBe('init');
    expect(vm.errors.name).toBeUndefined();
  });
});
