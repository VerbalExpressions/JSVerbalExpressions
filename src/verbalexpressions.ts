import Expression from "./types/expression";
import mixedToRawArray from "./util/mixed-to-raw-array";

function VerEx(...args: Expression[]): RegExp {
  args = mixedToRawArray(args);
  return new RegExp(args.join(''));
}

export default VerEx;
