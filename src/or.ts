import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function or(...options: Expression[]): RawExpression {
  options = mixedToRawArray(options);
  const alternation = new RawExpression(options.join("|"));

  return group.nonCapturing(alternation);
}

export default or;
