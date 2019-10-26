import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function group(...expressions: Expression[]): RawExpression {
  expressions = RawExpression.arrayFromExpressions(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(${combined})`);
}

group.named = (name: string, ...expressions: Expression[]): RawExpression => {
  expressions = RawExpression.arrayFromExpressions(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(?<${name}>${combined})`);
};

group.capturing = group;

group.capturing.named = group.named;

group.nonCapturing = (...expressions: Expression[]): RawExpression => {
  expressions = RawExpression.arrayFromExpressions(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(?:${combined})`);
};

export default group;
