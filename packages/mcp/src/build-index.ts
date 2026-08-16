#!/usr/bin/env node
/**
 * build-index.ts
 * --------------
 * 扫描 `qyani-components`（packages/components）与 `@qianrenni/core`（packages/core）
 * 两个包，把每个组件 / 工具 / 事件单元解析成结构化知识条目，输出到
 * `packages/mcp/data/index.json`，供 MCP 服务端在内存中快速查询。
 *
 * 用法：
 *   pnpm --filter @qianrenni/mcp run build:index
 *   （等价于：node packages/mcp/dist/build-index.js）
 *
 * 输出保持确定性（按 package/type/name 排序），可重复生成。
 *
 * 注意：README 为 CRLF 换行，解析时必须使用 /\r?\n/ 切分，否则行尾 \r
 *       会导致标题 / 表格正则全部失配。
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import type {
  ApiRow,
  ComponentApi,
  KnowledgeEntry,
  KnowledgeIndex,
} from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..', '..');
const OUT_FILE = join(__dirname, '..', 'data', 'index.json');

const COMPONENTS_SRC = join(REPO_ROOT, 'packages', 'components', 'src');
const CORE_SRC = join(REPO_ROOT, 'packages', 'core', 'src');
const STYLE_SRC = join(COMPONENTS_SRC, 'style');

/* ------------------------------------------------------------------ *
 *  小工具
 * ------------------------------------------------------------------ */

const toPosix = (p: string): string => p.split(sep).join(posix.sep);

/** 递归收集某目录下所有文件（相对路径），按路径排序保证确定性 */
function listFiles(dir: string, base: string = dir): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...listFiles(full, base));
    } else {
      out.push(toPosix(relative(base, full)));
    }
  }
  return out.sort();
}

/** 递归收集目录下所有 README.md 的绝对路径 */
function findReadmes(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...findReadmes(full));
    } else if (name === 'README.md') {
      out.push(full);
    }
  }
  return out.sort();
}

/** 去掉 markdown 代码块，便于抽取纯文本描述 */
function stripCodeBlocks(text: string): string {
  return text.replace(/```[\s\S]*?```/g, ' ');
}

