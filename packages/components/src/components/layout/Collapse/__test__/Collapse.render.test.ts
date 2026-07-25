// @vitest-environment browser
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-vue';
import { nextTick } from 'vue';

import QCollapseItem from '../../CollapseItem/CollapseItem.vue';
import QCollapse from '../Collapse.vue';

describe('QCollapse 渲染', () => {
  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QCollapse, {
      slots: { default: '折叠区内容' },
    });
    expect(getByText('折叠区内容')).toBeTruthy();
  });

  it('配合 CollapseItem 点击应展开/收起', async () => {
    const { container, emitted } = render(QCollapse, {
      props: { modelValue: [] },
      slots: {
        default: {
          components: { QCollapseItem },
          template:
            '<QCollapseItem name="1" title="标题一">内容一</QCollapseItem>',
        },
      },
    });
    const header = container.querySelector('.collapse-item__header')!;
    expect(container.querySelector('.is-active')).toBeNull();

    (header as HTMLElement).click();
    await nextTick();
    expect(emitted('update:modelValue')).toBeTruthy();
    expect(emitted('update:modelValue')![0]).toEqual([['1']]);
  });
});

describe('QCollapseItem 渲染', () => {
  it('应渲染 title 文本', () => {
    const { getByText } = render(QCollapseItem, {
      props: { name: '1', title: '面板标题' },
    });
    expect(getByText('面板标题')).toBeTruthy();
  });

  it('未传 title 时应回退到 name', () => {
    const { getByText } = render(QCollapseItem, {
      props: { name: 'panel-1' },
    });
    expect(getByText('panel-1')).toBeTruthy();
  });

  it('disabled 时点击不应触发交互（无父级 collapse 上下文）', async () => {
    const { container } = render(QCollapseItem, {
      props: { name: '1', disabled: true },
    });
    const header = container.querySelector(
      '.collapse-item__header',
    ) as HTMLElement;
    expect(container.querySelector('.mouse-cursor-disable')).toBeTruthy();
    // 点击不会报错也不会改变状态
    expect(() => header.click()).not.toThrow();
  });

  it('应渲染默认插槽内容', () => {
    const { getByText } = render(QCollapseItem, {
      props: { name: '1', title: '标题' },
      slots: { default: '面板内容' },
    });
    expect(getByText('面板内容')).toBeTruthy();
  });
});
