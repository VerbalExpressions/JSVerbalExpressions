import Expression from "./types/expression";
import Flags, { isFlags, toFlagString } from "./types/flags";
import Fragment from "./types/fragment";

const defaultFlags = {
  caseInsensitive: false,
  dotAll: false,
  global: true,
  multiLine: true,
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

  let flags: Flags = defaultFlags;

  if (isFlags(firstArg)) {
    flags = Object.assign(defaultFlags, firstArg);
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