/** 取第一段纯文本（连续非空行），去掉列表/强调标记并截断 */
function firstParagraph(text: string): string {
  const clean = stripCodeBlocks(text)
    .split(/\r?\n/)
    .map((l) => l.replace(/^[>\-#*_`]+\s*/, '').trim())
    .filter(Boolean);
  if (clean.length === 0) return '';
  const para = clean[0].replace(/\s+/g, ' ').trim();
  return para.length > 200 ? `${para.slice(0, 200)}…` : para;
}

/** 解析 markdown 表格（返回对象数组；列名取表头） */
function parseTable(lines: string[]): Record<string, string>[] {
  const rows = lines
    .map((l) => l.trim())
    .filter((l) => l.startsWith('|') && l.endsWith('|'));
  if (rows.length < 2) return [];
  const cells = rows.map((r) =>
    r
      .replace(/^\s*\|/, '')
      .replace(/\|\s*$/, '')
      .split('|')
      .map((c) => c.trim()),
  );
  const [header, ...rest] = cells;
  const data = rest.filter(
    (r) => !r.every((c) => /^:?-{2,}:?$/.test(c) || c === ''),
  );
  return data.map((r) => {
    const obj: Record<string, string> = {};
    header.forEach((h, i) => {
      obj[h || `col${i}`] = r[i] !== undefined ? r[i] : '';
    });
    return obj;
  });
}

/** 把一行表格中的 `code` 反引号去掉 */
const deTick = (v: unknown): string =>
  typeof v === 'string' ? v.replace(/`/g, '') : '';

/* ------------------------------------------------------------------ *
 *  README 结构解析
 * ------------------------------------------------------------------ */

interface Section {
  level: number;
  text: string;
  body: string[];
}

/** 按 # 标题切成段落块（兼容 CRLF） */
function splitSections(md: string): Section[] {
  const sections: Section[] = [];
  const lines = md.split(/\r?\n/);
  let current: Section | null = null;
  for (const line of lines) {
    const m = /^(#{1,3})\s+(.*)$/.exec(line);
    if (m) {
      if (current) sections.push(current);
      current = { level: m[1].length, text: m[2].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

/** 读取某一小节 body 中的第一个表格 */
function firstTable(body: string[]): Record<string, string>[] {
  return parseTable(body);
}

/** 判断小节是否为 API 区块（props/emits/slots/exposes，任意层级标题） */
const API_SECTION_RE = /^(props|emits|slots|exposes)$/i;
function apiKeyFromSection(text: string): keyof ComponentApi | null {
  const m = API_SECTION_RE.exec(text.trim());
  return m ? (m[1].toLowerCase() as keyof ComponentApi) : null;
}

/**
 * 从一个组件内容块中提取 API（props/emits/slots/exposes）。
 * 兼容普通组件（## Props）与 animations 共享 README（### Props）。
 */
function extractComponentApi(content: string): ComponentApi {
  const sections = splitSections(content);
  const api: ComponentApi = { props: [], emits: [], slots: [], exposes: [] };
  for (const s of sections) {
    const key = apiKeyFromSection(s.text);
    if (!key) continue;
    const body = s.body.join('\n');
    if (/^无\s*。?\s*$/m.test(body) || body.trim() === '') {
      api[key] = [];
      continue;
    }
    const table = firstTable(s.body);
    api[key] = normalizeApiTable(key, table);
  }
  return api;
}

/** 把通用表格映射成结构化字段 */
function normalizeApiTable(
  key: keyof ComponentApi,
  table: Record<string, string>[],
): ApiRow[] {
  switch (key) {
    case 'props':
      return table.map((r) => ({
        name: deTick(r['名称'] ?? ''),
        type: deTick(r['类型'] ?? ''),
        required: deTick(r['必填'] ?? ''),
        default: deTick(r['默认值'] ?? ''),
        description: deTick(r['说明'] ?? ''),
      }));
    case 'emits':
      return table.map((r) => ({
        event: deTick(r['事件'] ?? ''),
        payload: deTick(r['载荷类型'] ?? ''),
        trigger: deTick(r['触发时机'] ?? ''),
      }));
    case 'slots':
      return table.map((r) => ({
        name: deTick(r['名称'] ?? ''),
        scope: deTick(r['作用域参数'] ?? ''),
        fallback: deTick(r['后备内容'] ?? ''),
      }));
    case 'exposes':
      return table.map((r) => ({
        name: deTick(r['名称'] ?? ''),
        type: deTick(r['类型'] ?? ''),
        description: deTick(r['说明'] ?? ''),
      }));
    default:
      return table;
  }
}

/** 提取 utils 的功能条目（## 级小节 + 签名代码块） */
function extractFunctions(
  content: string,
): { name: string; signature: string }[] {
  return splitSections(content)
    .filter((s) => s.level === 2)
    .map((s) => {
      const sig = /```(?:typescript|ts)?\s*\n([\s\S]*?)\n```/.exec(
        s.body.join('\n'),
      );
      return {
        name: s.text.replace(/`/g, ''),
        signature: sig ? sig[1].trim() : '',
      };
    })
    .filter(
      (f) =>
        f.name &&
        !/^(用途|基本用法|参数|返回|行为说明|throws|职责)$/i.test(f.name),
    );
}

/** 提取描述：优先取「用途」小节，否则取标题后第一段 */
function extractDescription(content: string, sections: Section[]): string {
  const usage = sections
    .filter((s) => /^用途$/.test(s.text))
    .sort((a, b) => a.level - b.level)[0];
  if (usage) {
    const d = firstParagraph(usage.body.join('\n'));
    if (d) return d;
  }
  return firstParagraph(content);
}

/** 把共享 README（含多个 ## QXxx 组件小节）拆成多条目 */
function splitSharedReadme(
  md: string,
): { name: string; content: string }[] | null {
  const sections = splitSections(md);
  const compSections = sections.filter(
    (s) => s.level === 2 && /^Q[A-Za-z0-9]+$/.test(s.text),
  );
  if (compSections.length === 0) return null;
  return compSections.map((s, i) => {
    const next = compSections[i + 1];
    const endIdx = next ? sections.indexOf(next) : sections.length;
    const blockSections = sections.slice(sections.indexOf(s), endIdx);
    return {
      name: s.text,
      content: blockSections
        .map(
          (b) =>
            '#' + '#'.repeat(b.level) + ' ' + b.text + '\n' + b.body.join('\n'),
        )
        .join('\n'),
    };
  });
}

/* ------------------------------------------------------------------ *
 *  条目构建
 * ------------------------------------------------------------------ */

