// ========================
// 全局性能优化工具：避免重复创建
// ========================

/**
 * 预生成 00-99 的补零字符串数组，实现 O(1) 查找
 * 例如：_padd[5] = "05", _padd[12] = "12"
 */
export const _padd: string[] = Array.from({length: 100}, (_, i) => (i < 10 ? '0' + i : '' + i));

/**
 * 全局缓存 Intl.DateTimeFormat 实例（避免高成本重复创建）
 * 多个类（UseTimeUtils / UTCTimeUtils）共享同一缓存
 */
const _formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * 获取缓存的 Intl.DateTimeFormat 实例
 * @param locales 语言环境，如 'zh-CN', 'en-US'
 * @param options Intl.DateTimeFormatOptions 配置项
 * @returns Intl.DateTimeFormat 实例
 */
function _getFormatter(locales: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
    const key = `${locales}|${JSON.stringify(options)}`;
    if (!_formatterCache.has(key)) {
        _formatterCache.set(key, new Intl.DateTimeFormat(locales, options));
    }
    return _formatterCache.get(key)!;
}

// ========================
// 主类：UseTimeUtils
// ========================

export class UseTimeUtils {
    private date: Date;
    private readonly locale: string;

    /**
     * 构造函数：初始化时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，默认语言为'zh-CN'
     * @throws 如果输入无效，抛出错误
     */
    constructor(
        input?: Date | number | string | null,
        locale: string = 'zh-CN' // 默认语言
    ) {
        let parsed: Date;

        if (input === null || input === undefined) {
            parsed = new Date();
        } else if (input instanceof Date) {
            parsed = new Date(input.getTime()); // 避免引用污染
        } else if (typeof input === 'number') {
            parsed = new Date(input);
        } else {
            parsed = new Date(input);
        }

        if (isNaN(parsed.getTime())) {
            throw new Error('Invalid date string or timestamp');
        }

        this.date = parsed;
        this.locale = locale;
    }

    // ========================
    // 工厂方法
    // ========================

    /**
     * 获取当前时间的TimeUtils实例
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static now(locale?: string): UseTimeUtils {
        return new UseTimeUtils(undefined, locale);
    }

    /**
     * 从输入创建TimeUtils实例
     * @param input 输入（Date、时间戳、日期字符串）
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static from(input: Date | number | string, locale?: string): UseTimeUtils {
        return new UseTimeUtils(input, locale);
    }

    /**
     * 创建UTC时间工具类实例
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，指定本地化语言
     * @returns UTCTimeUtils实例
     */
    static utc(input?: Date | number | string, locale?: string): UTCTimeUtils {
        return new UTCTimeUtils(input, locale);
    }

    // ========================
    /**
     * 格式化日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        const d = this.date;
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();
        const milliseconds = d.getMilliseconds();
        const dayOfWeek = d.getDay();

        return format
            .replace('YYYY', year.toString())
            .replace('MM', _padd[month])
            .replace('DD', _padd[day])
            .replace('HH', _padd[hours])
            .replace('mm', _padd[minutes])
            .replace('ss', _padd[seconds])
            .replace('SSS', milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : '' + milliseconds)
            .replace('ddd', dayOfWeek.toString());
    }

    /**
     * 根据本地化设置格式化日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format: string = 'PPP p', locales?: string): string {
        const usedLocales = locales || this.locale;

        // 预定义格式映射（可扩展）
        const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
            'PPPP': {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'},
            'PPP': {year: 'numeric', month: 'long', day: 'numeric'},
            'PP': {year: 'numeric', month: 'short', day: 'numeric'},
            'pp': {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
            'PPP p': {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            }
        };

        const options = optionsMap[format];
        if (options) {
            const formatter = _getFormatter(usedLocales, options);
            return formatter.format(this.date);
        }

        return this.customFormatLocale(format, usedLocales);
    }

    // ========================
    // 基本获取（本地时间）
    // ========================

    /** 获取年份 */
    year(): number {
        return this.date.getFullYear();
    }

    /** 获取月份（1-12） */
    month(): number {
        return this.date.getMonth() + 1;
    }

    /** 获取日期（1-31） */
    dateNum(): number {
        return this.date.getDate();
    }

    /** 获取小时（0-23） */
    hour(): number {
        return this.date.getHours();
    }

    /** 获取分钟（0-59） */
    minute(): number {
        return this.date.getMinutes();
    }

    /** 获取秒数（0-59） */
    second(): number {
        return this.date.getSeconds();
    }

