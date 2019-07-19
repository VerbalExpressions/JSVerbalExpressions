import { Expression } from "./types";
import { simplifyExpression } from "./utils";

export function maybe(input: Expression) {
  return `(?:${simplifyExpression(input)})?`;
}
