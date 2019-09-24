import Expression from "../types/expression";
import RawExpression from "../types/raw-expression";
import sanitize from "./sanitize";

function exprToRaw(expression: Expression): RawExpression {
  if (expression instanceof RawExpression) {
    return expression;
  } else if (expression instanceof RegExp) {
    return new RawExpression(expression);
  } else {
    return new RawExpression(sanitize(expression));
  }
}

export default exprToRaw;
