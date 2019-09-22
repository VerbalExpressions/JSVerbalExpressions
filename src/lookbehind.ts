import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function lookbehind(input: Expression): RawExpression {
  input = exprToRaw(input);

  return new RawExpression(`(?<=${input})`);
}

lookbehind.positive = lookbehind;

lookbehind.negative = (input: Expression): RawExpression => {
  input = exprToRaw(input);

  return new RawExpression(`(?>!${input})`);
}

export default lookbehind;
