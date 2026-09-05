// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

import QImage from '../Image.vue';

const SRC = 'https://example.com/a.png';

describe('QImage 渲染与预览', () => {
  it('基础缩略图 + 尺寸/适配样式', () => {
    const wrapper = mount(QImage, {
      props: { src: SRC, width: 120, height: 80, fit: 'cover' },
    });
    const img = wrapper.find('.q-image-img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(SRC);
    expect(wrapper.find('.q-image-img').attributes('style')).toContain(
      'object-fit: cover',
    );
    expect(wrapper.find('.q-image').attributes('style')).toContain(
      'width: 120px',
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('preview=false 不显示预览遮罩', () => {
    const wrapper = mount(QImage, {
      props: { src: SRC, preview: false },
    });
    expect(wrapper.find('.q-image-mask').exists()).toBe(false);
  });

  it('点击遮罩打开全屏预览，工具栏可缩放并关闭', async () => {
    const wrapper = mount(QImage, {
      props: { src: SRC },
    });
    await wrapper.find('.q-image-mask').trigger('click');
    await nextTick();

    expect(document.querySelector('.q-image-preview')).not.toBeNull();
    expect(document.body.textContent).toContain('100%');

    // 放大一次 => 150%
    const buttons = document.querySelectorAll(
      '.q-image-preview-toolbar .q-image-preview-btn',
    );
    (buttons[1] as HTMLElement).click(); // 放大
    await nextTick();
    expect(document.body.textContent).toContain('150%');

    // 关闭
    const closeBtn = document.querySelectorAll(
      '.q-image-preview-toolbar .q-image-preview-btn',
    );
    (closeBtn[closeBtn.length - 1] as HTMLElement).click();
    await nextTick();
    expect(document.querySelector('.q-image-preview')).toBeNull();
    wrapper.unmount();
  });

  it('加载失败：有 fallback 切换到 fallback；无 fallback 触发 error', async () => {
    const wrapper = mount(QImage, {
      props: { src: SRC, fallback: '/fb.png' },
    });
    await wrapper.find('.q-image-img').trigger('error');
    await nextTick();
    expect(wrapper.find('.q-image-img').attributes('src')).toBe('/fb.png');

    const wrapper2 = mount(QImage, { props: { src: SRC } });
    await wrapper2.find('.q-image-img').trigger('error');
    await nextTick();
    expect(wrapper2.emitted('error')).toBeTruthy();
    wrapper2.unmount();
  });

  it('受控 previewOpen 打开预览', async () => {
    const wrapper = mount(QImage, {
      props: { src: SRC, previewOpen: true },
    });
    await nextTick();
    expect(document.querySelector('.q-image-preview')).not.toBeNull();
    wrapper.unmount();
  });
});
