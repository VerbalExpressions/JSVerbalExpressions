// Type definitions for JSVerbalExpressions
// Project: https://github.com/VerbalExpressions/JSVerbalExpressions
// Definitions by: Mihai Ionut Vilcu <https://github.com/ionutvmi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type RegExpFlags = "g" | "i" | "m" | "u" | "y";

interface VerbalExpression extends RegExp {
    /** Sanitation function for adding anything safely to the expression */
    sanitize(value: string): VerbalExpression;
    /** Append literal expression to the object. Also refreshes the expression. */
    add(value: string): VerbalExpression;
    /** Mark the expression to end at the last character of the line. */
    startOfLine(enable?: boolean): VerbalExpression;
    /** Mark the expression to start at the beginning of the line. */
    endOfLine(enable?: boolean): VerbalExpression;
    /** Add a string to the expression */
    then(value: string): VerbalExpression;
    /** Add a string to the expression. Alias for then() */
    find(value: string): VerbalExpression;
    /** Add a string to the expression that might appear once (or not). */
    maybe(value: string): VerbalExpression;
    anything(): VerbalExpression;
    anythingBut(value: string): VerbalExpression;
    something(): VerbalExpression;
    somethingBut(value: string): VerbalExpression;
    replace(source: string, value: string): string;
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
    /** Match any of the provided values */
    anyOf(value: string): VerbalExpression;
    /** Match any of the provided values. Alias for anyOf() */
    any(value: string): VerbalExpression;
    /** Add expression to match a range (or multiply ranges) */
    range(): VerbalExpression;
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
    repeatPrevious(): VerbalExpression;
    oneOrMore(): VerbalExpression;
    multiple(value: string): VerbalExpression;
    /** Add a alternative expression to be matched. */
    or(value: string): VerbalExpression;
    /** Starts a capturing group */
    beginCapture(): VerbalExpression;
    /** Emds a capturing group */
    endCapture(): VerbalExpression;
    /** Converts the verbal expression to a RegExp object */
    toRegExp(): RegExp;
}

interface VerbalExpressionConstructor {
    new(): VerbalExpression;
    (): VerbalExpression;
    prototype: VerbalExpression;
}

declare var VerEx: VerbalExpressionConstructor;

