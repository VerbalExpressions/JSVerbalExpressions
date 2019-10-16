import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function group(...expressions: Expression[]): RawExpression {
  expressions = mixedToRawArray(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(${combined})`);
}

group.named = (name: string, ...expressions: Expression[]): RawExpression => {
  expressions = mixedToRawArray(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(?<${name}>${combined})`);
};

group.capturing = group;

group.capturing.named = group.named;

group.nonCapturing = (...expressions: Expression[]): RawExpression => {
  expressions = mixedToRawArray(expressions);
  const combined = expressions.join("");

  return new RawExpression(`(?:${combined})`);
};

export default group;
