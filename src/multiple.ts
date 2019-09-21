import RawExpression from "./types/raw-expression";
import SanitizeWorthy from "./types/sanitize-worthy";

function multiple(
  input: SanitizeWorthy | RegExp | RawExpression,
  minTimes?: number,
  maxTimes?: number
): RawExpression {
  const output = minTimes
    ? `${input}{${minTimes},${maxTimes || ""}}`
    : `${input}*`;
  return new RawExpression(output);
}

export default multiple;
