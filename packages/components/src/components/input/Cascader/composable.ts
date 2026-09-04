import { computed, ref, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type {
  CascaderEmits,
  CascaderOption,
  CascaderProps,
  CascaderValue,
} from './type';

/** 搜索结果项 */
export interface SearchMatch {
  /** 命中节点（内部克隆树对象） */
  node: CascaderOption;
  /** 根到该节点的 value 路径 */
  pathValues: CascaderValue[];
  /** 根到该节点的选项路径 */
  pathOptions: CascaderOption[];
  /** 根到该节点的标签路径 */
  labels: string[];
}

/** 深度克隆选项树（避免对 props 就地变更） */
export function cloneOptions(
  list: CascaderOption[] | undefined,
): CascaderOption[] {
  if (!list) return [];
  return list.map((o) => ({
    value: o.value,
    label: o.label,
    disabled: o.disabled === true,
    isLeaf: o.isLeaf === true,
    children: o.children ? cloneOptions(o.children) : undefined,
  }));
}

/** 按 value 路径解析选项链 */
export function resolveOptionsPath(
  tree: CascaderOption[],
  values: CascaderValue[] | null | undefined,
): CascaderOption[] {
  const out: CascaderOption[] = [];
  if (!values) return out;
  let nodes = tree;
  for (const v of values) {
    const cur = nodes.find((n) => n.value === v);
    if (!cur) break;
    out.push(cur);
    nodes = cur.children ?? [];
  }
  return out;
}

/** 递归收集匹配节点（label 忽略大小写包含 keyword） */
export function collectMatches(
  tree: CascaderOption[],
  keyword: string,
): SearchMatch[] {
  const kw = keyword.trim().toLowerCase();
  const out: SearchMatch[] = [];
  const walk = (
    nodes: CascaderOption[],
    prefix: CascaderValue[],
    opts: CascaderOption[],
  ) => {
    for (const node of nodes) {
      const pathValues = [...prefix, node.value];
      const pathOptions = [...opts, node];
      if (kw && node.label.toLowerCase().includes(kw)) {
        out.push({
          node,
          pathValues,
          pathOptions,
          labels: pathOptions.map((o) => o.label),
        });
      }
      if (node.children?.length) {
        walk(node.children, pathValues, pathOptions);
      }
    }
  };
  walk(tree, [], []);
  return out;
}

/** 两路径是否相同 */
export function samePath(
  a: CascaderValue[] | null | undefined,
  b: CascaderValue[],
): boolean {
  if (!a || a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}

/** useCascader 返回的处理器状态 */
export type CascaderActionResult = 'close' | 'stay';

/** useCascader 返回值 */
export interface UseCascaderReturn {
  /** 内部克隆树（懒加载会就地补 children） */
  treeData: Ref<CascaderOption[]>;
  /** 多列面板：按当前 drill 路径逐级展开 */
  columns: ComputedRef<CascaderOption[][]>;
  /** 当前 drill 路径（高亮/展开列） */
  activePath: Ref<CascaderValue[]>;
  /** 搜索关键词 */
  searchText: Ref<string>;
  /** 搜索结果 */
  searchResults: ComputedRef<SearchMatch[]>;
  /** 触发器回填文本 */
  displayText: ComputedRef<string>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 某列节点是否为当前路径选中 */
  isActiveValue: (value: CascaderValue, level: number) => boolean;
  /** 某节点是否处于懒加载中 */
  isLoading: (node: CascaderOption, level: number) => boolean;
  /** 点击面板节点 */
  handleOptionClick: (
    node: CascaderOption,
    level: number,
  ) => Promise<CascaderActionResult>;
  /** 点击搜索结果 */
  handleSearchPick: (item: SearchMatch) => Promise<CascaderActionResult>;
  /** 打开时按 modelValue 初始化路径 */
  resetPathForOpen: () => void;
  /** 清空 */
  clear: () => void;
}

/** 路径键（唯一标识用于 loading 去重） */
const KEY_SEP = '\u0000';
function pathKey(values: CascaderValue[]): string {
  return values.join(KEY_SEP);
}

/**
 * QCascader 组件核心逻辑：多列面板 drill / 懒加载 / 搜索 / 路径提交。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useCascader = (
  props: CascaderProps,
  emit: CascaderEmits,
): UseCascaderReturn => {
  const isDisabled = computed(() => props.disabled === true);

  /** 内部克隆树 */
  const treeData = ref<CascaderOption[]>(cloneOptions(props.options));
  watch(
    () => props.options,
    (val) => {
      treeData.value = cloneOptions(val);
    },
    { immediate: true },
  );

  /** 当前 drill 路径 */
  const activePath = ref<CascaderValue[]>([]);

  /** 懒加载中的路径集合 */
  const loadingKeys = ref<Set<string>>(new Set());

  /** 搜索关键词 */
  const searchText = ref('');

  /** 多列面板 */
  const columns = computed<CascaderOption[][]>(() => {
    const cols: CascaderOption[][] = [];
    let nodes: CascaderOption[] = treeData.value;
    for (let i = 0; ; i++) {
      cols.push(nodes);
      const v = activePath.value[i];
      if (v === undefined) break;
      const cur = nodes.find((n) => n.value === v);
      if (!cur || !cur.children || !cur.children.length) break;
      nodes = cur.children;
    }
    return cols;
  });

  /** 当前选中项路径标签 */
  const displayText = computed(() => {
    const opts = resolveOptionsPath(treeData.value, props.modelValue ?? null);
    const sep = props.separator ?? '/';
    return opts.map((o) => o.label).join(sep);
  });

  /** 搜索结果 */
  const searchResults = computed<SearchMatch[]>(() => {
    if (!props.showSearch) return [];
    return collectMatches(treeData.value, searchText.value);
  });

  const isActiveValue = (value: CascaderValue, level: number) =>
    activePath.value[level] === value;

  const isLoading = (node: CascaderOption, level: number) => {
    const prefix = activePath.value.slice(0, level);
    return loadingKeys.value.has(pathKey([...prefix, node.value]));
  };

  /** 提交路径（去重 update/change；select 始终派发） */
  function commitPath(values: CascaderValue[], node: CascaderOption) {
    const changed = !samePath(props.modelValue, values);
    if (changed) {
      const copy = [...values];
      emit('update:modelValue', copy);
      emit('change', copy);
    }
    emit('select', [...values], node);
  }

  /** 懒加载：触发 loadData，加载完成后 drill 或按叶子提交 */
  async function lazyLoad(
    node: CascaderOption,
    level: number,
  ): Promise<CascaderActionResult> {
    const prefix = activePath.value.slice(0, level);
    const pathValues = [...prefix, node.value];
    const key = pathKey(pathValues);
    if (loadingKeys.value.has(key)) return 'stay';
    loadingKeys.value = new Set(loadingKeys.value).add(key);
    try {
      const pathOptions = resolveOptionsPath(treeData.value, pathValues);
      const res = await props.loadData?.(pathOptions);
      if (Array.isArray(res)) node.children = res;
    } finally {
      const next = new Set(loadingKeys.value);
      next.delete(key);
      loadingKeys.value = next;
    }
    if (node.children?.length) {
      if (props.changeOnSelect) commitPath(pathValues, node);
      activePath.value = pathValues;
      return 'stay';
    }
    commitPath(pathValues, node);
    activePath.value = pathValues;
    return 'close';
  }

  /** 点击面板某列节点 */
  async function handleOptionClick(
    node: CascaderOption,
    level: number,
  ): Promise<CascaderActionResult> {
    if (node.disabled || isDisabled.value) return 'stay';
    const prefix = activePath.value.slice(0, level);
    const pathValues = [...prefix, node.value];

    if (node.children?.length) {
      if (props.changeOnSelect) commitPath(pathValues, node);
      activePath.value = pathValues;
      return 'stay';
    }
    if (props.loadData && node.isLeaf !== true) {
      return lazyLoad(node, level);
    }
    commitPath(pathValues, node);
    activePath.value = pathValues;
    return 'close';
  }

  /** 点击搜索结果 */
  async function handleSearchPick(
    item: SearchMatch,
  ): Promise<CascaderActionResult> {
    if (item.node.disabled || isDisabled.value) return 'stay';
    const { node, pathValues } = item;
    if (node.children?.length) {
      if (props.changeOnSelect) commitPath(pathValues, node);
      activePath.value = pathValues;
      searchText.value = '';
      return 'stay';
    }
    if (props.loadData && node.isLeaf !== true) {
      // 懒加载：以整条路径为准构造
      const prefix = pathValues.slice(0, -1);
      activePath.value = prefix;
      const res = await lazyLoad(node, pathValues.length - 1);
      searchText.value = '';
      return res;
    }
    commitPath(pathValues, node);
    searchText.value = '';
    return 'close';
  }

  /** 打开下拉时，让面板定位到当前值 */
  function resetPathForOpen() {
    const mv = props.modelValue;
    activePath.value = mv && mv.length ? [...mv] : [];
  }

  /** 清空 */
  function clear() {
    if (isDisabled.value) return;
    emit('update:modelValue', null);
    emit('change', null);
    emit('clear');
    activePath.value = [];
    searchText.value = '';
  }

  /** 外部将 modelValue 清空时重置 drill 路径 */
  watch(
    () => props.modelValue,
    (mv) => {
      if (!mv || !mv.length) activePath.value = [];
    },
  );

  return {
    treeData,
    columns,
    activePath,
    searchText,
    searchResults,
    displayText,
    isDisabled,
    isActiveValue,
    isLoading,
    handleOptionClick,
    handleSearchPick,
    resetPathForOpen,
    clear,
  };
};
