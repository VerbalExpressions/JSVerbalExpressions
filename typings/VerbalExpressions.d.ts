// Type definitions for JSVerbalExpressions
// Project: https://github.com/VerbalExpressions/JSVerbalExpressions
// Definitions by: Mihai Ionut Vilcu <https://github.com/ionutvmi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type RegExpFlags = "g" | "i" | "m" | "u" | "y";
type Appendable = VerbalExpression | RegExp | string | number;

interface VerbalExpression extends RegExp {
    // Utility //
    /** Sanitation function for adding anything safely to the expression */
    sanitize(value: Appendable): VerbalExpression;
    /** Append literal expression to the object. Also refreshes the expression. */
    add(value: string | number): VerbalExpression;

    // Rules //
    /** Mark the expression to end at the last character of the line. */
    startOfLine(enable?: boolean): VerbalExpression;
    /** Mark the expression to start at the beginning of the line. */
    endOfLine(enable?: boolean): VerbalExpression;
    /** Add a string to the expression */
    then(value: Appendable): VerbalExpression;
    /** Add a string to the expression. Alias for then() */
    find(value: Appendable): VerbalExpression;
    /** Add a string to the expression that might appear once (or not). */
    maybe(value: Appendable): VerbalExpression;
    /** Add a alternative expression to be matched. */
    or(value?: Appendable): VerbalExpression;
    /** Match any character(s) any (including zero) number of times. */
    anything(): VerbalExpression;
    anythingBut(value: Appendable | string[]): VerbalExpression;
    /** Match any character(s) at least once. */
    something(): VerbalExpression;
    somethingBut(value: Appendable | string[]): VerbalExpression;
    /** Match any of the provided values */
    anyOf(value: Appendable | string[]): VerbalExpression;
    /** Match any of the provided values. Alias for anyOf() */
    any(value: Appendable | string[]): VerbalExpression;
    /** Ensure that the parameter does not follow. */
    not(value: Appendable): VerbalExpression;
    /** Add expression to match a range (or multiply ranges) */
    range(...values: string[]): VerbalExpression;

    // Special Characters
    /** Add universal line break expression */
    lineBreak(): VerbalExpression;
    /** Add universal line break expression. Alias for lineBreak() */
    br(): VerbalExpression;
    /** Add expression to match a tab character */
    tab(): VerbalExpression;
    /** Add expression to match a word */
    word(): VerbalExpression;
    /** Add expression to match a digit */
    digit(): VerbalExpression;
    /** Add expression to match a whitespace character */
    whitespace(): VerbalExpression;

    // Modifiers //
    /** Adds a modifier to the expression. */
    addModifier(modifier: RegExpFlags): VerbalExpression;
    /** Removes a modifier to the expression. */
    removeModifier(modifier: RegExpFlags): VerbalExpression;
    /** Makes the expression case insensitive */
    withAnyCase(enable?: boolean): VerbalExpression;
    /** Removes the 'g' modifier. */
    stopAtFirst(enable?: boolean): VerbalExpression;
    /** Removes the 'm' modifier. */
    searchOneLine(enable?: boolean): VerbalExpression;

    // Loops //
    /** Repeat the previous item between mix and max (inclusive) times. */
    repeatPrevious(min: number, max: number): VerbalExpression;
    /** Repeat the previous item exactly count times. */
    repeatPrevious(count: number): VerbalExpression;
    /** Match the previous stuff one or more times. */
    oneOrMore(): VerbalExpression;
    /** Match something greater than or equal to min number of times. Or of upper is set. Match something between min and max (inclusive) number of times. */
    multiple(value: string, lower: number, upper?: number): VerbalExpression;
    /** Match something zero or more times. */
    multiple(value: string): VerbalExpression;
    /** Match the previous group any number of times. */
    multiple(): VerbalExpression;
    /** Starts a capturing group */
    beginCapture(): VerbalExpression;
    /** Emds a capturing group */
    endCapture(): VerbalExpression;

    // Miscellaneous
    replace(source: string, value: string): string;
    /** Converts the verbal expression to a RegExp object */
    toRegExp(): RegExp;
}

interface VerbalExpressionConstructor {
    new(): VerbalExpression;
    (): VerbalExpression;
    prototype: VerbalExpression;
}

declare var VerEx: VerbalExpressionConstructor;
export = VerEx;
