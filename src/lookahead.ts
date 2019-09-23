import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function lookahead(input: Expression): RawExpression {
  input = exprToRaw(input);

  return new RawExpression(`(?=${input})`);
}

lookahead.positive = lookahead;

lookahead.negative = (input: Expression): RawExpression => {
  input = exprToRaw(input);

  return new RawExpression(`(?!${input})`);
};

export default lookahead;
