import type { QMentionsOption } from './type';

/** 匹配到的 @ 片段 */
export interface MentionsTrigger {
  /** 片段起点（不含前缀） */
  start: number;
  /** 片段终点 */
  end: number;
  /** 查询词 */
  query: string;
}

/** 是否命中 @ 触发的词尾 */
export function findTriggerAtEnd(
  value: string,
  prefix = '@',
): MentionsTrigger | null {
  let i = value.length - 1;
  while (i >= 0 && /[\w\u4e00-\u9fa5-]/.test(value[i])) i -= 1;
  const start = i + 1;
  if (start <= 0 || value[start - 1] !== prefix) return null;
  const query = value.slice(start);
  return { start, end: value.length, query };
}

/** 过滤候选 */
export function filterMentions(
  options: QMentionsOption[],
  query: string,
): QMentionsOption[] {
  if (!query) return options;
  const q = query.toLowerCase();
  return options.filter((opt) => {
    const source = `${opt.label ?? ''}${opt.value}`.toLowerCase();
    return source.includes(q);
  });
}

/** 选中候选后替换 @query 为 @value  */
export function replaceTrigger(
  value: string,
  trigger: MentionsTrigger,
  choice: string,
): string {
  return `${value.slice(0, trigger.start - 1)}@${choice} ${value.slice(trigger.end)}`;
}

/** 候选项展示文本 */
export function optionLabel(opt: QMentionsOption): string {
  return opt.label ?? opt.value;
}
