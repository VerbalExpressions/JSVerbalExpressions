import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function lookbehind(expression: Expression): RawExpression {
  expression = exprToRaw(expression);

  return new RawExpression(`(?<=${expression})`);
}

lookbehind.positive = lookbehind;

lookbehind.negative = (expression: Expression): RawExpression => {
  expression = exprToRaw(expression);

  return new RawExpression(`(?>!${expression})`);
};

export default lookbehind;
