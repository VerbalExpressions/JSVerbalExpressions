import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function concat(...expressions: Expression[]): RawExpression {
  expressions = RawExpression.arrayFromExpressions(expressions);
  const concatenated = new RawExpression(expressions.join(""));

  return group.nonCapturing(concatenated);
}

export default concat;
