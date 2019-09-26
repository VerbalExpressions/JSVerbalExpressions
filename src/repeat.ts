import group from "./group";
import Expression from "./types/expression";
import RawExpression from "./types/raw-expression";

function repeat(
  expression: Expression,
  minTimes: number,
  maxTimes?: number
): RawExpression {
  const grouped = group.nonCapturing(expression);

  let output: string;

  if (maxTimes === undefined) {
    output = `${grouped}{${minTimes}}`;
  } else if (maxTimes === Infinity) {
    output = `${grouped}{${minTimes},}`;
  } else {
    output = `${grouped}{${minTimes},${maxTimes}}`;
  }

  return new RawExpression(output);
}

export default repeat;
