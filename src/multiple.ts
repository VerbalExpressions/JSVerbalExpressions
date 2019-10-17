import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function multiple(expression: Expression): RawExpression {
  const grouped = group.nonCapturing(expression);

  return new RawExpression(`${grouped}*`);
}

multiple.greedy = multiple;

multiple.lazy = (expression: Expression): RawExpression => {
  const greedy = multiple(expression).toString();
  return new RawExpression(`${greedy}?`);
};

export default multiple;
export const zeroOrMore = multiple;
