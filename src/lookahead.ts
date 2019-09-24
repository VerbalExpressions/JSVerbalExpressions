import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function lookahead(expression: Expression): RawExpression {
  expression = exprToRaw(expression);

  return new RawExpression(`(?=${expression})`);
}

lookahead.positive = lookahead;

lookahead.negative = (expression: Expression): RawExpression => {
  expression = exprToRaw(expression);

  return new RawExpression(`(?!${expression})`);
};

export default lookahead;
