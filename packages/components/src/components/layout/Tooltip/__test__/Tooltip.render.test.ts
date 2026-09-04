// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';

import QTooltip from '../Tooltip.vue';

const cleanup = () => {
  document.body.querySelectorAll('.q-tooltip').forEach((el) => el.remove());
};

describe('QTooltip 渲染', () => {
  it('受控 open 应把弹层渲染到 body 并定位', async () => {
    cleanup();
    const { container } = render(QTooltip, {
      props: { open: true, content: '提示内容', placement: 'top' },
      slots: { default: '<button>触发</button>' },
    });
    await new Promise((r) => setTimeout(r, 100));

    const tip = document.body.querySelector('.q-tooltip') as HTMLElement;
    expect(tip).toBeTruthy();
    expect(tip.classList.contains('q-tooltip--top')).toBe(true);
    expect(tip.textContent).toContain('提示内容');
    expect(tip.style.left).toBeTruthy();
    expect(container.querySelector('.q-tooltip-trigger')).toBeTruthy();
  });

  it('focus（hover 触发含键盘可达）应显示，失焦后隐藏', async () => {
    cleanup();
    const { container } = render(QTooltip, {
      props: { content: '悬浮提示' },
      slots: { default: '<button>触发</button>' },
    });
    const trigger = container.querySelector(
      '.q-tooltip-trigger',
    ) as HTMLElement;
    const btn = trigger.querySelector('button') as HTMLButtonElement;

    btn.focus();
    await new Promise((r) => setTimeout(r, 150));
    const shown = document.body.querySelector('.q-tooltip') as HTMLElement;
    expect(shown).toBeTruthy();
    expect(shown.style.display).toBe('block');

    btn.blur();
    await new Promise((r) => setTimeout(r, 150));
    expect(
      (document.body.querySelector('.q-tooltip') as HTMLElement).style.display,
    ).toBe('none');
  });
});
