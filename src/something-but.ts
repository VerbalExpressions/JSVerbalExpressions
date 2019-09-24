import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function somethingBut(expression: Expression): RawExpression {
  const raw = exprToRaw(expression);

  return new RawExpression(`[^${raw}]+`);
}

export default somethingBut;
