import { Expression } from "./types";

export function simplifyExpression(expression: Expression): string {
  if (expression instanceof RegExp) {
    return expression.source;
  }
  return expression;
}

export function simplifyAndGroup(expression: Expression) {
  return `(?:${simplifyExpression(expression)})`;
}

export function simpleExp<ExpType extends Expression = Expression>(
  callback: (exp: string) => string
) {
  return (input: ExpType) => callback(simplifyAndGroup(input));
}
