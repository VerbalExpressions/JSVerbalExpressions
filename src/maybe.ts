import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function maybe(expression: Expression): RawExpression {
  const raw = RawExpression.fromExpression(expression);
  const grouped = group.nonCapturing(raw);

  return new RawExpression(`${grouped}?`);
}

maybe.greedy = maybe;

maybe.lazy = (expression: Expression): RawExpression => {
  const greedy = maybe(expression);
  return new RawExpression(`${greedy}?`);
};

export default maybe;
export const optionally = maybe;
