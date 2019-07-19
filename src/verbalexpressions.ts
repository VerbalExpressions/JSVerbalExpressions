import { Expression } from "./types";
import { sanitize } from "./utils";

export function simplifyExpression(expression: Expression): string {
  if (expression instanceof RegExp) {
    return expression.source;
  }

  return sanitize(expression.toString());
}

function VerEx(...args: Expression[]): RegExp {
  return new RegExp(compile(...args));
}

export function compile(...args: Expression[]): string {
  return args.map(simplifyExpression).join("");
}

export default VerEx;
