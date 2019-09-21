import RawExpression from "../types/raw-expression";
import SanitizeWorthy from "../types/sanitize-worthy";
import exprToRaw from "./expr-to-raw";

function mixedToRawArray(args: (SanitizeWorthy | RegExp | RawExpression)[]): RawExpression[] {
  const converted: RawExpression[] = [];

  for (const arg of args) {
    converted.push(exprToRaw(arg));
  }

  return converted;
}

export default mixedToRawArray;
