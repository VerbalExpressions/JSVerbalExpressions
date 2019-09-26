import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function multiple(expression: Expression): RawExpression {
  const grouped = group.nonCapturing(expression);

  return new RawExpression(`${grouped}*`);
}

export default multiple;
