/**
 * 将单个 prop 序列化为 Vue 模板属性文本。
 *
 * @param name prop 名称
 * @param value prop 值
 * @returns 属性文本；值为 undefined / null / false 时返回 null，表示源码中省略该属性
 */
export function formatProp(name: string, value: unknown): string | null {
  if (value === undefined || value === null || value === false) return null;
  if (value === true) return name;
  if (typeof value === 'number') return `:${name}="${value}"`;
  if (typeof value === 'string') return `${name}="${value}"`;
  return `:${name}='${JSON.stringify(value)}'`;
}

/**
 * 生成单个组件实例的模板源码（含 html 围栏，供 DemoBlock 直接渲染）。
 *
 * @param tagName 标签名，如 QButton
 * @param props 当前注入的 props
 * @param text 默认插槽文本
 * @param slots 具名插槽内容
 * @returns 带围栏的 Markdown 代码块
 */
export function generateComponentCode(
  tagName: string,
  props: Record<string, unknown>,
  text = '',
  slots: Record<string, string> = {},
): string {
  const attrs = Object.keys(props)
    .sort()
    .map((name) => formatProp(name, props[name]))
    .filter((attr): attr is string => attr !== null);
  const inlineAttrs = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
  const slotEntries = Object.entries(slots);

  if (slotEntries.length === 0) {
    return `\`\`\`html\n<${tagName}${inlineAttrs}>${text}</${tagName}>\n\`\`\`\n`;
  }

  const lines = slotEntries.map(
    ([name, content]) => `  <template #${name}>${content}</template>`,
  );
  if (text) lines.push(`  ${text}`);
  return `\`\`\`html\n<${tagName}${inlineAttrs}>\n${lines.join('\n')}\n</${tagName}>\n\`\`\`\n`;
}