/** 内联源码：组件取 type.ts/composable.ts/index.ts；工具取 {name}.ts */
function collectSources(
  pkgRoot: string,
  relDir: string,
  name: string,
  isComponent: boolean,
): Record<string, string> {
  const sources: Record<string, string> = {};
  const rel = toPosix(relDir);
  const candidates = isComponent
    ? ['type.ts', 'composable.ts', 'index.ts']
    : [`${name}.ts`];
  for (const file of candidates) {
    const p = join(pkgRoot, rel, file);
    if (existsSync(p)) {
      sources[file] = readFileSync(p, 'utf-8');
    }
  }
  return sources;
}

const entries: KnowledgeEntry[] = [];
const sources: KnowledgeIndex['sources'] = {};

interface ComponentArgs {
  name: string;
  content: string;
  relDir: string;
  category: string;
  pkgRoot: string;
  pkgName: string;
}

/** 普通组件（单 README → 单条目） */
function addComponent(
  readmePath: string,
  pkgRoot: string,
  pkgName: string,
): void {
  const relDir = toPosix(relative(pkgRoot, dirname(readmePath)));
  const name = relDir.split('/').pop() ?? '';
  const category = relDir.split('/')[1] ?? '';
  const md = readFileSync(readmePath, 'utf-8');

  // 共享 README（多组件）拆分
  const shared = splitSharedReadme(md);
  if (shared) {
    for (const part of shared) {
      pushComponentEntry({
        name: part.name,
        content: part.content,
        relDir,
        category,
        pkgRoot,
        pkgName,
      });
    }
    return;
  }
  pushComponentEntry({ name, content: md, relDir, category, pkgRoot, pkgName });
}

/** 组件名统一 Q 前缀（QIcon、QAvatar…），与 AGENTS.md / 文档站点命名一致 */
function qName(name: string): string {
  return /^Q[A-Z]/.test(name) ? name : `Q${name}`;
}

function pushComponentEntry({
  name: rawName,
  content,
  relDir,
  category,
  pkgRoot,
  pkgName,
}: ComponentArgs): void {
  const name = qName(rawName);
  const sections = splitSections(content);
  const api = extractComponentApi(content);
  const entry: KnowledgeEntry = {
    name,
    package: pkgName,
    type: 'component',
    category,
    relPath: `src/${relDir}`,
    docFile: 'README.md',
    title: name,
    description: extractDescription(content, sections),
    headings: sections.map((s) => s.text),
    api,
    readme: content,
  };
  entries.push(entry);
  sources[name] = collectSources(pkgRoot, relDir, name, true);
}

/** 通用工具 / 事件（README → 单条目） */
function addUtil(
  readmePath: string,
  pkgRoot: string,
  pkgName: string,
  type: KnowledgeEntry['type'],
): void {
  const relDir = toPosix(relative(pkgRoot, dirname(readmePath)));
  const name = relDir.split('/').pop() ?? '';
  const category =
    type === 'event' ? 'events' : (relDir.split('/')[0] ?? 'business');
  const md = readFileSync(readmePath, 'utf-8');
  const sections = splitSections(md);
  const entry: KnowledgeEntry = {
    name,
    package: pkgName,
    type,
    category,
    relPath: `src/${relDir}`,
    docFile: 'README.md',
    title: name,
    description: extractDescription(md, sections),
    headings: sections.map((s) => s.text),
    functions: extractFunctions(md),
    readme: md,
  };
  entries.push(entry);
  sources[name] = collectSources(pkgRoot, relDir, name, false);
}

/* ------------------------------------------------------------------ *
 *  通用样式（CSS 设计系统）
 * ------------------------------------------------------------------ */

/** 提取 CSS 文件头部注释块作为描述 */
function extractCssHeaderComment(css: string): string {
  const m = /^\/\*[\s\S]*?\*\//.exec(css.trimStart());
  if (!m) return '';
  return m[0]
    .replace(/^\/\*/, '')
    .replace(/\*\/$/, '')
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .slice(0, 6)
    .join(' ');
}

/** 去掉注释后再提取 CSS 自定义属性（--q-*），避免抓到注释里的占位符 */
function extractCssVariables(css: string): string[] {
  const set = new Set<string>();
  const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of code.matchAll(/--[a-zA-Z][\w-]*/g)) {
    // 排除以 - 结尾的占位符（如注释中的 --q-color-）
    if (m[0].endsWith('-')) continue;
    set.add(m[0]);
  }
  return [...set];
}

