export function clipString(text: string, length: number, isElipse: boolean = true) {
    return text.length > length ? text.substring(0, length) + (isElipse ? '...' : '') : text
}