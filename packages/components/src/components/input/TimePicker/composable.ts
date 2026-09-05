/** 默认格式 */
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
/** 默认占位 */
export const DEFAULT_TIME_PLACEHOLDER = '请选择时间';

/** 补零 */
export function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/** 时间三要素 */
export interface TimeParts {
  hour: number;
  minute: number;
  second: number;
}

/** 是否含秒字段 */
export function formatHasSeconds(format: string): boolean {
  return /ss/.test(format);
}

/**
 * 解析时间字符串为三要素
 * @param value 如 '12:30' / '12:30:45'（含秒与否均可）
 */
export function parseTimeValue(value: string | undefined | null): TimeParts {
  const [h = '0', m = '0', s = '0'] = (value ?? '').split(':');
  return {
    hour: clampNumber(parseInt(h, 10), 0, 23),
    minute: clampNumber(parseInt(m, 10), 0, 59),
    second: clampNumber(parseInt(s, 10), 0, 59),
  };
}

/** 按格式输出时间字符串 */
export function formatTime(parts: TimeParts, format: string): string {
  const map: Record<string, string> = {
    HH: pad2(parts.hour),
    H: String(parts.hour),
    mm: pad2(parts.minute),
    m: String(parts.minute),
    ss: pad2(parts.second),
    s: String(parts.second),
  };
  return format.replace(/HH|H|mm|m|ss|s/g, (token) => map[token] ?? token);
}

/** 构造某单位可选项（按步长） */
export function buildOptions(total: number, step = 1): number[] {
  const safe = Math.max(1, Math.floor(step) || 1);
  const list: number[] = [];
  for (let i = 0; i < total; i += safe) list.push(i);
  return list;
}

function clampNumber(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * 归一化模型值（对齐步长/越界）
 * @param value 原值
 * @param steps 步长配置
 */
export function normalizeTimeValue(
  value: string | undefined | null,
  steps: { hour?: number; minute?: number; second?: number },
): string | undefined {
  if (!value) return value === '' ? '' : undefined;
  const parts = parseTimeValue(value);
  return formatTime(
    {
      hour: parts.hour,
      minute: parts.minute - (parts.minute % (steps.minute ?? 1)),
      second: parts.second - (parts.second % (steps.second ?? 1)),
    },
    DEFAULT_TIME_FORMAT,
  );
}
