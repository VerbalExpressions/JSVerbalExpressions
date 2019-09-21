import sanitize from "./sanitize";
import Expression from "../types/expression";

export default function simplifyAndGroup(expression: Expression) {
  return `(?:${sanitize(expression)})`;
}
