import Expression from "./types/expression";
import Flags, {isFlags, toFlagString} from "./types/flags";
import {fragmentsFromExpressions} from "./types/fragment";

const defaultFlags = {
  dotAll: false,
  global: true,
  ignoreCase: false,
  multiline: true,
  sticky: false,
  unicode: false
};

// @constructor
function VerEx(
  firstArg?: Expression | Flags,
  ...expressions: Expression[]
): RegExp {
  if (firstArg === undefined && expressions.length === 0) {
    // eslint-disable-next-line prefer-regex-literals
    return new RegExp("");
  }

  const flags: Flags = {...defaultFlags}; // Shallow copy

  if (isFlags(firstArg)) {
    Object.assign(flags, firstArg);
  } else {
    expressions.unshift(firstArg);
  }

  const rawExpressions = fragmentsFromExpressions(expressions);
  const flagString = toFlagString(flags);

  return new RegExp(rawExpressions.join(""), flagString);
}

VerEx.extend = (flags: Flags) =>
  (...expressions: Expression[]) => VerEx(flags, ...expressions);

export {VerEx};
export const VerExp = VerEx;
