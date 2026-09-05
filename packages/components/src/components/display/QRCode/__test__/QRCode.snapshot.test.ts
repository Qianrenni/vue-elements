// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import QQRCode from '../QRCode.vue';

describe('QQRCode 渲染', () => {
  it('渲染 svg 与码点 path', () => {
    const wrapper = mount(QQRCode, {
      props: { value: 'https://example.com', size: 128 },
    });
    const svg = wrapper.find('svg.q-qrcode');
    expect(svg.exists()).toBe(true);
    expect(svg.attributes('width')).toBe('128');
    expect(svg.attributes('height')).toBe('128');
    expect(wrapper.find('path').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('空值不绘制码点 path', () => {
    const wrapper = mount(QQRCode, { props: { value: '' } });
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('path').exists()).toBe(false);
  });

  it('前景色/背景色应用到 path 与根样式', () => {
    const wrapper = mount(QQRCode, {
      props: { value: 'x', color: '#ff0000', bgColor: '#ffff00' },
    });
    expect(wrapper.find('path').attributes('fill')).toBe('#ff0000');
    const svg = wrapper.find('svg').element as HTMLElement;
    expect(svg.style.backgroundColor).toBe('rgb(255, 255, 0)');
  });

  it('中心图标渲染 image', () => {
    const wrapper = mount(QQRCode, {
      props: { value: 'https://example.com', icon: '/logo.png', size: 200 },
    });
    expect(wrapper.find('image').exists()).toBe(true);
  });
});
