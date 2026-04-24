export function handleDateFormat(format: string, keyWords: string) {
  const s = new Set(keyWords);
  const p = new Map();
  let temp = '';
  for (const char of format) {
    if (!p.has(char)) {
      temp = `${temp}${char}`;
    }
    if (s.has(char)) {
      p.set(char, (p.get(char) || 0) + 1);
    }
  }
  return { temp, p };
}
export class UseTimeUtils extends Date {
  /**
   * 格式化日期为指定格式的字符串
   * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
   *  - Y：年份（例如：2023）
   *  - M：月份（01-12）
   *  - D：日期（1-31）
   *  - H：小时（0-23）
   *  - h：小时（1-12）
   *  - m：分钟（0-59）
   *  - s：秒（0-59）
   *  - S：毫秒（0-999）
   *  - d：星期几（0-6）
   * @returns 格式化后的日期字符串
   */
  format(
    format: string = 'YYYY-MM-DD HH:mm:ss',
    padChar: string = '0'
  ): string {
    const year = this.getFullYear().toString();
    const month = (this.getMonth() + 1).toString();
    const day = this.getDate().toString();
    const hours = this.getHours().toString();
    const minutes = this.getMinutes().toString();
    const seconds = this.getSeconds().toString();
    const milliseconds = this.getMilliseconds().toString();
    const dayOfWeek = this.getDay().toString();
    const { temp, p } = handleDateFormat(format, 'YMDHmsSd');
    return temp
      .replace('Y', year.padStart(p.get('Y') || 0, padChar))
      .replace('M', month.padStart(p.get('M') || 0, padChar))
      .replace('D', day.padStart(p.get('D') || 0, padChar))
      .replace('H', hours.padStart(p.get('H') || 0, padChar))
      .replace('m', minutes.padStart(p.get('m') || 0, padChar))
      .replace('s', seconds.padStart(p.get('s') || 0, padChar))
      .replace('S', milliseconds.padStart(p.get('S') || 0, padChar))
      .replace('d', dayOfWeek.padStart(p.get('d') || 0, padChar));
  }

  /**
   * 增加时间
   * @param amount 数量
   * @param unit 单位（年、月、日、小时、分钟、秒）
   * @returns 当前实例（支持链式调用）
   */
  add(
    amount: number,
    unit:
      | 'year'
      | 'month'
      | 'day'
      | 'hour'
      | 'minute'
      | 'second'
      | 'millisecond'
  ): this {
    switch (unit) {
      case 'year':
        this.setFullYear(this.getFullYear() + amount);
        break;
      case 'month':
        this.setMonth(this.getMonth() + amount);
        break;
      case 'day':
        this.setDate(this.getDate() + amount);
        break;
      case 'hour':
        this.setHours(this.getHours() + amount);
        break;
      case 'minute':
        this.setMinutes(this.getMinutes() + amount);
        break;
      case 'second':
        this.setSeconds(this.getSeconds() + amount);
        break;
      case 'millisecond':
        this.setMilliseconds(this.getMilliseconds() + amount);
        break;
    }
    return this;
  }

  /**
   * 减少时间
   * @param amount 数量
   * @param unit 单位（年、月、日、小时、分钟、秒）
   * @returns 当前实例（支持链式调用）
   */
  subtract(
    amount: number,
    unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
  ): this {
    return this.add(-amount, unit);
  }

  equals(date: UseTimeUtils): boolean {
    return this.getTime() === date.getTime();
  }
}
