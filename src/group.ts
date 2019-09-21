import RawExpression from "./types/raw-expression";
import SanitizeWorthy from "./types/sanitize-worthy";
import mixedToRawArray from "./util/mixed-to-raw-array";

function group(...inputs: (SanitizeWorthy | RegExp | RawExpression)[]): RawExpression {
  inputs = mixedToRawArray(inputs);

  return new RawExpression(`(${inputs.join("")})`);
}

export default group;
