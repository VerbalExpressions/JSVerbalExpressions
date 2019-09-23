import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function or(...inputs: Expression[]): RawExpression {
  inputs = mixedToRawArray(inputs);
  const alternation = new RawExpression(inputs.join("|"));

  return group.nonCapturing(alternation);
}

export default or;
