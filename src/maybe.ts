import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import exprToRaw from "./util/expr-to-raw";

function maybe(expression: Expression): RawExpression {
  const raw = exprToRaw(expression);
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
