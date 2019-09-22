import RawExpression from "./types/raw-expression";
import Expression from "./types/expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function or(...inputs: Expression[]): RawExpression {
  inputs = mixedToRawArray(inputs);
  return new RawExpression(`(?:${inputs.join("|")})`);
}

export default or;
