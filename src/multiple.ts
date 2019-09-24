import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function multiple(
  expression: Expression,
  minTimes?: number,
  maxTimes?: number
): RawExpression {
  const grouped = group.nonCapturing(expression);

  let output: string;

  if (minTimes === undefined && maxTimes === undefined) {
    output = `${grouped}*`;
  } else if (maxTimes === undefined) {
    output = `${grouped}{${minTimes}}`;
  } else if (maxTimes === Infinity) {
    output = `${grouped}{${minTimes},}`;
  } else {
    output = `${grouped}{${minTimes},${maxTimes}}`;
  }

  return new RawExpression(output);
}

export default multiple;
