import RawExpression from "./types/raw-expression";
import Expression from "./types/expression";

function multiple(
  input: Expression,
  minTimes?: number,
  maxTimes?: number
): RawExpression {
  let output: string;

  if (minTimes === undefined && maxTimes === undefined) {
    output = `(?:${input})*`;
  } else if (maxTimes === undefined) {
    output = `(?:${input}){${minTimes},}`;
  } else {
    output = `(?:${input}){${minTimes},${maxTimes}}`;
  }

  return new RawExpression(output);
}

export default multiple;
