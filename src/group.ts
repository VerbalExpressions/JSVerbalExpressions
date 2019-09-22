import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function group(...inputs: Expression[]): RawExpression {
  inputs = mixedToRawArray(inputs);

  return new RawExpression(`(${inputs.join("")})`);
}

group.capturing = group;

group.nonCapturing = (...inputs: Expression[]): RawExpression => {
  inputs = mixedToRawArray(inputs);

  return new RawExpression(`(?:${inputs.join("")})`);
};

export default group;