/** 去掉注释后提取 CSS 类名（.xxx，排除伪类/值前缀） */
function extractCssClasses(css: string): string[] {
  const set = new Set<string>();
  const code = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of code.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
    // 跳过 color 值里的小数点（如 .5rem）与 @media 等
    const prev = code.slice(Math.max(0, (m.index ?? 0) - 1), m.index ?? 0);
    if (/[\d]/.test(prev)) continue;
    // 排除样式值里的百分比/浮点（如 0.5rem、.foo 中的 .5）
    if (/^\d/.test(m[1])) continue;
    set.add(m[1]);
  }
  return [...set];
}

/** 通用样式（CSS 设计系统 → 单条目），name 用相对 style 的路径 */
function addStyle(cssPath: string, pkgRoot: string, pkgName: string): void {
  const relFile = toPosix(relative(pkgRoot, cssPath));
  const relToStyle = toPosix(relative(STYLE_SRC, cssPath));
  // name = 相对 style 的路径（如 tokens/color、base/reset）
  const name = relToStyle.replace(/\.css$/, '');
  const css = readFileSync(cssPath, 'utf-8');
  const variables = extractCssVariables(css);
  const classes = extractCssClasses(css);
  const description = extractCssHeaderComment(css);
  // 伴随 README.md（同目录，如 style/theme/README.md）→ 纳入可检索文档
  const styleDocPath = join(dirname(cssPath), 'README.md');
  const styleDoc = existsSync(styleDocPath)
    ? readFileSync(styleDocPath, 'utf-8')
    : undefined;
  const entry: KnowledgeEntry = {
    name,
    package: pkgName,
    type: 'style',
    category: relToStyle.split('/')[0] ?? 'style',
    relPath: `src/${relFile}`,
    docFile: relFile.split('/').pop() ?? '',
    title: relFile.split('/').pop() ?? '',
    description,
    headings: [],
    style: { variables, classes },
    keywords: [...variables, ...classes],
    styleDoc,
    readme: css,
  };
  entries.push(entry);
  sources[name] = { [relFile.split('/').pop() ?? 'style.css']: css };
}

/* ----------------------- 扫描三个来源 ----------------------- */

// 1) qyani-components 组件
for (const readme of findReadmes(join(COMPONENTS_SRC, 'components'))) {
  addComponent(readme, COMPONENTS_SRC, 'qyani-components');
}

// 2) @qianrenni/core 算法
for (const readme of findReadmes(join(CORE_SRC, 'algorithm'))) {
  addUtil(readme, CORE_SRC, '@qianrenni/core', 'algorithm');
}

// 3) @qianrenni/core 业务工具
for (const readme of findReadmes(join(CORE_SRC, 'business'))) {
  addUtil(readme, CORE_SRC, '@qianrenni/core', 'business');
}

// 4) qyani-components 业务工具
for (const readme of findReadmes(join(COMPONENTS_SRC, 'utils'))) {
  addUtil(readme, COMPONENTS_SRC, 'qyani-components', 'componentUtil');
}

// 5) qyani-components 事件工具
for (const readme of findReadmes(join(COMPONENTS_SRC, 'events'))) {
  addUtil(readme, COMPONENTS_SRC, 'qyani-components', 'event');
}

// 6) qyani-components 通用样式（CSS 设计系统）
for (const file of listFiles(STYLE_SRC).filter((f) => f.endsWith('.css'))) {
  addStyle(join(STYLE_SRC, file), COMPONENTS_SRC, 'qyani-components');
}

/* ----------------------- 排序 & 输出 ----------------------- */

entries.sort((a, b) =>
  `${a.package}|${a.type}|${a.name}`.localeCompare(
    `${b.package}|${b.type}|${b.name}`,
  ),
);

const counts: Record<string, number> = {};
for (const e of entries) {
  const key = `${e.package}/${e.type}`;
  counts[key] = (counts[key] || 0) + 1;
}

const index: KnowledgeIndex = {
  meta: {
    name: 'qyani-components knowledge base',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    packages: ['qyani-components', '@qianrenni/core'],
    counts,
    total: entries.length,
  },
  entries,
  sources,
};

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(index, null, 2), 'utf-8');

console.log(
  `[build-index] 已生成 ${OUT_FILE}\n` +
    `  共 ${entries.length} 个条目：` +
    Object.entries(counts)
      .map(([k, v]) => `${k}=${v}`)
      .join(', '),
);
