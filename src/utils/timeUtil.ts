export class TimeUtils {
    private date: Date;
    private locale: string;

    /**
     * 构造函数：初始化时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，默认语言为'en-US'
     * @throws 如果输入无效，抛出错误
     */
    constructor(
        input?: Date | number | string | null,
        locale: string = 'en-US' // 默认语言
    ) {
        if (input === null || input === undefined) {
            this.date = new Date();
        } else if (input instanceof Date) {
            this.date = new Date(input);
        } else if (typeof input === 'number') {
            this.date = new Date(input);
        } else {
            this.date = new Date(input);
        }

        if (isNaN(this.date.getTime())) {
            throw new Error('Invalid date string or timestamp');
        }

        this.locale = locale;
    }

    // ========================
    // 格式化（本地时间）
    // ========================
    /**
     * 格式化日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        const pad = (n: number): string => n.toString().padStart(2, '0');
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const day = this.date.getDate();
        const hours = this.date.getHours();
        const minutes = this.date.getMinutes();
        const seconds = this.date.getSeconds();
        const milliseconds = this.date.getMilliseconds();
        const dayOfWeek = this.date.getDay();

        return format
            .replace(/YYYY/g, year.toString())
            .replace(/MM/g, pad(month))
            .replace(/DD/g, pad(day))
            .replace(/HH/g, pad(hours))
            .replace(/mm/g, pad(minutes))
            .replace(/ss/g, pad(seconds))
            .replace(/SSS/g, pad(milliseconds).padStart(3, '0'))
            .replace(/ddd/g, dayOfWeek.toString());
    }

    // ========================
    // 国际化格式化（支持本地化名称）
    // ========================
    /**
     * 根据本地化设置格式化日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format: string = 'PPP p', locales?: string): string {
        const usedLocales = locales || this.locale;
        const options: Intl.DateTimeFormatOptions = {};

        // 简单映射常见格式（可扩展）
        switch (format) {
            case 'PPPP':
                // "2025年4月5日 星期五" 或 "Friday, April 5, 2025"
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                options.weekday = 'long';
                break;
            case 'PPP':
                // "2025年4月5日" 或 "April 5, 2025"
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                break;
            case 'PP':
                // "Apr 5, 2025"
                options.year = 'numeric';
                options.month = 'short';
                options.day = 'numeric';
                break;
            case 'pp':
                // "14:30:25"
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
                options.hour12 = false;
                break;
            case 'PPP p':
                // "April 5, 2025, 14:30"
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.hour12 = false;
                break;
            default:
                // 自定义格式支持 {month:long}, {weekday:short} 等
                return this.customFormatLocale(format, usedLocales);
        }

        return new Intl.DateTimeFormat(usedLocales, options).format(this.date);
    }

    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale(format: string, locales: string): string {
        const weekday = new Intl.DateTimeFormat(locales, { weekday: 'long' }).format(this.date);
        const weekdayShort = new Intl.DateTimeFormat(locales, { weekday: 'short' }).format(this.date);
        const monthLong = new Intl.DateTimeFormat(locales, { month: 'long' }).format(this.date);
        const monthShort = new Intl.DateTimeFormat(locales, { month: 'short' }).format(this.date);

        return format
            .replace(/{weekday:long}/g, weekday)
            .replace(/{weekday:short}/g, weekdayShort)
            .replace(/{month:long}/g, monthLong)
            .replace(/{month:short}/g, monthShort)
            .replace(/{YYYY}/g, this.date.getFullYear().toString())
            .replace(/{MM}/g, this.pad(this.date.getMonth() + 1))
            .replace(/{DD}/g, this.pad(this.date.getDate()))
            .replace(/{HH}/g, this.pad(this.date.getHours()))
            .replace(/{mm}/g, this.pad(this.date.getMinutes()))
            .replace(/{ss}/g, this.pad(this.date.getSeconds()));
    }

    /**
     * 补零函数
     * @param n 数字
     * @returns 补零后的字符串
     */
    private pad(n: number): string {
        return n.toString().padStart(2, '0');
    }

    // ========================
    // 基本获取（本地时间）
    // ========================
    /** 获取年份 */
    year(): number { return this.date.getFullYear(); }
    /** 获取月份（1-12） */
    month(): number { return this.date.getMonth() + 1; }
    /** 获取日期（1-31） */
    dateNum(): number { return this.date.getDate(); }
    /** 获取小时（0-23） */
    hour(): number { return this.date.getHours(); }
    /** 获取分钟（0-59） */
    minute(): number { return this.date.getMinutes(); }
    /** 获取秒数（0-59） */
    second(): number { return this.date.getSeconds(); }
    /** 获取毫秒数（0-999） */
    millisecond(): number { return this.date.getMilliseconds(); }
    /** 获取星期几（0-6，0表示星期日） */
    day(): number { return this.date.getDay(); }

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
        switch (unit) {
            case 'year':
                this.date.setFullYear(this.date.getFullYear() + amount);
                break;
            case 'month':
                this.date.setMonth(this.date.getMonth() + amount);
                break;
            case 'day':
                this.date.setDate(this.date.getDate() + amount);
                break;
            case 'hour':
                this.date.setHours(this.date.getHours() + amount);
                break;
            case 'minute':
                this.date.setMinutes(this.date.getMinutes() + amount);
                break;
            case 'second':
                this.date.setSeconds(this.date.getSeconds() + amount);
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
    toDate(): Date { return new Date(this.date); }
    /** 转换为时间戳 */
    valueOf(): number { return this.date.getTime(); }
    /** 转换为默认格式的字符串 */
    toString(): string { return this.format(); }

    // ========================
    // 静态工厂
    // ========================
    /**
     * 获取当前时间的TimeUtils实例
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static now(locale?: string): TimeUtils {
        return new TimeUtils(undefined, locale);
    }

    /**
     * 从输入创建TimeUtils实例
     * @param input 输入（Date、时间戳、日期字符串）
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static from(input: Date | number | string, locale?: string): TimeUtils {
        return new TimeUtils(input, locale);
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
}

// ========================
// UTC 时间包装器
// ========================
class UTCTimeUtils {
    private date: Date;
    private locale: string;

    /**
     * 构造函数：初始化UTC时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @throws 如果输入无效，抛出错误
     */
    constructor(input?: Date | number | string | null, locale: string = 'en-US') {
        if (input === null || input === undefined) {
            this.date = new Date();
        } else if (input instanceof Date) {
            this.date = new Date(Date.UTC(
                input.getUTCFullYear(),
                input.getUTCMonth(),
                input.getUTCDate(),
                input.getUTCHours(),
                input.getUTCMinutes(),
                input.getUTCSeconds(),
                input.getUTCMilliseconds()
            ));
        } else if (typeof input === 'number') {
            this.date = new Date(input);
        } else {
            {
                const d = new Date(input);
                this.date = new Date(Date.UTC(
                    d.getUTCFullYear(),
                    d.getUTCMonth(),
                    d.getUTCDate(),
                    d.getUTCHours(),
                    d.getUTCMinutes(),
                    d.getUTCSeconds(),
                    d.getUTCMilliseconds()
                ));
            }
        }

        if (isNaN(this.date.getTime())) {
            throw new Error('Invalid date');
        }

        this.locale = locale;
    }

    /**
     * 格式化UTC日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return format
            .replace(/YYYY/g, this.date.getUTCFullYear().toString())
            .replace(/MM/g, pad(this.date.getUTCMonth() + 1))
            .replace(/DD/g, pad(this.date.getUTCDate()))
            .replace(/HH/g, pad(this.date.getUTCHours()))
            .replace(/mm/g, pad(this.date.getUTCMinutes()))
            .replace(/ss/g, pad(this.date.getUTCSeconds()))
            .replace(/SSS/g, pad(this.date.getUTCMilliseconds()).padStart(3, '0'))
            .replace(/ddd/g, this.date.getUTCDay().toString());
    }

    /**
     * 根据本地化设置格式化UTC日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format: string = 'PPP p', locales?: string): string {
        const usedLocales = locales || this.locale;
        const options: Intl.DateTimeFormatOptions = {};

        switch (format) {
            case 'PPPP':
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                options.weekday = 'long';
                break;
            case 'PPP':
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                break;
            case 'PP':
                options.year = 'numeric';
                options.month = 'short';
                options.day = 'numeric';
                break;
            case 'pp':
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
                options.hour12 = false;
                break;
            case 'PPP p':
                options.year = 'numeric';
                options.month = 'long';
                options.day = 'numeric';
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.hour12 = false;
                break;
            default:
                return this.customFormatLocale(format, usedLocales);
        }

        // 使用 UTC 时间进行格式化
        const utcDate = new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60000);
        return new Intl.DateTimeFormat(usedLocales, options).format(utcDate);
    }

    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale(format: string, locales: string): string {
        const utcDate = new Date(this.date.getTime() + this.date.getTimezoneOffset() * 60000);
        const weekday = new Intl.DateTimeFormat(locales, { weekday: 'long' }).format(utcDate);
        const weekdayShort = new Intl.DateTimeFormat(locales, { weekday: 'short' }).format(utcDate);
        const monthLong = new Intl.DateTimeFormat(locales, { month: 'long' }).format(utcDate);
        const monthShort = new Intl.DateTimeFormat(locales, { month: 'short' }).format(utcDate);

        return format
            .replace(/{weekday:long}/g, weekday)
            .replace(/{weekday:short}/g, weekdayShort)
            .replace(/{month:long}/g, monthLong)
            .replace(/{month:short}/g, monthShort)
            .replace(/{YYYY}/g, this.date.getUTCFullYear().toString())
            .replace(/{MM}/g, this.pad(this.date.getUTCMonth() + 1))
            .replace(/{DD}/g, this.pad(this.date.getUTCDate()))
            .replace(/{HH}/g, this.pad(this.date.getUTCHours()))
            .replace(/{mm}/g, this.pad(this.date.getUTCMinutes()))
            .replace(/{ss}/g, this.pad(this.date.getUTCSeconds()));
    }

    /**
     * 补零函数
     * @param n 数字
     * @returns 补零后的字符串
     */
    private pad(n: number): string {
        return n.toString().padStart(2, '0');
    }

    // 基本 UTC 获取
    /** 获取UTC年份 */
    year(): number { return this.date.getUTCFullYear(); }
    /** 获取UTC月份（1-12） */
    month(): number { return this.date.getUTCMonth() + 1; }
    /** 获取UTC日期（1-31） */
    dateNum(): number { return this.date.getUTCDate(); }
    /** 获取UTC小时（0-23） */
    hour(): number { return this.date.getUTCHours(); }
    /** 获取UTC分钟（0-59） */
    minute(): number { return this.date.getUTCMinutes(); }
    /** 获取UTC秒数（0-59） */
    second(): number { return this.date.getUTCSeconds(); }
    /** 获取UTC毫秒数（0-999） */
    millisecond(): number { return this.date.getUTCMilliseconds(); }
    /** 获取UTC星期几（0-6，0表示星期日） */
    day(): number { return this.date.getUTCDay(); }

    /** 转换为Date对象 */
    toDate(): Date { return new Date(this.date); }
    /** 转换为时间戳 */
    valueOf(): number { return this.date.getTime(); }
    /** 转换为默认格式的字符串 */
    toString(): string { return this.format(); }
}
//
// // 本地时间 - 中文
// const cn = TimeUtils.now('zh-CN');
// console.log(cn.formatLocale('PPP')); // 2025年4月5日
// console.log(cn.formatLocale('PP'));  // 2025年4月5日
// console.log(cn.formatLocale('{weekday:long}, {month:long} {DD}, {YYYY}', 'zh-CN')); // 星期六, 四月 05, 2025
//
// // 英文
// const en = TimeUtils.now('zh-CN');
// console.log(en.formatLocale('PPP')); // April 5, 2025
// console.log(en.formatLocale('PPP p')); // April 5, 2025, 14:30
// console.log(en.formatLocale('PPPP'))
//
// // UTC 时间
// const utc = TimeUtils.utc('2023-01-01T00:00:00Z');
// console.log(utc.format()); // 2023-01-01 00:00:00 (UTC)
// console.log(utc.formatLocale('PPP', 'zh-CN')); // 2023年1月1日 (UTC)
//
// // 自定义格式
// console.log(cn.formatLocale('{YYYY}年{MM}月{DD}日 {weekday:short}')); // 2025年04月05日 周六
