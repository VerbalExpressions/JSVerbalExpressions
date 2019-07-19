import { Expression } from "./types";
import { simplifyAndGroup } from "./utils";

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
