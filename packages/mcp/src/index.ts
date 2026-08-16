#!/usr/bin/env node
/**
 * index.ts
 * --------
 * qyani 知识库 MCP server（stdio）。
 *
 * 数据：`data/index.json`（由 `pnpm run build:index` 生成）。
 * 暴露的 tools：
 *   - search            全文搜索组件 / 工具 / 通用样式
 *   - get_doc           获取某个条目的完整 README 文档
 *   - get_component_api 获取组件的 Props / Emits / Slots / Exposes
 *   - get_source        获取条目对应源码文件
 *   - list_entries      列出所有条目（可按类型 / 包过滤）
 * 暴露的 resources：
 *   - qyani://docs/{name}   该条目的完整文档（markdown）
 *   - qyani://api/{name}    该条目的 API 表格（markdown）
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

import { findEntry, listEntries, loadIndex, searchIndex } from './search.js';
import type { KnowledgeEntry } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VERSION_FILE = join(__dirname, '..', 'package.json');
const VERSION = JSON.parse(readFileSync(VERSION_FILE, 'utf-8'))
  .version as string;

/** 简单的 markdown 表格渲染，便于把 api 数组拼成文本 */
function renderTable(rows: Record<string, string | undefined>[]): string {
  if (rows.length === 0) return '（无）';
  const headers = Object.keys(rows[0]);
  const pad = (s: string, w: number) =>
    s.length >= w ? s : s + ' '.repeat(w - s.length);
  const widths = headers.map((h) =>
    Math.max(h.length, ...rows.map((r) => (r[h] ?? '').length)),
  );
  const sep = headers.map((h, i) => '-'.repeat(widths[i] + 2)).join('|');
  const line = (r: Record<string, string | undefined>) =>
    headers.map((h, i) => ' ' + pad(r[h] ?? '', widths[i]) + ' ').join('|');
  return [
    headers.map((h, i) => ' ' + pad(h, widths[i]) + ' ').join('|'),
    sep,
    ...rows.map(line),
  ].join('\n');
}

/** 把条目渲染成 markdown 文档 */
function renderEntryDoc(entry: KnowledgeEntry): string {
  const lines: string[] = [
    `# ${entry.title}`,
    '',
    `- 包：\`${entry.package}\``,
    `- 类型：\`${entry.type}\``,
    `- 分类：\`${entry.category}\``,
    `- 路径：\`${entry.relPath}\``,
    '',
    entry.description,
    '',
  ];
  if (entry.functions && entry.functions.length > 0) {
    lines.push('## 函数', '');
    for (const f of entry.functions) {
      lines.push(`### \`${f.name}\``, '');
      if (f.signature) lines.push('```ts', f.signature, '```', '');
    }
  }
  if (entry.api) {
    const api = entry.api;
    if (api.props.length > 0) {
      lines.push('## Props', '', renderTable(api.props), '');
    }
    if (api.emits.length > 0) {
      lines.push('## Emits', '', renderTable(api.emits), '');
    }
    if (api.slots.length > 0) {
      lines.push('## Slots', '', renderTable(api.slots), '');
    }
    if (api.exposes.length > 0) {
      lines.push('## Exposes', '', renderTable(api.exposes), '');
    }
  }
  if (entry.style) {
    const s = entry.style;
    lines.push('## CSS 变量', '');
    if (s.variables.length > 0) {
      lines.push(
        '```css',
        s.variables.map((v) => `--${v}`).join(' '),
        '```',
        '',
      );
    } else {
      lines.push('（无自定义变量）', '');
    }
    lines.push('## 工具类', '');
    if (s.classes.length > 0) {
      lines.push('```css', s.classes.map((c) => `.${c}`).join(' '), '```', '');
    } else {
      lines.push('（无工具类）', '');
    }
  }
  if (entry.styleDoc) {
    lines.push('## 设计文档', '', entry.styleDoc, '');
  }
  lines.push('---', '', '## 源码', '', '```css', entry.readme, '```');
  return lines.join('\n');
}

