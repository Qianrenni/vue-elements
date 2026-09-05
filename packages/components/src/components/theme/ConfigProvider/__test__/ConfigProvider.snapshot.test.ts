// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';

import { useQConfig } from '../composable';
import QConfigProvider from '../ConfigProvider.vue';

const Probe = defineComponent({
  setup() {
    const cfg = useQConfig();
    return () =>
      h(
        'div',
        { class: 'probe' },
        cfg
          ? `${cfg.componentSize.value}|${cfg.direction.value}|${JSON.stringify(
              cfg.cssVars.value,
            )}`
          : 'none',
      );
  },
});

describe('QConfigProvider', () => {
  it('渲染包裹节点：cssVars 内联、dir、尺寸类', () => {
    const wrapper = mount(QConfigProvider, {
      props: {
        componentSize: 'large',
        direction: 'rtl',
        cssVars: { '--q-color-primary': '#123456' },
      },
      slots: { default: () => h('div', { class: 'inner' }, '内容') },
    });
    const root = wrapper.get('.q-config-provider');
    expect(root.attributes('dir')).toBe('rtl');
    expect(root.classes()).toContain('q-config-provider--large');
    expect(root.attributes('style')).toContain('--q-color-primary: #123456');
    expect(wrapper.find('.inner').text()).toBe('内容');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('middle 尺寸与默认 direction 不加额外类/dir', () => {
    const wrapper = mount(QConfigProvider, {
      slots: { default: () => h('div', 'x') },
    });
    const root = wrapper.get('.q-config-provider');
    expect(root.classes()).not.toContain('q-config-provider--middle');
    expect(root.classes()).not.toContain('q-config-provider--small');
  });

  it('通过 provide 将配置传给子孙（useQConfig）', () => {
    const wrapper = mount(QConfigProvider, {
      props: {
        componentSize: 'small',
        cssVars: { '--q-color-primary': '#abcdef' },
      },
      slots: { default: () => h(Probe) },
    });
    expect(wrapper.find('.probe').text()).toBe(
      'small|ltr|{"--q-color-primary":"#abcdef"}',
    );
  });

  it('未包裹 QConfigProvider 时 useQConfig 返回 null', () => {
    const wrapper = mount(Probe);
    expect(wrapper.find('.probe').text()).toBe('none');
  });
});
