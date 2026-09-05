// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

import QAffix from '../Affix.vue';

let rect: {
  top: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  right: number;
  x: number;
  y: number;
};

beforeEach(() => {
  rect = {
    top: 200,
    bottom: 260,
    left: 10,
    width: 300,
    height: 60,
    right: 310,
    x: 10,
    y: 200,
  };
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => rect as unknown as DOMRect,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

const flush = async () => {
  await nextTick();
  await nextTick();
};

const mountAffix = (
  props: Record<string, unknown> = {},
  slot = `<div class="demo-box" style="height:60px">内容</div>`,
) =>
  mount(QAffix, {
    props,
    slots: { default: slot },
    attachTo: document.body,
  });

const vm = (wrapper: ReturnType<typeof mountAffix>) =>
  wrapper.vm as unknown as { updatePosition: () => void };

describe('QAffix 渲染', () => {
  it('未滚动到阈值：保持普通文档流', async () => {
    const wrapper = mountAffix();
    await flush();
    expect(wrapper.find('.q-affix').classes()).not.toContain('is-affixed');
    expect(wrapper.find('.q-affix-placeholder').exists()).toBe(false);
    expect(wrapper.find('.q-affix-content').classes()).not.toContain(
      'is-affixed',
    );
    expect(wrapper.text()).toContain('内容');
    expect(wrapper.html()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('offsetTop=0：滚动到顶部上方后吸顶 fixed', async () => {
    rect.top = -100;
    rect.bottom = -40;
    const wrapper = mountAffix();
    await flush();
    const content = wrapper.find('.q-affix-content');
    expect(wrapper.find('.q-affix').classes()).toContain('is-affixed');
    expect(wrapper.find('.q-affix-placeholder').exists()).toBe(true);
    expect(content.classes()).toContain('is-affixed');
    expect(content.attributes('style')).toContain('position: fixed');
    expect(content.attributes('style')).toContain('top: 0px');
    expect(content.attributes('style')).toContain('width: 300px');
    expect(content.attributes('style')).toContain('height: 60px');
    wrapper.unmount();
  });

  it('offsetBottom=0：滚动越过底部后吸底 fixed bottom', async () => {
    rect.top = 300;
    rect.bottom = 900;
    rect.height = 600;
    const wrapper = mountAffix({ offsetBottom: 0 });
    await flush();
    const content = wrapper.find('.q-affix-content');
    expect(wrapper.find('.q-affix').classes()).toContain('is-affixed');
    expect(content.attributes('style')).toContain('position: fixed');
    expect(content.attributes('style')).toContain('bottom: 0px');
    expect(content.attributes('style')).not.toContain('top:');
    wrapper.unmount();
  });

  it('滚动回原位后释放固定态', async () => {
    rect.top = -100;
    rect.bottom = -40;
    const wrapper = mountAffix();
    await flush();
    expect(wrapper.find('.q-affix').classes()).toContain('is-affixed');

    rect.top = 200;
    rect.bottom = 260;
    vm(wrapper).updatePosition();
    await flush();
    expect(wrapper.find('.q-affix').classes()).not.toContain('is-affixed');
    expect(wrapper.find('.q-affix-placeholder').exists()).toBe(false);
    wrapper.unmount();
  });

  it('onChange 仅在固定态切换时触发', async () => {
    const onChange = vi.fn();
    const wrapper = mountAffix({ onChange });
    await flush();
    expect(onChange).not.toHaveBeenCalled();

    rect.top = -100;
    rect.bottom = -40;
    vm(wrapper).updatePosition();
    await flush();
    expect(onChange).toHaveBeenNthCalledWith(1, true);

    // 已固定态下位置继续变化不重复触发
    rect.top = -200;
    rect.bottom = -140;
    vm(wrapper).updatePosition();
    await flush();
    expect(onChange).toHaveBeenCalledTimes(1);

    // 释放固定
    rect.top = 200;
    rect.bottom = 260;
    vm(wrapper).updatePosition();
    await flush();
    expect(onChange).toHaveBeenNthCalledWith(2, false);
    wrapper.unmount();
  });
});
