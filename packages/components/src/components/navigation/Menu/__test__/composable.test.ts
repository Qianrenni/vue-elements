import { describe, expect, it } from 'vitest';

import { useMenu } from '../composable';
import type { MenuEmits, MenuItem, MenuProps } from '../type';

const noopEmit: MenuEmits = () => undefined;

function makeProps(overrides: Partial<MenuProps> = {}): MenuProps {
  return { items: [], mode: 'inline', ...overrides };
}

const items: MenuItem[] = [
  { key: 'a', label: 'A' },
  { key: 'sub', label: '子菜单', children: [{ key: 'a1', label: 'A1' }] },
  { key: 'b', label: 'B', disabled: true },
];

describe('useMenu', () => {
  it('默认无选中与展开', () => {
    const { selectedKeys, openKeys } = useMenu(makeProps(), noopEmit);
    expect(selectedKeys.value).toEqual([]);
    expect(openKeys.value).toEqual([]);
  });

  it('点击叶子项单选', () => {
    const { handleItemClick, selectedKeys } = useMenu(
      makeProps({ items }),
      noopEmit,
    );
    handleItemClick(items[0]);
    expect(selectedKeys.value).toEqual(['a']);
  });

  it('多选切换', () => {
    const { handleItemClick, selectedKeys } = useMenu(
      makeProps({
        items: [...items, { key: 'c', label: 'C' }],
        multiple: true,
      }),
      noopEmit,
    );
    handleItemClick(items[0]);
    handleItemClick({ key: 'c', label: 'C' });
    expect(selectedKeys.value).toContain('a');
    expect(selectedKeys.value).toContain('c');
    // 再次点击取消选中
    handleItemClick({ key: 'c', label: 'C' });
    expect(selectedKeys.value).not.toContain('c');
  });

  it('禁用项不选中', () => {
    const { handleItemClick, selectedKeys } = useMenu(
      makeProps({ items }),
      noopEmit,
    );
    handleItemClick(items[2]);
    expect(selectedKeys.value).toEqual([]);
  });

  it('子菜单展开 / 收起', () => {
    const { isOpen, handleSubmenuTrigger } = useMenu(
      makeProps({ items }),
      noopEmit,
    );
    expect(isOpen('sub')).toBe(false);
    handleSubmenuTrigger(items[1]);
    expect(isOpen('sub')).toBe(true);
    handleSubmenuTrigger(items[1], false);
    expect(isOpen('sub')).toBe(false);
  });

  it('受控 selectedKeys 时以 props 为准', () => {
    const { selectedKeys } = useMenu(
      makeProps({ items, selectedKeys: ['b'] }),
      noopEmit,
    );
    expect(selectedKeys.value).toEqual(['b']);
  });
});
