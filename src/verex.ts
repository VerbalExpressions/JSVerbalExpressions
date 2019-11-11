import Expression from "./types/expression";
import Flags, { isFlags, toFlagString } from "./types/flags";
import Fragment from "./types/fragment";

const defaultFlags = {
  dotAll: false,
  global: true,
  ignoreCase: false,
  multiline: true,
  sticky: false,
  unicode: false
};

function VerEx(
  firstArg?: Expression | Flags,
  ...expressions: Expression[]
): RegExp {
  if (firstArg === undefined && expressions.length === 0) {
    return new RegExp("");
  }

  const flags: Flags = Object.assign({}, defaultFlags); // shallow copy

  if (isFlags(firstArg)) {
    Object.assign(flags, firstArg);
  } else {
    expressions.unshift(firstArg);
  }

  const rawExpressions = Fragment.arrayFromExpressions(expressions);
  const flagString = toFlagString(flags);

  return new RegExp(rawExpressions.join(""), flagString);
}

VerEx.extend = (flags: Flags) =>
  (...expressions: Expression[]) => VerEx(flags, ...expressions);

export default VerEx;
export const VerExp = VerEx;
