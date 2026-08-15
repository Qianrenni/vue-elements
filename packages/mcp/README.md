# @qianrenni/mcp

Knowledge-base MCP server for **qyani-components** & **@qianrenni/core**.

Query component APIs (Props / Emits / Slots / Exposes), algorithm & business utilities, event utilities, and the shared CSS design system (tokens / utilities) over the Model Context Protocol.

## 功能

提供 5 个 MCP tools：

| Tool                | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `search`            | 全文搜索组件 / 工具 / 通用样式，支持按类型、包过滤           |
| `get_doc`           | 获取某条目的完整 README 文档（含 API 表格 / 样式变量清单）   |
| `get_component_api` | 获取组件的 Props / Emits / Slots / Exposes 表格              |
| `get_source`        | 获取条目对应源码文件                                         |
| `list_entries`      | 列出全部条目（组件 / 算法 / 业务工具 / 事件工具 / 通用样式） |

数据来源：`packages/components/src/**`（组件、业务工具、事件工具、`style/**` 通用样式）与 `packages/core/src/**`（算法、业务工具）。

## 快速开始

```bash
# 构建 + 重建知识库索引
pnpm run mcp:update
```

或在本包内：

```bash
pnpm --filter @qianrenni/mcp build        # tsc → dist/
pnpm --filter @qianrenni/mcp build:index  # 扫描源 → data/index.json
pnpm --filter @qianrenni/mcp start        # 启动 stdio server
```

## 通用接入（任意 MCP 客户端）

这是一个 **stdio 类型的 MCP server**，任何支持 stdio 的 MCP 客户端（VS Code、Claude Desktop、Cursor、JetBrains 等）都能以同样的方式接入：在客户端的 MCP server 配置里填 `command` + `args` 即可。

### 方式 A：npx 直接运行（推荐，无需安装）

```json
{
  "servers": {
    "qyani-knowledge": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@qianrenni/mcp"]
    }
  }
}
```

### 方式 B：全局安装后使用 bin 命令

```bash
npm i -g @qianrenni/mcp
# 或 pnpm add -g @qianrenni/mcp
```

```json
{
  "servers": {
    "qyani-knowledge": {
      "type": "stdio",
      "command": "qyani-knowledge-mcp"
    }
  }
}
```

### 方式 C：本地开发（monorepo 内）

```json
{
  "servers": {
    "qyani-knowledge": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/mcp/dist/index.js"]
    }
  }
}
```

### 各客户端配置位置

| 客户端    | 配置文件 / 入口                                              |
| --------- | ------------------------------------------------------------ |
| VS Code   | `.vscode/mcp.json`（本仓库已内置）                           |
| Claude    | `claude_desktop_config.json` → `mcpServers`                  |
| Cursor    | Settings → MCP Servers，或 `.cursor/mcp.json` → `mcpServers` |
| JetBrains | Settings → Tools → MCP Servers                               |

> 无论哪种客户端，stdio server 的配置结构都是 `{ type, command, args }` 三要素，只是放在不同位置。

## 直接作为命令使用

安装后提供 `qyani-knowledge-mcp` 可执行命令：

```bash
qyani-knowledge-mcp          # 启动 stdio server（供 MCP 客户端调用）
```

## 数据同步

`data/index.json` 是生成产物。修改组件 / core / 样式源码或 README 后需重建索引：

- 组件 README / props / 样式改动：`pnpm run docs:update`（自动联动重建）
- core 工具 / utils / events 改动：`pnpm run mcp:update`

> MCP server 启动时一次性读取索引，重建后需重启 server（或 reload VS Code）生效。

## License

ISC
