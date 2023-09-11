export default class StringUtil {
    private constructor() {}

    public static isNullOrWhitespace(value: string): boolean {
        return value == null || (/^\s*$/).test(value);
    }
}