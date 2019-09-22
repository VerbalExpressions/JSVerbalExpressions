import RawExpression from "../types/raw-expression";
import Expression from "../types/expression";
import exprToRaw from "./expr-to-raw";

function mixedToRawArray(args: Expression[]): RawExpression[] {
  const converted: RawExpression[] = [];

  for (const arg of args) {
    converted.push(exprToRaw(arg));
  }

  return converted;
}

export default mixedToRawArray;
