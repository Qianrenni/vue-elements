/** 星期表头 */
export const WEEK_HEADERS = ['日', '一', '二', '三', '四', '五', '六'];

/** 某月的天数 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** 构造某月的 6x7 网格（含前后月补位） */
export function monthMatrix(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const lead = first.getDay();
  const cells: Date[] = [];
  const start = new Date(year, month, 1 - lead);
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  return cells;
}

/** 年月标题 */
export function monthTitle(year: number, month: number): string {
  return `${year} 年 ${month + 1} 月`;
}

/** 日期是否同一天 */
export function isSameDay(
  a: Date | null | undefined,
  b: Date | null | undefined,
): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** 所在月份内是否一致 */
export function inMonth(date: Date, year: number, month: number): boolean {
  return date.getFullYear() === year && date.getMonth() === month;
}
