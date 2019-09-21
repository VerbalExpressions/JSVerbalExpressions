import Expression from "./types/expression";
import simplifyAndGroup from "./util/simplify-and-group";

export default function multiple(
  input: Expression,
  minTimes?: number,
  maxTimes?: number
) {
  const output = minTimes
    ? `${simplifyAndGroup(input)}{${minTimes},${maxTimes || ""}}`
    : `${simplifyAndGroup(input)}*`;
  return new RegExp(output);
}
