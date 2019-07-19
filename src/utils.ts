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

export function simpleExp(callback: (exp: string) => string) {
  return (input: Expression) => callback(simplifyAndGroup(input));
}