export function createServer() {
  const index = loadIndex();
  const server = new McpServer(
    { name: 'qyani-knowledge', version: VERSION },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    },
  );

  /* ------------------------------ tools ------------------------------ */

  const searchSchema = z.object({
    query: z.string().describe('搜索关键词，如 "按钮"、"二分查找"、"debounce"'),
    type: z
      .enum([
        'component',
        'algorithm',
        'business',
        'componentUtil',
        'event',
        'style',
      ])
      .optional()
      .describe('按类型过滤（可选）'),
    packageName: z
      .string()
      .optional()
      .describe('按包过滤：qyani-components 或 @qianrenni/core（可选）'),
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe('返回条数上限，默认 10'),
  });

  server.registerTool(
    'search',
    {
      title: '搜索 qyani 组件库知识',
      description:
        '在 qyani-components 与 @qianrenni/core 中全文搜索组件、算法、业务工具、事件工具。返回名称、包、类型、分类与描述。',
      inputSchema: searchSchema,
    },
    async (args) => {
      const { query, type, packageName, limit } = args;
      const hits = searchIndex(index, {
        query,
        type,
        packageName,
        limit,
      });
      const text = hits
        .map(
          (h, i) =>
            `${i + 1}. **${h.name}** \`${h.package}/${h.type}/${h.category}\` — ${h.description}`,
        )
        .join('\n');
      return {
        content: [
          {
            type: 'text',
            text: text
              ? `找到 ${hits.length} 条结果：\n${text}`
              : '未找到匹配条目，可尝试其他关键词。',
          },
        ],
      };
    },
  );

  server.registerTool(
    'get_doc',
    {
      title: '获取条目完整文档',
      description:
        '按名称获取某个组件 / 工具的完整 README 文档（含函数签名与 API 表格）。名称可省略 Q 前缀。',
      inputSchema: z.object({
        name: z
          .string()
          .describe('条目名称，如 "Icon"、"useObject"、"useHeap"'),
      }),
    },
    async (args) => {
      const { name } = args;
      const entry = findEntry(index, name);
      if (!entry) return notFound(name);
      return {
        content: [{ type: 'text', text: renderEntryDoc(entry) }],
      };
    },
  );

  server.registerTool(
    'get_component_api',
    {
      title: '获取组件 API',
      description:
        '按名称获取组件的 Props / Emits / Slots / Exposes 表格（来自组件 README）。',
      inputSchema: z.object({
        name: z.string().describe('组件名称，如 "Dialog"、"Tag"'),
      }),
    },
    async (args) => {
      const { name } = args;
      const entry = findEntry(index, name);
      if (!entry) return notFound(name);
      if (!entry.api) {
        return {
          content: [
            { type: 'text', text: `\`${name}\` 不是组件，没有 API 表格。` },
          ],
        };
      }
      const api = entry.api;
      const text = [
        `# ${entry.title} API`,
        '',
        '## Props',
        '',
        renderTable(api.props),
        '',
        '## Emits',
        '',
        renderTable(api.emits),
        '',
        '## Slots',
        '',
        renderTable(api.slots),
        '',
        '## Exposes',
        '',
        renderTable(api.exposes),
      ].join('\n');
      return { content: [{ type: 'text', text }] };
    },
  );

  server.registerTool(
    'get_source',
    {
      title: '获取源码',
      description:
        '按名称获取组件 / 工具对应源码文件内容（组件为 type.ts/composable.ts/index.ts，工具为 {name}.ts）。',
      inputSchema: z.object({
        name: z.string().describe('条目名称'),
        file: z
          .string()
          .optional()
          .describe('可选，指定文件名；缺省时返回全部已收录的源码文件'),
      }),
    },
    async (args) => {
      const { name, file } = args;
      const entry = findEntry(index, name);
      if (!entry) return notFound(name);
      const sources = index.sources[entry.name];
      if (!sources || Object.keys(sources).length === 0) {
        return {
          content: [{ type: 'text', text: `\`${entry.name}\` 没有收录源码。` }],
        };
      }
      if (file) {
        const content = sources[file];
        if (content === undefined) {
          return {
            content: [
              {
                type: 'text',
                text: `未找到文件 \`${file}\`，可选：${Object.keys(sources).join(', ')}`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: `// ${entry.name}/${file}\n\n${content}`,
            },
          ],
        };
      }
      const all = Object.entries(sources)
        .map(([f, c]) => `// ===== ${entry.name}/${f} =====\n\n${c}`)
        .join('\n\n');
      return { content: [{ type: 'text', text: all }] };
    },
  );

  server.registerTool(
    'list_entries',
    {
      title: '列出所有条目',
      description:
        '列出知识库全部条目（组件 / 算法 / 业务工具 / 事件工具 / 通用样式），可按类型或包过滤。',
      inputSchema: z.object({
        type: z
          .enum([
            'component',
            'algorithm',
            'business',
            'componentUtil',
            'event',
            'style',
          ])
          .optional()
          .describe('按类型过滤（可选）'),
        packageName: z.string().optional().describe('按包过滤（可选）'),
      }),
    },
    async (args) => {
      const { type, packageName } = args;
      const entries = listEntries(index, type, packageName);
      const text = entries
        .map(
          (e, i) =>
            `${i + 1}. **${e.name}** \`${e.package}/${e.type}/${e.category}\` — ${e.description}`,
        )
        .join('\n');
      return {
        content: [
          {
            type: 'text',
            text: `共 ${entries.length} 个条目：\n${text}`,
          },
        ],
      };
    },
  );

  /* --------------------------- resources --------------------------- */

  // 每个条目注册一个 docs resource + 一个 api resource
  for (const entry of index.entries) {
    const safe = entry.name;
    server.registerResource(
      `doc-${safe}`,
      `qyani://docs/${safe}`,
      {
        title: `${entry.title} 文档`,
        description: entry.description,
        mimeType: 'text/markdown',
      },
      async () => ({
        contents: [
          {
            uri: `qyani://docs/${safe}`,
            mimeType: 'text/markdown',
            text: renderEntryDoc(entry),
          },
        ],
      }),
    );
    if (entry.api) {
      server.registerResource(
        `api-${safe}`,
        `qyani://api/${safe}`,
        {
          title: `${entry.title} API`,
          description: `${entry.title} 的 Props / Emits / Slots / Exposes`,
          mimeType: 'text/markdown',
        },
        async () => {
          const api = entry.api!;
          const text = [
            `# ${entry.title} API`,
            '',
            '## Props',
            '',
            renderTable(api.props),
            '',
            '## Emits',
            '',
            renderTable(api.emits),
            '',
            '## Slots',
            '',
            renderTable(api.slots),
            '',
            '## Exposes',
            '',
            renderTable(api.exposes),
          ].join('\n');
          return {
            contents: [
              {
                uri: `qyani://api/${safe}`,
                mimeType: 'text/markdown',
                text,
              },
            ],
          };
        },
      );
    }
  }

  return server;
}

function notFound(name: string) {
  return {
    content: [
      {
        type: 'text' as const,
        text: `未找到条目 \`${name}\`。可先调用 list_entries 或 search 查看可用名称。`,
      },
    ],
    isError: true,
  };
}

/* ---------------------------- 入口 ---------------------------- */

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

// 自测模式：启动后立即关闭（供脚本验证 server 可正常构建）
if (process.argv.includes('--selftest')) {
  createServer();
  console.error('[selftest] server created ok');
  process.exit(0);
}

main().catch((err) => {
  console.error('[qyani-knowledge-mcp] 启动失败：', err);
  process.exit(1);
});
