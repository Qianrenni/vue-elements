export declare class TimeUtils {
    private date;
    private locale;
    /**
     * 构造函数：初始化时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，默认语言为'zh-CN'
     * @throws 如果输入无效，抛出错误
     */
    constructor(input?: Date | number | string | null, locale?: string);
    /**
     * 格式化日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format?: string): string;
    /**
     * 根据本地化设置格式化日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format?: string, locales?: string): string;
    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale;
    /**
     * 补零函数
     * @param n 数字
     * @returns 补零后的字符串
     */
    private pad;
    /** 获取年份 */
    year(): number;
    /** 获取月份（1-12） */
    month(): number;
    /** 获取日期（1-31） */
    dateNum(): number;
    /** 获取小时（0-23） */
    hour(): number;
    /** 获取分钟（0-59） */
    minute(): number;
    /** 获取秒数（0-59） */
    second(): number;
    /** 获取毫秒数（0-999） */
    millisecond(): number;
    /** 获取星期几（0-6，0表示星期日） */
    day(): number;
    /**
     * 转换为UTC时间工具类
     * @returns UTCTimeUtils实例
     */
    toUTC(): UTCTimeUtils;
    /**
     * 增加时间
     * @param amount 数量
     * @param unit 单位（年、月、日、小时、分钟、秒）
     * @returns 当前实例（支持链式调用）
     */
    add(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this;
    /**
     * 减少时间
     * @param amount 数量
     * @param unit 单位（年、月、日、小时、分钟、秒）
     * @returns 当前实例（支持链式调用）
     */
    subtract(amount: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'): this;
    /** 转换为Date对象 */
    toDate(): Date;
    /** 转换为时间戳 */
    valueOf(): number;
    /** 转换为默认格式的字符串 */
    toString(): string;
    /**
     * 获取当前时间的TimeUtils实例
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static now(locale?: string): TimeUtils;
    /**
     * 从输入创建TimeUtils实例
     * @param input 输入（Date、时间戳、日期字符串）
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns TimeUtils实例
     */
    static from(input: Date | number | string, locale?: string): TimeUtils;
    /**
     * 创建UTC时间工具类实例
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，指定本地化语言
     * @returns UTCTimeUtils实例
     */
    static utc(input?: Date | number | string, locale?: string): UTCTimeUtils;
}
declare class UTCTimeUtils {
    private date;
    private locale;
    /**
     * 构造函数：初始化UTC时间工具类
     * @param input 可选参数，可以是Date、数字（时间戳）、字符串（日期字符串）或null/undefined
     * @param locale 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @throws 如果输入无效，抛出错误
     */
    constructor(input?: Date | number | string | null, locale?: string);
    /**
     * 格式化UTC日期为指定格式的字符串
     * @param format 日期格式，默认为'YYYY-MM-DD HH:mm:ss'
     * @returns 格式化后的日期字符串
     */
    format(format?: string): string;
    /**
     * 根据本地化设置格式化UTC日期
     * @param format 格式字符串，默认为'PPP p'
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 本地化后的日期字符串
     */
    formatLocale(format?: string, locales?: string): string;
    /**
     * 自定义国际化格式（实验性）
     * @param format 自定义格式字符串，例如`{YYYY}年{MM}月{DD}日 {weekday:long}`
     * @param locales 可选参数，指定本地化语言，例如：'zh-CN'（中文）、'en-US'（英文）、'ja-JP'（日文）、'fr-FR'（法文）
     * @returns 自定义格式化后的日期字符串
     */
    private customFormatLocale;
    /**
     * 补零函数
     * @param n 数字
     * @returns 补零后的字符串
     */
    private pad;
    /** 获取UTC年份 */
    year(): number;
    /** 获取UTC月份（1-12） */
    month(): number;
    /** 获取UTC日期（1-31） */
    dateNum(): number;
    /** 获取UTC小时（0-23） */
    hour(): number;
    /** 获取UTC分钟（0-59） */
    minute(): number;
    /** 获取UTC秒数（0-59） */
    second(): number;
    /** 获取UTC毫秒数（0-999） */
    millisecond(): number;
    /** 获取UTC星期几（0-6，0表示星期日） */
    day(): number;
    /** 转换为Date对象 */
    toDate(): Date;
    /** 转换为时间戳 */
    valueOf(): number;
    /** 转换为默认格式的字符串 */
    toString(): string;
}
export {};
