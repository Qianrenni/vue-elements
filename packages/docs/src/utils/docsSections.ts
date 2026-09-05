import { docsEntries, type DocsEntry } from '@/utils/useComponentInfo';

/**
 * 文档站顶层栏目（对齐 antd / vuejs 站点：顶栏分栏目、侧栏随栏目切换）
 * - 数据源完全来自 docsEntries.category[0]（组件/工具/设计系统等顶层已天然区分）
 */
export interface DocsSectionMeta {
  /** category 顶层原始 key */
  key: string;
  /** 展示名（简短） */
  label: string;
  /** 侧栏标题 */
  treeTitle: string;
  order: number;
}

/** 顶栏栏目顺序与展示名；未命中的顶层 key 走兜底 */
const SECTION_META: Record<string, Omit<DocsSectionMeta, 'order'>> = {
  'Vue Components': {
    key: 'Vue Components',
    label: '组件',
    treeTitle: '组件目录',
  },
  'Browser Utilities': {
    key: 'Browser Utilities',
    label: '工具 / API',
    treeTitle: '工具与事件',
  },
  Core: {
    key: 'Core',
    label: 'Core',
    treeTitle: 'Core 算法 / 工具',
  },
  'Design System': {
    key: 'Design System',
    label: '设计系统',
    treeTitle: '设计系统',
  },
};

/** 顶栏栏目显式顺序（组件在前） */
const KNOWN_ORDER = [
  'Vue Components',
  'Browser Utilities',
  'Core',
  'Design System',
];

/** 顶层栏目集合（去重、保序：已知顺序在前，未知按字典序补后） */
export const docsSections: DocsSectionMeta[] = (() => {
  const keys = [...new Set(docsEntries.map((e) => e.category[0]))];
  const ordered = KNOWN_ORDER.filter((k) => keys.includes(k));
  const rest = keys.filter((k) => !KNOWN_ORDER.includes(k)).sort();
  return [...ordered, ...rest].map((key, i) => {
    const meta = SECTION_META[key];
    return meta
      ? { ...meta, order: i }
      : { key, label: key, treeTitle: key, order: i };
  });
})();

/** 某栏目下的全部条目 */
export const entriesOfSection = (key: string): DocsEntry[] =>
  docsEntries.filter((e) => e.category[0] === key);

/** 条目所属顶层栏目 */
export const sectionOfEntry = (entry: DocsEntry | null): string =>
  entry?.category[0] ?? '';

/** 侧栏子分组显示名（把目录代码映射成 antd 风格中文分类；未知保留原文） */
const GROUP_LABELS: Record<string, string> = {
  basic: '通用',
  display: '数据展示',
  form: '表单',
  input: '数据录入',
  layout: '布局',
  loading: '加载',
  navigation: '导航',
  theme: '主题',
  Utilities: '工具',
  business: '业务',
  Events: '事件',
  algorithm: '算法',
  componentUtil: '组件工具',
};

export const groupLabel = (raw: string): string => GROUP_LABELS[raw] ?? raw;

export const sectionLabel = (key: string): string => {
  const meta = SECTION_META[key];
  return meta?.label ?? key;
};