    /** 获取毫秒数（0-999） */
    millisecond(): number {
        return this.date.getMilliseconds();
    }

    /** 获取星期几（0-6，0表示星期日） */
    day(): number {
        return this.date.getDay();
    }

    // ========================
    // UTC 支持
    // ========================

    /**
     * 转换为UTC时间工具类
     * @returns UTCTimeUtils实例
     */
    toUTC(): UTCTimeUtils {
        return new UTCTimeUtils(this.date, this.locale);
    }

    // ========================
    // 加减时间
    // ========================

    /**
     * 增加时间
     * @param amount 数量
     * @param unit 单位（年、月、日、小时、分钟、秒）
     * @returns 当前实例（支持链式调用）
     */
    add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this {
        const d = this.date;
        switch (unit) {
            case 'year':
                d.setFullYear(d.getFullYear() + amount);
                break;
            case 'month':
                d.setMonth(d.getMonth() + amount);
                break;
            case 'day':
                d.setDate(d.getDate() + amount);
                break;
            case 'hour':
                d.setHours(d.getHours() + amount);
                break;
            case 'minute':
                d.setMinutes(d.getMinutes() + amount);
                break;
            case 'second':
                d.setSeconds(d.getSeconds() + amount);
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
    subtract(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this {
        return this.add(-amount, unit);
    }

    // ========================
    // 其他方法
    // ========================

    /** 转换为Date对象 */
    toDate(): Date {
        return new Date(this.date);
    }

    /** 转换为时间戳 */
    valueOf(): number {
        return this.date.getTime();
    }

    /** 转换为默认格式的字符串 */
    toString(): string {
        return this.format();
    }

    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale(format: string, locales: string): string {
        const d = this.date;

        const weekday = _getFormatter(locales, {weekday: 'long'}).format(d);
        const weekdayShort = _getFormatter(locales, {weekday: 'short'}).format(d);
        const monthLong = _getFormatter(locales, {month: 'long'}).format(d);
        const monthShort = _getFormatter(locales, {month: 'short'}).format(d);

        return format
            .replace(/{weekday:long}/g, weekday)
            .replace(/{weekday:short}/g, weekdayShort)
            .replace(/{month:long}/g, monthLong)
            .replace(/{month:short}/g, monthShort)
            .replace(/{YYYY}/g, d.getFullYear().toString())
            .replace(/{MM}/g, _padd[d.getMonth() + 1])
            .replace(/{DD}/g, _padd[d.getDate()])
            .replace(/{HH}/g, _padd[d.getHours()])
            .replace(/{mm}/g, _padd[d.getMinutes()])
            .replace(/{ss}/g, _padd[d.getSeconds()]);
    }
}

// ========================
// UTC 时间包装器
// ========================
class UTCTimeUtils {
    private date: Date;
    private readonly locale: string;

    /**
     * 构造函数：初始化UTC时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @throws 如果输入无效，抛出错误
     */
    constructor(input?: Date | number | string | null, locale: string = 'en-US') {
        let parsed: Date;

        if (input === null || input === undefined) {
            parsed = new Date();
        } else if (input instanceof Date) {
            parsed = new Date(Date.UTC(
                input.getUTCFullYear(),
                input.getUTCMonth(),
                input.getUTCDate(),
                input.getUTCHours(),
                input.getUTCMinutes(),
                input.getUTCSeconds(),
                input.getUTCMilliseconds()
            ));
        } else if (typeof input === 'number') {
            parsed = new Date(input);
        } else {
            const d = new Date(input);
            if (isNaN(d.getTime())) throw new Error('Invalid date');
            parsed = new Date(Date.UTC(
                d.getUTCFullYear(),
                d.getUTCMonth(),
                d.getUTCDate(),
                d.getUTCHours(),
                d.getUTCMinutes(),
                d.getUTCSeconds(),
                d.getUTCMilliseconds()
            ));
        }

        if (isNaN(parsed.getTime())) {
            throw new Error('Invalid date');
        }

        this.date = parsed;
        this.locale = locale;
    }

    /**
     * 格式化UTC日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        const d = this.date;
        return format
            .replace('YYYY', d.getUTCFullYear().toString())
            .replace('MM', _padd[d.getUTCMonth() + 1])
            .replace('DD', _padd[d.getUTCDate()])
            .replace('HH', _padd[d.getUTCHours()])
            .replace('mm', _padd[d.getUTCMinutes()])
            .replace('ss', _padd[d.getUTCSeconds()])
            .replace('SSS', d.getUTCMilliseconds() < 10 ? '00' + d.getUTCMilliseconds() :
                d.getUTCMilliseconds() < 100 ? '0' + d.getUTCMilliseconds() : '' + d.getUTCMilliseconds())
            .replace('ddd', d.getUTCDay().toString());
    }

    /**
     * 根据本地化设置格式化UTC日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format: string = 'PPP p', locales?: string): string {
        const usedLocales = locales || this.locale;

        const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
            'PPPP': {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'},
            'PPP': {year: 'numeric', month: 'long', day: 'numeric'},
            'PP': {year: 'numeric', month: 'short', day: 'numeric'},
            'pp': {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false},
            'PPP p': {
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', hour12: false
            }
        };

        const options = optionsMap[format];
        if (options) {
            const formatter = _getFormatter(usedLocales, options);
            // 转为本地等效时间（用于正确显示 UTC 时间）
            const utcTime = new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60000);
            return formatter.format(utcTime);
        }

        return this.customFormatLocale(format, usedLocales);
    }

    // 基本 UTC 获取
    /** 获取UTC年份 */
    year(): number {
        return this.date.getUTCFullYear();
    }

    /** 获取UTC月份（1-12） */
    month(): number {
        return this.date.getUTCMonth() + 1;
    }

    /** 获取UTC日期（1-31） */
    dateNum(): number {
        return this.date.getUTCDate();
    }

    /** 获取UTC小时（0-23） */
    hour(): number {
        return this.date.getUTCHours();
    }

    /** 获取UTC分钟（0-59） */
    minute(): number {
        return this.date.getUTCMinutes();
    }

    /** 获取UTC秒数（0-59） */
    second(): number {
        return this.date.getUTCSeconds();
    }

    /** 获取UTC毫秒数（0-999） */
    millisecond(): number {
        return this.date.getUTCMilliseconds();
    }

    /** 获取UTC星期几（0-6，0表示星期日） */
    day(): number {
        return this.date.getUTCDay();
    }

    /** 转换为Date对象 */
    toDate(): Date {
        return new Date(this.date);
    }

    /** 转换为时间戳 */
    valueOf(): number {
        return this.date.getTime();
    }

    /** 转换为默认格式的字符串 */
    toString(): string {
        return this.format();
    }

    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale(format: string, locales: string): string {
        const d = this.date;
        const utcTime = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

        const weekday = _getFormatter(locales, {weekday: 'long'}).format(utcTime);
        const weekdayShort = _getFormatter(locales, {weekday: 'short'}).format(utcTime);
        const monthLong = _getFormatter(locales, {month: 'long'}).format(utcTime);
        const monthShort = _getFormatter(locales, {month: 'short'}).format(utcTime);

        return format
            .replace(/{weekday:long}/g, weekday)
            .replace(/{weekday:short}/g, weekdayShort)
            .replace(/{month:long}/g, monthLong)
            .replace(/{month:short}/g, monthShort)
            .replace(/{YYYY}/g, d.getUTCFullYear().toString())
            .replace(/{MM}/g, _padd[d.getUTCMonth() + 1])
            .replace(/{DD}/g, _padd[d.getUTCDate()])
            .replace(/{HH}/g, _padd[d.getUTCHours()])
            .replace(/{mm}/g, _padd[d.getUTCMinutes()])
            .replace(/{ss}/g, _padd[d.getUTCSeconds()]);
    }
}

// ========================
// 使用示例（保持不变）
// ========================

// 本地时间 - 中文
// const cn = UseTimeUtils.now('zh-CN');
// console.log(cn.formatLocale('PPP')); // 2025年4月5日
// console.log(cn.formatLocale('PP'));  // 2025年4月5日
// console.log(cn.formatLocale('{weekday:long}, {month:long} {DD}, {YYYY}', 'zh-CN')); // 星期六, 四月 05, 2025
//
// // 英文
// const en = UseTimeUtils.now('en-US');
// console.log(en.formatLocale('PPP')); // April 5, 2025
// console.log(en.formatLocale('PPP p')); // April 5, 2025, 14:30
// console.log(en.formatLocale('PPPP')); // Saturday, April 5, 2025
//
// // UTC 时间
// const utc = UseTimeUtils.utc('2023-01-01T00:00:00Z');
// console.log(utc.format()); // 2023-01-01 00:00:00
// console.log(utc.formatLocale('PPP', 'zh-CN')); // 2023年1月1日
//
// // 自定义格式
// console.log(cn.formatLocale('{YYYY}年{MM}月{DD}日 {weekday:short}')); // 2025年04月05日 周六