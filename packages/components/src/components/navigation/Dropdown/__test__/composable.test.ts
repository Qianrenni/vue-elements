import { describe, expect, it } from 'vitest';

import { useDropdown } from '../composable';
import type { DropdownEmits, DropdownProps } from '../type';

const noopEmit: DropdownEmits = () => undefined;

function makeProps(overrides: Partial<DropdownProps> = {}): DropdownProps {
  return { items: [], ...overrides };
}

describe('useDropdown', () => {
  it('默认关闭', () => {
    const { isOpen } = useDropdown(makeProps(), noopEmit);
    expect(isOpen.value).toBe(false);
  });

  it('受控 open=true 时展开', () => {
    const { isOpen, isControlled } = useDropdown(
      makeProps({ open: true }),
      noopEmit,
    );
    expect(isControlled.value).toBe(true);
    expect(isOpen.value).toBe(true);
  });

  it('切换展开 / 关闭', () => {
    const { isOpen, toggle, closeMenu } = useDropdown(makeProps(), noopEmit);
    toggle();
    expect(isOpen.value).toBe(true);
    closeMenu();
    expect(isOpen.value).toBe(false);
  });

  it('选择菜单项后自动关闭并派发 select', () => {
    const events: unknown[][] = [];
    const emit: DropdownEmits = (e, ...args) => {
      events.push([e, ...args]);
    };
    const item = { key: 'edit', label: '编辑' };
    const { isOpen, openMenu, handleSelect } = useDropdown(makeProps(), emit);
    openMenu();
    expect(isOpen.value).toBe(true);
    handleSelect(item);
    expect(isOpen.value).toBe(false);
    expect(events[1]).toEqual(['select', item]);
  });

  it('placement 解析方向', () => {
    const topRight = useDropdown(
      makeProps({ placement: 'topRight' }),
      noopEmit,
    );
    expect(topRight.verticalSide.value).toBe('top');
    expect(topRight.horizontalAlign.value).toBe('right');
  });
});
