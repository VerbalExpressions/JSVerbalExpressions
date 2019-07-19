import { Expression } from "./types";

export function simplifyExpression(expression: Expression): string {
  if (expression instanceof RegExp) {
    return expression.source;
  }
  return expression;
}
