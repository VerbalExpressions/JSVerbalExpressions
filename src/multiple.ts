import RawExpression from "./types/raw-expression";
import Expression from "./types/expression";

function multiple(
  input: Expression,
  minTimes?: number,
  maxTimes?: number
): RawExpression {
  const output = minTimes
    ? `${input}{${minTimes},${maxTimes || ""}}`
    : `${input}*`;
  return new RawExpression(output);
}

export default multiple;
