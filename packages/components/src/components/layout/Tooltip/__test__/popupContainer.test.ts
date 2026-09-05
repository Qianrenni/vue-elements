// @vitest-environment jsdom
import QConfigProvider from '@/components/theme/ConfigProvider/ConfigProvider.vue';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { h } from 'vue';

import QTooltip from '../Tooltip.vue';

afterEach(() => {
  document.body.innerHTML = '';
});

const mountTip = (getPopupContainer?: () => HTMLElement) => {
  const children = () =>
    h(QTooltip, { content: '气泡内容', mouseEnterDelay: 0 }, () => '触发');
  if (getPopupContainer) {
    return mount(QConfigProvider, {
      props: { getPopupContainer },
      slots: { default: children },
    });
  }
  return mount(QTooltip, {
    props: { content: '气泡内容', mouseEnterDelay: 0 },
    slots: { default: () => '触发' },
  });
};

describe('QTooltip 弹层容器（useQConfig.getPopupContainer）', () => {
  it('未包 QConfigProvider 时 Teleport 到 body', async () => {
    mountTip();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.querySelector('body > .q-tooltip')).not.toBeNull();
  });

  it('QConfigProvider.getPopupContainer 决定 Teleport 目标', async () => {
    const host = document.createElement('div');
    host.className = 'popup-host';
    document.body.appendChild(host);
    mountTip(() => host);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(host.querySelector('.q-tooltip')).not.toBeNull();
    expect(document.querySelector('body > .q-tooltip')).toBeNull();
  });
});
