/**
 * types.ts
 * ---------
 * `data/index.json` 的知识条目类型定义。
 */

/** API 表格行：props / exposes 使用名称+类型+描述等；emits / slots 使用各自字段 */
export interface ApiRow {
  name?: string;
  type?: string;
  required?: string;
  default?: string;
  description?: string;
  event?: string;
  payload?: string;
  trigger?: string;
  scope?: string;
  fallback?: string;
  [key: string]: string | undefined;
}

/** 组件 API 四件套（props / emits / slots / exposes） */
export interface ComponentApi {
  props: ApiRow[];
  emits: ApiRow[];
  slots: ApiRow[];
  exposes: ApiRow[];
}

/** 工具类条目提取出的函数列表 */
export interface FunctionInfo {
  name: string;
  signature: string;
}

/** 样式条目中「已废弃但保留兼容」的样式信息（旧变量 / 旧类名 / 旧关键帧） */
export interface DeprecatedStyleInfo {
  /** 每个废弃区块的说明（源 CSS 注释原文，如「向后兼容：旧版圆角类名」） */
  notes: string[];
  /** 废弃但兼容保留的 CSS 变量（--xxx，不含 -- 前缀） */
  variables: string[];
  /** 废弃但兼容保留的工具类名（.xxx，不含 . 前缀） */
  classes: string[];
  /** 废弃但兼容保留的关键帧名称（如旧版 rotate / dash / pulse） */
  keyframes: string[];
}

/** 样式条目（CSS 设计系统）提取出的元信息 */
export interface StyleInfo {
  /** 自定义属性变量名（--q-*），去重、保序 */
  variables: string[];
  /** 工具类名（.xxx），去重、保序 */
  classes: string[];
  /** 已废弃但保留兼容的样式（旧变量 / 旧类名 / 旧关键帧），可选 */
  deprecated?: DeprecatedStyleInfo;
}

/** 条目级废弃标记（组件 / 工具可选）：已废弃但保留兼容 */
export interface EntryDeprecation {
  /** 废弃说明 */
  note?: string;
  /** 推荐替代（新名称 / 新变量 / 新类名） */
  replacement?: string;
}

/** 单个知识条目（组件 / 算法 / 业务工具 / 事件工具 / 通用样式） */
export interface KnowledgeEntry {
  name: string;
  package: string;
  type: string; // component | algorithm | business | componentUtil | event | style
  category: string;
  relPath: string;
  docFile: string;
  title: string;
  description: string;
  headings: string[];
  api?: ComponentApi;
  functions?: FunctionInfo[];
  style?: StyleInfo;
  /** 额外可检索关键词（如 CSS 变量 / 类名），参与全文搜索 */
  keywords?: string[];
  /** 样式条目（CSS 设计系统）的伴随 README.md 文档（同目录，可选），参与全文搜索 */
  styleDoc?: string;
  /** 废弃标记（可选）：该条目（组件 / 工具）已废弃但保留兼容 */
  deprecated?: EntryDeprecation;
  readme: string;
}

/** 条目 → 源码文件（文件名 → 内容） */
export type SourceMap = Record<string, Record<string, string>>;

/** 索引元信息 */
export interface IndexMeta {
  name: string;
  version: string;
  generatedAt: string;
  packages: string[];
  counts: Record<string, number>;
  total: number;
}

/** `data/index.json` 的完整结构 */
export interface KnowledgeIndex {
  meta: IndexMeta;
  entries: KnowledgeEntry[];
  sources: SourceMap;
}

/** 工具类型的合集 */
export type EntryType =
  | 'component'
  | 'algorithm'
  | 'business'
  | 'componentUtil'
  | 'event'
  | 'style';

/** 类型 → 展示用的中文标签 */
export const TYPE_LABELS: Record<EntryType, string> = {
  component: '组件',
  algorithm: '算法工具',
  business: '业务工具',
  componentUtil: '业务工具',
  event: '事件工具',
  style: '通用样式',
};
