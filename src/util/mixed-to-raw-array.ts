import Expression from "../types/expression";
import RawExpression from "../types/raw-expression";
import exprToRaw from "./expr-to-raw";

function mixedToRawArray(expressions: Expression[]): RawExpression[] {
  const converted: RawExpression[] = [];

  for (const arg of expressions) {
    converted.push(exprToRaw(arg));
  }

  return converted;
}

export default mixedToRawArray;
