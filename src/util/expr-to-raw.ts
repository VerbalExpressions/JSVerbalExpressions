import RawExpression from "../types/raw-expression";
import Expression from "../types/expression";
import sanitize from "./sanitize";

function exprToRaw(arg: Expression): RawExpression {
  if (arg instanceof RawExpression) {
    return arg;
  } else if (arg instanceof RegExp) {
    return new RawExpression(arg);
  } else {
    return new RawExpression(sanitize(arg));
  }
}

export default exprToRaw;
