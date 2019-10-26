import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function or(...options: Expression[]): RawExpression {
  options = RawExpression.arrayFromExpressions(options);
  const alternation = new RawExpression(options.join("|"));

  return group.nonCapturing(alternation);
}

export default or;
