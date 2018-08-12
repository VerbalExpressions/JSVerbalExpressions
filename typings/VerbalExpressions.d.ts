// Type definitions for JSVerbalExpressions
// Project: https://github.com/VerbalExpressions/JSVerbalExpressions
// Definitions by: Mihai Ionut Vilcu <https://github.com/ionutvmi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

type RegExpFlags = "g" | "i" | "m" | "u" | "y";

interface VerbalExpression extends RegExp {
    sanitize(value: string): VerbalExpression;
    add(value: string): VerbalExpression;
    startOfLine(enable?: boolean): VerbalExpression;
    endOfLine(enable?: boolean): VerbalExpression;
    then(value: string): VerbalExpression;
    find(value: string): VerbalExpression;
    maybe(value: string): VerbalExpression;
    anything(): VerbalExpression;
    anythingBut(value: string): VerbalExpression;
    something(): VerbalExpression;
    somethingBut(value: string): VerbalExpression;
    replace(source: string, value: string): string;
    lineBreak(): VerbalExpression;
    br(): VerbalExpression;
    tab(): VerbalExpression;
    word(): VerbalExpression;
    digit(): VerbalExpression;
    whitespace(): VerbalExpression;
    anyOf(value: string): VerbalExpression;
    any(value: string): VerbalExpression;
    range(): VerbalExpression;
    addModifier(modifier: RegExpFlags): VerbalExpression;
    removeModifier(modifier: RegExpFlags): VerbalExpression;
    withAnyCase(enable?: boolean): VerbalExpression;
    stopAtFirst(enable?: boolean): VerbalExpression;
    searchOneLine(enable?: boolean): VerbalExpression;
    repeatPrevious(): VerbalExpression;
    oneOrMore(): VerbalExpression;
    multiple(value: string, lower?: number, upper?: number): VerbalExpression;
    or(value: string): VerbalExpression;
    beginCapture(): VerbalExpression;
    endCapture(): VerbalExpression;
    toRegExp(): RegExp;
}

interface VerbalExpressionConstructor {
    new(): VerbalExpression;
    (): VerbalExpression;
    prototype: VerbalExpression;
}

declare var VerEx: VerbalExpressionConstructor;

