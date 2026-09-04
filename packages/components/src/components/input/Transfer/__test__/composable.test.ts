import { describe, expect, it } from 'vitest';

import {
  appendKeys,
  enabledItems,
  filterByKeyword,
  removeKeys,
  splitDataSource,
  useTransfer,
} from '../composable';
import type { TransferEmits, TransferItem, TransferProps } from '../type';

const dataSource: TransferItem[] = [
  { key: 'a', title: 'Apple', description: 'red' },
  { key: 'b', title: 'Banana' },
  { key: 'c', title: 'Cherry', disabled: true },
];

const noopEmit: TransferEmits = () => undefined;

function propsOf(overrides: Partial<TransferProps> = {}): TransferProps {
  return { dataSource, modelValue: [], ...overrides };
}

describe('Transfer 纯函数', () => {
  it('splitDataSource 拆分左右', () => {
    const { left, right } = splitDataSource(dataSource, ['b']);
    expect(left.map((i) => i.key)).toEqual(['a', 'c']);
    expect(right.map((i) => i.key)).toEqual(['b']);
  });

  it('enabledItems 剔除禁用', () => {
    expect(enabledItems(dataSource).map((i) => i.key)).toEqual(['a', 'b']);
  });

  it('filterByKeyword 标题/描述匹配', () => {
    expect(filterByKeyword(dataSource, 'red').map((i) => i.key)).toEqual(['a']);
    expect(filterByKeyword(dataSource, 'banana').map((i) => i.key)).toEqual([
      'b',
    ]);
    expect(filterByKeyword(dataSource, 'zzz')).toEqual([]);
  });

  it('appendKeys / removeKeys', () => {
    expect(appendKeys(['a'], ['b', 'a'])).toEqual(['a', 'b']);
    expect(removeKeys(['a', 'b', 'c'], ['b', 'x'])).toEqual(['a', 'c']);
  });
});

describe('useTransfer', () => {
  it('初始左右拆分 + 过滤', () => {
    const { leftList, rightList, filteredLeft } = useTransfer(
      propsOf({ modelValue: ['b'] }),
      noopEmit,
    );
    expect(leftList.value.map((i) => i.key)).toEqual(['a', 'c']);
    expect(rightList.value.map((i) => i.key)).toEqual(['b']);
    expect(filteredLeft.value.map((i) => i.key)).toEqual(['a', 'c']);
  });

  it('toggleItem 勾选/取消（禁用项无效）', () => {
    const { leftList, leftChecked, toggleItem, isChecked } = useTransfer(
      propsOf(),
      noopEmit,
    );
    const apple = leftList.value[0];
    toggleItem('left', apple.key);
    expect(isChecked('left', 'a')).toBe(true);
    toggleItem('left', apple.key);
    expect(isChecked('left', 'a')).toBe(false);
    // 禁用项
    toggleItem('left', 'c');
    expect(leftChecked.value).toEqual([]);
  });

  it('toggleAll 全选/取消', () => {
    const { leftChecked, toggleAll, isLeftAll } = useTransfer(
      propsOf(),
      noopEmit,
    );
    toggleAll('left');
    expect(leftChecked.value).toEqual(['a', 'b']);
    expect(isLeftAll.value).toBe(true);
    toggleAll('left');
    expect(leftChecked.value).toEqual([]);
  });

  it('moveRight 派发并清空勾选', () => {
    const events: unknown[][] = [];
    const emit: TransferEmits = (e, ...args) => events.push([e, ...args]);
    const { toggleItem, moveRight, canMoveRight, leftChecked } = useTransfer(
      propsOf(),
      emit,
    );
    expect(canMoveRight.value).toBe(false);
    toggleItem('left', 'a');
    expect(canMoveRight.value).toBe(true);
    moveRight();
    expect(events[0]).toEqual(['update:modelValue', ['a']]);
    expect(events[1]).toEqual(['change', ['a'], 'right', ['a']]);
    expect(leftChecked.value).toEqual([]);
  });

  it('moveLeft 移回左侧', () => {
    const events: unknown[][] = [];
    const emit: TransferEmits = (e, ...args) => events.push([e, ...args]);
    const { toggleItem, moveLeft } = useTransfer(
      propsOf({ modelValue: ['a', 'b'] }),
      emit,
    );
    toggleItem('right', 'a');
    moveLeft();
    expect(events[0]).toEqual(['update:modelValue', ['b']]);
    expect(events[1]).toEqual(['change', ['b'], 'left', ['a']]);
  });

  it('oneWay 禁止向左', () => {
    const events: unknown[][] = [];
    const emit: TransferEmits = (e, ...args) => events.push([e, ...args]);
    const { toggleItem, moveLeft, canMoveLeft } = useTransfer(
      propsOf({ modelValue: ['a'], oneWay: true }),
      emit,
    );
    toggleItem('right', 'a');
    expect(canMoveLeft.value).toBe(false);
    moveLeft();
    expect(events).toEqual([]);
  });

  it('disabled 整体禁用移动', () => {
    const events: unknown[][] = [];
    const emit: TransferEmits = (e, ...args) => events.push([e, ...args]);
    const { toggleItem, moveRight } = useTransfer(
      propsOf({ disabled: true }),
      emit,
    );
    toggleItem('left', 'a');
    moveRight();
    expect(events).toEqual([]);
  });

  it('指定 keys 移动（双击语义）', () => {
    const events: unknown[][] = [];
    const emit: TransferEmits = (e, ...args) => events.push([e, ...args]);
    const { moveRight } = useTransfer(propsOf(), emit);
    moveRight(['b']);
    expect(events[0]).toEqual(['update:modelValue', ['b']]);
  });
});
