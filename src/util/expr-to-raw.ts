import RawExpression from "../types/raw-expression";
import SanitizeWorthy from "../types/sanitize-worthy";
import sanitize from "./sanitize";

function exprToRaw(arg: SanitizeWorthy | RegExp | RawExpression): RawExpression {
  if (arg instanceof RawExpression) {
    return arg;
  } else if (arg instanceof RegExp) {
    return new RawExpression(arg);
  } else {
    return new RawExpression(sanitize(arg));
  }
}

export default exprToRaw;
