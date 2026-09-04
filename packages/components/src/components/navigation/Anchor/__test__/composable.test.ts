// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';

import { useAnchor } from '../composable';
import type { AnchorEmits, AnchorProps } from '../type';

const noopEmit: AnchorEmits = () => undefined;

function makeProps(overrides: Partial<AnchorProps> = {}): AnchorProps {
  return { items: [], ...overrides };
}

/** 用宿主组件包裹以让生命周期钩子生效 */
function mountUseAnchor(props: AnchorProps) {
  const Host = defineComponent({
    setup() {
      const { flat, activeHref } = useAnchor(props, noopEmit);
      return { flat, activeHref };
    },
    template:
      '<ul><li v-for="f in flat" :key="f.href">{{ f.href }}|{{ f.depth }}</li></ul>',
  });
  return mount(Host);
}

describe('useAnchor', () => {
  it('展平一级 + 二级锚点（含 depth 层级）', () => {
    const wrapper = mountUseAnchor(
      makeProps({
        items: [
          { href: '#a', title: 'A' },
          {
            href: '#b',
            title: 'B',
            children: [{ href: '#b1', title: 'B1' }],
          },
        ],
      }),
    );
    const text = wrapper.text();
    expect(text).toContain('#a|0');
    expect(text).toContain('#b|0');
    expect(text).toContain('#b1|1');
  });

  it('空 items 时无锚点', () => {
    const wrapper = mountUseAnchor(makeProps());
    expect(wrapper.findAll('li')).toHaveLength(0);
  });
});
