/**
 * search.ts
 * ---------
 * 加载 `data/index.json` 并提供内存查询：全文搜索 / 按名取条目 / API / 源码。
 * 数据在进程启动时一次性读入，查询纯内存、无 IO，保证快速。
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { KnowledgeEntry, KnowledgeIndex } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX_FILE = join(__dirname, '..', 'data', 'index.json');

/** 加载并解析知识库索引（进程内缓存一份） */
export function loadIndex(): KnowledgeIndex {
  return JSON.parse(readFileSync(INDEX_FILE, 'utf-8')) as KnowledgeIndex;
}

/** 把某条目的可检索文本拼成一个字符串 */
function searchableText(entry: KnowledgeEntry): string {
  const parts = [
    entry.name,
    entry.title,
    entry.description,
    entry.category,
    entry.package,
    ...entry.headings,
  ];
  if (entry.functions) {
    for (const f of entry.functions) {
      parts.push(f.name, f.signature);
    }
  }
  if (entry.keywords) {
    parts.push(...entry.keywords);
  }
  if (entry.styleDoc) {
    parts.push(entry.styleDoc);
  }
  return parts.join(' ').toLowerCase();
}

/** 简易评分：命中 name 权重最高，其次 title/description/keywords，其余最低 */
function score(entry: KnowledgeEntry, tokens: string[]): number {
  const name = entry.name.toLowerCase();
  const title = entry.title.toLowerCase();
  const desc = entry.description.toLowerCase();
  let s = 0;
  for (const t of tokens) {
    if (name.includes(t)) s += 5;
    else if (title.includes(t)) s += 3;
    else if (desc.includes(t)) s += 1;
    else if (entry.keywords?.some((k) => k.toLowerCase().includes(t))) {
      s += 2;
    }
  }
  return s;
}

export interface SearchParams {
  query: string;
  type?: string;
  packageName?: string;
  limit?: number;
}

export interface SearchHit {
  name: string;
  package: string;
  type: string;
  category: string;
  description: string;
  title: string;
}

/** 全文搜索，返回按评分降序的条目摘要 */
export function searchIndex(
  index: KnowledgeIndex,
  { query, type, packageName, limit = 10 }: SearchParams,
): SearchHit[] {
  const tokens = query
    .toLowerCase()
    .split(/[\s,，、/]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const candidates = index.entries.filter((e) => {
    if (type && e.type !== type) return false;
    if (packageName && e.package !== packageName) return false;
    return true;
  });

  if (tokens.length === 0) {
    // 空查询：直接按名称排序返回（全量浏览）
    return candidates
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, limit)
      .map(toHit);
  }

  const textCache = new Map<string, string>();
  return candidates
    .map((e) => {
      let text = textCache.get(e.name);
      if (text === undefined) {
        text = searchableText(e);
        textCache.set(e.name, text);
      }
      const hitCount = tokens.filter((t) => text.includes(t)).length;
      return { entry: e, hitCount, score: score(e, tokens) };
    })
    .filter((r) => r.hitCount > 0)
    .sort((a, b) => b.score - a.score || b.hitCount - a.hitCount)
    .slice(0, limit)
    .map((r) => toHit(r.entry));
}

function toHit(e: KnowledgeEntry): SearchHit {
  return {
    name: e.name,
    package: e.package,
    type: e.type,
    category: e.category,
    description: e.description,
    title: e.title,
  };
}

/** 按精确名称取条目（支持省略 Q 前缀的模糊匹配） */
export function findEntry(
  index: KnowledgeIndex,
  name: string,
): KnowledgeEntry | undefined {
  const n = name.trim();
  return (
    index.entries.find((e) => e.name === n) ??
    index.entries.find((e) => e.name === `Q${n.replace(/^Q/, '')}`) ??
    index.entries.find(
      (e) => e.name.toLowerCase() === n.replace(/^Q/, '').toLowerCase(),
    )
  );
}

/** 按名称 + 类型（可选）筛选条目 */
export function listEntries(
  index: KnowledgeIndex,
  type?: string,
  packageName?: string,
): KnowledgeEntry[] {
  return index.entries.filter((e) => {
    if (type && e.type !== type) return false;
    if (packageName && e.package !== packageName) return false;
    return true;
  });
}
