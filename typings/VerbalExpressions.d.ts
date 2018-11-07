// Type definitions for JSVerbalExpressions
// Project: https://github.com/VerbalExpressions/JSVerbalExpressions
// Definitions by: Mihai Ionut Vilcu <https://github.com/ionutvmi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type RegExpFlags = "g" | "i" | "m" | "u" | "y";
type Appendable = VerbalExpression | RegExp | string | number;

interface VerbalExpression extends RegExp {
    sanitize(value: Appendable): VerbalExpression;
    add(value: string | number): VerbalExpression;
    startOfLine(enable = true): VerbalExpression;
    endOfLine(enable = true): VerbalExpression;
    then(value: Appendable): VerbalExpression;
    find(value: Appendable): VerbalExpression;
    maybe(value: Appendable): VerbalExpression;
    or(value: Appendable): VerbalExpression;
    anything(): VerbalExpression;
    anythingBut(value: Appendable | string[]): VerbalExpression;
    something(): VerbalExpression;
    somethingBut(value: Appendable | string[]): VerbalExpression;
    anyOf(value: Appendable | string[]): VerbalExpression;
    any(value: Appendable | string[]): VerbalExpression;
    not(value: Appendable): VerbalExpression;
    range(): VerbalExpression;
    lineBreak(): VerbalExpression;
    br(): VerbalExpression;
    tab(): VerbalExpression;
    word(): VerbalExpression;
    digit(): VerbalExpression;
    whitespace(): VerbalExpression;
    addModifier(modifier: RegExpFlags): VerbalExpression;
    removeModifier(modifier: RegExpFlags): VerbalExpression;
    withAnyCase(enable = true): VerbalExpression;
    stopAtFirst(enable = true): VerbalExpression;
    searchOneLine(enable = true): VerbalExpression;
    repeatPrevious(min: number, max: number): VerbalExpression;
    repeatPrevious(count: number): VerbalExpression;
    oneOrMore(): VerbalExpression;
    multiple(value: string, lower: number, upper?: number): VerbalExpression;
    multiple(value: string): VerbalExpression;
    multiple(): VerbalExpression;
    beginCapture(): VerbalExpression;
    endCapture(): VerbalExpression;
    replace(source: string, value: string): string;
    toRegExp(): RegExp;
}

interface VerbalExpressionConstructor {
    new(): VerbalExpression;
    (): VerbalExpression;
    prototype: VerbalExpression;
}

declare var VerEx: VerbalExpressionConstructor;
export = VerEx;

