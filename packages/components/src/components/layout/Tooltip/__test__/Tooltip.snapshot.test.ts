// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import QTooltip from '../Tooltip.vue';

const cleanup = () => {
  document.body.querySelectorAll('.q-tooltip').forEach((el) => el.remove());
};
const tip = () =>
  document.body.querySelector('.q-tooltip') as HTMLElement | null;

/**
 * QTooltip 结构测试：内容存在即挂载（Teleport 到 body），display 控制显隐。
 */
describe('QTooltip 结构测试', () => {
  it('内容存在时默认隐藏（触发区快照）', () => {
    cleanup();
    const wrapper = mount(QTooltip, {
      props: { content: '提示' },
      slots: { default: '<button>触发</button>' },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(tip()).toBeTruthy();
    expect(tip()!.style.display).toBe('none');
    wrapper.unmount();
  });

  it('受控 open=true 应显示并渲染到 body', async () => {
    cleanup();
    const wrapper = mount(QTooltip, {
      props: { open: true, content: '提示文字' },
      slots: { default: '<button>触发</button>' },
    });
    await nextTick();

    expect(tip()).toBeTruthy();
    expect(tip()!.getAttribute('role')).toBe('tooltip');
    expect(tip()!.textContent).toContain('提示文字');
    expect(tip()!.style.display).toBe('block');

    wrapper.unmount();
  });

  it('disabled 时不显示', async () => {
    cleanup();
    const wrapper = mount(QTooltip, {
      props: { open: true, disabled: true, content: '提示' },
      slots: { default: '<button>触发</button>' },
    });
    await nextTick();

    expect(tip()!.style.display).toBe('none');
    wrapper.unmount();
  });

  it('click 触发应切换显隐', async () => {
    cleanup();
    const wrapper = mount(QTooltip, {
      props: { trigger: 'click', content: '提示文字' },
      slots: { default: '<button>触发</button>' },
    });
    const trigger = wrapper.find('.q-tooltip-trigger');

    await trigger.trigger('click');
    await nextTick();
    await new Promise((r) => setTimeout(r, 30));
    expect((wrapper.emitted('update:open') ?? []).map((e) => e[0])).toEqual([
      true,
    ]);
    expect(tip()!.style.display).toBe('block');

    await trigger.trigger('click');
    await new Promise((r) => setTimeout(r, 40));
    expect(tip()!.style.display).toBe('none');
    wrapper.unmount();
  });

  it('focus（hover 触发含键盘 focus）应显示，blur 后隐藏', async () => {
    cleanup();
    const wrapper = mount(QTooltip, {
      props: { content: '提示文字' },
      slots: { default: '<button>触发</button>' },
    });
    const trigger = wrapper.find('.q-tooltip-trigger');

    await trigger.trigger('focusin');
    await nextTick();
    await new Promise((r) => setTimeout(r, 30));
    expect(tip()!.style.display).toBe('block');

    await trigger.trigger('focusout');
    await new Promise((r) => setTimeout(r, 40));
    expect(tip()!.style.display).toBe('none');
    wrapper.unmount();
  });
});
