import { describe, expect, it } from 'vitest';

import {
  cloneOptions,
  collectMatches,
  resolveOptionsPath,
  samePath,
  useCascader,
} from '../composable';
import type { CascaderEmits, CascaderOption, CascaderProps } from '../type';

const options: CascaderOption[] = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [{ value: 'xihu', label: '西湖' }],
      },
    ],
  },
  { value: 'jiangsu', label: '江苏' },
];

const noopEmit: CascaderEmits = () => undefined;

function propsOf(overrides: Partial<CascaderProps> = {}): CascaderProps {
  return { options, ...overrides };
}

describe('Cascader 纯函数', () => {
  it('cloneOptions 深拷贝', () => {
    const copy = cloneOptions(options);
    expect(copy[0].children?.[0].value).toBe('hangzhou');
    expect(copy[0]).not.toBe(options[0]);
  });

  it('resolveOptionsPath 沿路径解析', () => {
    const path = resolveOptionsPath(options, ['zhejiang', 'hangzhou']);
    expect(path.map((o) => o.label)).toEqual(['浙江', '杭州']);
    // 断链截断
    expect(
      resolveOptionsPath(options, ['zhejiang', 'nope', 'x']).map(
        (o) => o.value,
      ),
    ).toEqual(['zhejiang']);
  });

  it('collectMatches 命中叶子带完整路径', () => {
    const res = collectMatches(options, '西湖');
    expect(res).toHaveLength(1);
    expect(res[0].labels).toEqual(['浙江', '杭州', '西湖']);
    expect(res[0].pathValues).toEqual(['zhejiang', 'hangzhou', 'xihu']);
  });

  it('samePath 比较', () => {
    expect(samePath(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(samePath(['a'], ['a', 'b'])).toBe(false);
    expect(samePath(null, ['a'])).toBe(false);
  });
});

describe('useCascader', () => {
  it('初始多列仅根层级', () => {
    const { columns } = useCascader(propsOf(), noopEmit);
    expect(columns.value.map((c) => c.map((n) => n.value))).toEqual([
      ['zhejiang', 'jiangsu'],
    ]);
  });

  it('点击父级 drill 展开新列（不提交）', async () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { handleOptionClick, activePath, columns } = useCascader(
      propsOf(),
      emit,
    );
    const act = await handleOptionClick(columns.value[0][0], 0);
    expect(act).toBe('stay');
    expect(activePath.value).toEqual(['zhejiang']);
    expect(columns.value.map((c) => c.map((n) => n.value))).toEqual([
      ['zhejiang', 'jiangsu'],
      ['hangzhou'],
    ]);
    expect(events).toEqual([]);
  });

  it('逐级 drill 到叶子提交路径并返回 close', async () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { handleOptionClick, activePath, columns } = useCascader(
      propsOf(),
      emit,
    );
    await handleOptionClick(columns.value[0][0], 0); // 浙江
    await handleOptionClick(columns.value[1][0], 1); // 杭州
    const act = await handleOptionClick(columns.value[2][0], 2); // 西湖
    expect(act).toBe('close');
    expect(activePath.value).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    expect(events[0]).toEqual([
      'update:modelValue',
      ['zhejiang', 'hangzhou', 'xihu'],
    ]);
    expect(events[1]).toEqual(['change', ['zhejiang', 'hangzhou', 'xihu']]);
    expect(events[2]?.[0]).toBe('select');
  });

  it('changeOnSelect 点击父级即提交', async () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { handleOptionClick, columns } = useCascader(
      propsOf({ changeOnSelect: true }),
      emit,
    );
    const act = await handleOptionClick(columns.value[0][0], 0);
    expect(act).toBe('stay');
    expect(events[0]).toEqual(['update:modelValue', ['zhejiang']]);
  });

  it('禁用节点不可操作', async () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { handleOptionClick } = useCascader(
      propsOf({
        options: [{ value: 'a', label: 'A', disabled: true }],
      }),
      emit,
    );
    const act = await handleOptionClick(
      { value: 'a', label: 'A', disabled: true },
      0,
    );
    expect(act).toBe('stay');
    expect(events).toEqual([]);
  });

  it('懒加载：加载后 drill；可继续选择子级', async () => {
    const loadOptions: CascaderOption[] = [
      { value: 'city', label: '城市', isLeaf: false },
    ];
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const loadData = async () => {
      return [{ value: 'xihu', label: '西湖', isLeaf: true }];
    };
    const { handleOptionClick, columns, activePath } = useCascader(
      propsOf({ options: loadOptions, loadData }),
      emit,
    );
    const act = await handleOptionClick(columns.value[0][0], 0);
    expect(act).toBe('stay');
    expect(activePath.value).toEqual(['city']);
    expect(columns.value).toHaveLength(2);
    expect(events).toEqual([]);
    // 加载出的子级可继续选中
    const act2 = await handleOptionClick(columns.value[1][0], 1);
    expect(act2).toBe('close');
    expect(events[0]).toEqual(['update:modelValue', ['city', 'xihu']]);
  });

  it('clear 派发', () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { clear } = useCascader(propsOf(), emit);
    clear();
    expect(events[0]).toEqual(['update:modelValue', null]);
    expect(events[1]).toEqual(['change', null]);
    expect(events[2]).toEqual(['clear']);
  });
});

describe('useCascader 搜索', () => {
  it('searchText 命中并点选提交', async () => {
    const events: unknown[][] = [];
    const emit: CascaderEmits = (e, ...args) => events.push([e, ...args]);
    const { searchText, searchResults, handleSearchPick } = useCascader(
      propsOf({ showSearch: true }),
      emit,
    );
    searchText.value = '西湖';
    expect(searchResults.value).toHaveLength(1);
    const act = await handleSearchPick(searchResults.value[0]);
    expect(act).toBe('close');
    expect(events[0]).toEqual([
      'update:modelValue',
      ['zhejiang', 'hangzhou', 'xihu'],
    ]);
  });
});
